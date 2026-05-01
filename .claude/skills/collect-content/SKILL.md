---
name: collect-content
description: 多源自动采集全流程 — CivitAI/Midjourney/DALL-E/Lexica/prompts.chat 抓取 + Text prompt AI 生成、去重、AI分类、日文翻译、SEO富化、图片下载、DB写入、线上验证
user-invocable: true
argument-hint: "[--source=civitai|midjourney|dalle|lexica|promptsChat|text] [--pages=3] [--target=15] [--cursor=STRING] [--tool=chatgpt|claude|gemini|dall-e] [--category=writing|programming|business|education|creative|photo-edit] [--quality=standard|high]"
---

# /collect-content — 多源自动采集 Skill

自动从 CivitAI / HuggingFace / Lexica / prompts.chat 抓取高质量 AI prompt，或用 AI 生成文字 prompt（ChatGPT/Claude/Gemini），经 AI 分类/翻译/SEO 富化后写入数据库并线上验证。

## 参数

- `--source=SOURCE` — 数据源（默认 lexica，推荐稳定可用）：
  - `lexica` — **推荐** Stable Diffusion 内容（Lexica.art 公开 API，永久图片 URL，按关键词搜索）
  - `civitai` — Stable Diffusion 内容（CivitAI API，**当前不稳定，可能返回 0**）
  - `midjourney` — Midjourney 内容（HuggingFace: MohamedRashad/midjourney-detailed-prompts, 3K 条，带嵌入图片）
  - `dalle` — DALL-E 内容（HuggingFace: OpenDatasets/dalle-3-dataset, 19K 条，签名 URL ~1h 过期）
  - `promptsChat` — **推荐** ChatGPT 文本 prompt（HuggingFace: fka/prompts.chat, 1637 条，CC0 许可，纯文本无图片）
  - `text` — AI 文本 prompt（Haiku 生成，适用于 ChatGPT/Claude/Gemini）
- `--pages=N` — CivitAI 抓取页数（默认 3，每页 20 条）。仅 source=civitai 有效
- `--per=N` — Lexica 每个关键词抓取数（默认 8）。仅 source=lexica 有效
- `--keywords=a,b,c` — Lexica 自定义关键词（逗号分隔）。默认覆盖 hairstyle/cosplay/costume/cyberpunk/anime/cinematic/gothic/fashion 8 类
- `--target=N` — 目标入库数量（默认 15）
- `--cursor=STRING` — 上次采集的 cursor，用于续抓（仅 source=civitai）
- `--tool=TOOL` — 指定工具（仅 source=text）：chatgpt | claude | gemini | dall-e。默认均匀分配 chatgpt/claude/gemini（photo-edit 类默认 gemini，可显式指定 chatgpt/dall-e）
- `--category=CATEGORY` — 指定分类（仅 source=text）：writing | programming | business | education | creative | photo-edit。默认按 SEO 优先级自动选择。**photo-edit 是 AI 写真加工类，prompt 是对已有照片的指令文，目标工具为 Gemini 2.5 Flash Image / ChatGPT 画像編集 / DALL-E 3 inpainting**
- `--quality=standard|high` — 生成模型档位（仅 source=text 影响 Phase 1 生成；其他 Phase 永远用 Haiku）。默认 `standard` 用 Haiku 4.5（成本约 $0.01-0.02/条，适合批量扩展）。`high` 用 Opus 4.7（成本约 $0.15-0.30/条，差异化更强、SKILL 规则遵守更严，适合**新分类的奠基首批**或质量敏感场景）。Phase 3 分类、Phase 4 富化即使 quality=high 也仍用 Haiku

## 工作流

### Phase 0: 预检

1. 确认环境变量存在：
   ```bash
   node -e "const e=process.env; console.log(JSON.stringify({DB:!!e.DATABASE_URL, BLOB:!!e.BLOB_READ_WRITE_TOKEN}))"
   ```
   如果缺失任一变量，立即中止并告知用户。

2. 查询数据库各分类当前 prompt 数量：
   ```bash
   npx tsx -e "
   const {PrismaClient}=require('@prisma/client');
   const p=new PrismaClient();
   (async()=>{
     const cats=await p.category.findMany({include:{_count:{select:{prompts:{where:{isPublished:true}}}}}});
     console.log(JSON.stringify(cats.map(c=>({slug:c.slug,name:c.name,count:c._count.prompts}))));
     await p.\$disconnect();
   })()
   "
   ```

3. 用 SEO 优先级算法计算各分类 `adjusted_priority`（见下方算法）。输出优先级表给用户确认。

4. **（仅 source=text）** 查询已有文字 prompt 的标题列表，用于 Phase 1 生成时防止语义重复：
   ```bash
   npx tsx -e "
   const {PrismaClient}=require('@prisma/client');
   const p=new PrismaClient();
   const textCats=['writing','programming','business','education','creative'];
   const textTools=['chatgpt','claude','gemini'];
   (async()=>{
     const prompts=await p.prompt.findMany({
       where:{category:{slug:{in:textCats}},tool:{slug:{in:textTools}}},
       select:{title:true,slug:true,category:{select:{slug:true}},tool:{select:{slug:true}}}
     });
     console.log(JSON.stringify(prompts));
     await p.\$disconnect();
   })()
   "
   ```
   保存结果供 Phase 1 使用，避免生成语义重复的 prompt。

### Phase 1: 抓取 / 生成

根据 `--source` 参数选择对应抓取脚本或生成流程：

**source=lexica（推荐默认）：**
```bash
cd src/scripts/collect && npx tsx fetch-lexica.ts --per={PER} {--keywords=K1,K2如有} > /tmp/prompta-raw.json 2>/tmp/prompta-fetch.log
```
- 永久图片 URL（`image.lexica.art/full_jpg/{id}`），无签名过期问题
- 默认 8 个关键词覆盖 hairstyle/cosplay/costume/cyberpunk/anime/cinematic/gothic/fashion
- 每次稳定产出 30-45 条带图 SD prompt
- toolSlug = `stable-diffusion`

**source=civitai：**
```bash
cd src/scripts/collect && npx tsx fetch-civitai.ts --pages={PAGES} {--cursor=CURSOR如有} > /tmp/prompta-raw.json 2>/tmp/prompta-fetch.log
```
> **注意**：CivitAI API 当前返回 0 条（period=Week + nsfw=None 过滤过严）。优先用 lexica。

**source=midjourney：**
```bash
cd src/scripts/collect && npx tsx fetch-huggingface.ts --dataset=midjourneyDetailed --count=100 --random > /tmp/prompta-raw.json 2>/tmp/prompta-fetch.log
```
> 使用 `midjourneyDetailed`（MohamedRashad），勿用 `midjourney`（brivangl 的 LLAVA 描述质量低）。

**source=dalle：**
```bash
cd src/scripts/collect && npx tsx fetch-huggingface.ts --dataset=dalle --count=50 --random > /tmp/prompta-raw.json 2>/tmp/prompta-fetch.log
```

> **注意（DALL-E）**：签名 URL 有过期时间，后续 Phase 应尽快执行，不要在 Phase 间暂停。

**source=promptsChat：**
```bash
cd src/scripts/collect && npx tsx fetch-huggingface.ts --dataset=promptsChat --count=100 --random > /tmp/prompta-raw.json 2>/tmp/prompta-fetch.log
```
- CC0 许可（Public Domain），可自由商用
- 纯文本 prompt，无图片 — download-images 走 text-only pass-through 分支
- toolSlug = `chatgpt`
- 适合分类：programming, business, education, writing, creative
- 数据集共 1637 条，随机抽样 100 条后由 Phase 3 筛选 top N
- 建议每次采集 target=15-20，避免一次导入过多

> **注意（promptsChat）**：Phase 3 分类时使用非 text 的 Haiku 分类流程（内容来自外部而非 AI 生成），但分类器 prompt 应包含文本类分类（writing, programming, business, education, creative）。

**source=text：**

不从外部 API 抓取，而是用 Haiku 子 agent 生成文字 prompt 内容。

1. **计算生成计划**：
   - 确定工具列表：如指定 `--tool`，只用该工具；否则均匀分配 chatgpt / claude / gemini（**例外**：category=photo-edit 时默认 tool=gemini，因为 Gemini 2.5 Flash Image 是该场景第一推荐，可显式 --tool=chatgpt 或 dall-e 切换）
   - 确定分类列表：如指定 `--category`，只用该分类；否则按 SEO 优先级从文字分类中选择（writing, programming, business, education, creative, photo-edit）
   - 生成数量 = `target * 1.5`（向上取整），多生成 50% 应对后续去重过滤
   - 按工具×分类组合分配数量，优先填充高优先级分类

2. **启动子 agent 生成 prompt 内容**（模型按 `--quality` 切换）：

   - `--quality=standard`（默认）→ Haiku 4.5 子 agent：
     ```
     Agent(model: "haiku", subagent_type: "general-purpose")
     ```
   - `--quality=high` → Opus 4.7 子 agent（适合新分类首批 / 质量敏感场景）：
     ```
     Agent(model: "opus", subagent_type: "general-purpose")
     ```

   主 agent 应根据 `--quality` 参数选择正确的 model 字段。其余指令内容相同：

   子 agent 指令：
   > 你是一个高质量 AI prompt 模板生成器。请生成 {N} 个完整的、可直接使用的 prompt 模板。
   >
   > **生成要求：**
   > - content 用英文编写（日本用户也常用英文 prompt）
   > - 每个 prompt 必须包含：角色设定、任务描述、输出格式要求、约束条件
   > - 用 `{placeholder}` 标注用户需要自定义的部分（如 `{topic}`, `{language}`, `{audience}`）
   > - 覆盖具体实用场景（如：代码审查、会议纪要、SEO 文章优化、学习计划制定等）
   > - 每个 prompt 应解决一个明确的实际问题
   >
   > **长度标准（按 difficulty）：**
   > - beginner: 30-100 词，简单直接的 prompt
   > - intermediate: 100-300 词，包含详细指导和格式要求
   > - advanced: 300-500 词，复杂的多步骤 prompt，含高级技巧
   >
   > **工具适配风格：**
   > - chatgpt: System message 风格，使用 "You are..." 开头，结构化指令
   > - claude: 使用 XML tags（如 `<context>`, `<instructions>`, `<output_format>`）组织结构
   > - gemini: 支持多模态描述，可包含图片/文档分析指令
   >
   > **photo-edit 类专用规则（category=photo-edit 时必须遵守，覆盖上面通用规则）：**
   > - prompt 是对**ユーザーがアップロードした既存写真**を AI に編集させる**自然語の祈使文**（不是从零生成的标签袋）
   > - 长度：15–80 词为主（intermediate），最多 120 词。背景・证明写真等单步编辑应短，多步组合（先去背景再换衣服）才用长格式
   >
   > **6 项强制规则（每条 prompt 必须 6 项全过；style-test agent 会按这些规则审计）：**
   > - **R1 对象引用**：必须使用白名单短语 `the uploaded photo` / `the person in the image` / `this image` / `this photo` / `the uploaded vintage ... photo`。**禁止用 `photograph`**（不在白名单）
   > - **R2 保持声明**：必须含 `Preserve` / `Keep` / `Maintain` / `Lock` 之一 + `unchanged` / `exactly` / `completely` / `intact` 之一。**多样性要求**：批量生成时四种引导词（Preserve/Keep/Maintain/Lock）尽量均匀，单一引导词占比 ≤ 50%
   > - **R3 输出指定**：必须含至少一个输出规格关键词：`aspect ratio` / `resolution` / `transparent PNG` / `35×45mm` / `passport size` / `at the original resolution` / `1024×1024` / `DPI`。**主体修改类（hairstyle/expression/face）默认结尾兜底 `Output at the original resolution.`**
   > - **R4 质感词**：必须含至少一个白名单质感锚词：`photorealistic` / `natural-looking` / `sharp focus` / `natural skin texture` / `studio lighting` / `subtle`。**结尾兜底推荐 `Photorealistic and natural-looking.`**
   > - **R5 反向防呆**：必须含至少一个 `do not` / `avoid` / `no [bad thing]` 短语
   > - **R6 防止整图重生（仅 colorize / restore / bystander-removal / outfit-swap 等大改类必须）**：必须显式锁定「不要重新生成」。建议短语 `Do not regenerate the photo from scratch — only operate on the existing pixels and preserve every face, pose, and texture exactly as the source.` **背景**：阶段 2 真实渲染发现 Gemini 2.5 Flash Image 在大范围编辑时倾向整图重画，R2 单独不足以阻止
   > - **R7 保留清单必须穷举（所有 photo-edit prompt 必须）**：R2 的保留对象**不能用泛词覆盖**。写 `Preserve hair, clothing, identity` 在 Gemini 上无效 — 模型只锁住明示属性，留白处自由发挥（实测：写 "Preserve outfit" → 衣服颜色被改、写 "Preserve hair flyaways" → 发型被剪、写 "without beautification" → 仍加口红 / 修眉）。**正确写法**：列具体可枚举的属性，如 `Preserve the person's identity, eye shape, nose, jawline, hair length, hair color, bangs, eyebrow shape, lip color, clothing color, clothing fit, and pose exactly as the source.`
   >
   > **R7 分类专属保留清单模板（生成时按 useCase 选用，必须覆盖该场景"可能被自由发挥"的属性）：**
   > - 着せ替え类（仅换衣服）：保留 identity / eye shape / nose / hair length / hair color / hairstyle / makeup state / accessories / pose / background
   > - 背景类（仅换背景）：保留 identity / hairstyle / hair length / hair color / bangs / clothing color / clothing fit / pose / facial expression
   > - 表情类（仅改表情）：保留 identity / hair / clothing / makeup state / background / head angle
   > - 髪型类（仅改发型）：保留 identity / eye shape / nose / face proportions / clothing / makeup state / background / pose
   > - 美肌类（仅磨皮）：保留 identity / facial structure / freckles / moles / fine lines / **eyebrow shape** / **lip color (do not add lipstick)** / makeup state / hair / clothing / background
   > - 证件照类：保留 identity / hair / **clothing (shoulders and collar visible, do not remove or alter)** / skin tone（其它换成规格）
   > - colorize 类：保留 identity / pose / face / clothing shape / hair shape / grain / film texture（其它"加色"）
   >
   > - **R8 强度副词在 Gemini 上效果微弱**：写 "subtle smile" 和 "noticeably warm clearly visible smile" 模型输出几乎一致。**不要靠 prompt 副词调视觉强度**。要更明显的效果只能靠：
   >   1. 描述具体几何（"corners of the lips raised by ~5mm"）
   >   2. 引用参考图（"like the smile in the second uploaded reference image"）
   >   3. 换工具（GPT-4o image edit 对副词更敏感）
   >   4. 后处理调
   >
   > **R6 触发条件清单（生成时按 useCase 自动追加）：**
   > - colorize-* / restore-* — 必加 R6
   > - remove-bystanders / outfit-swap-* — 必加 R6
   > - bg-replace-* — 视情况加（小改不强制）
   > - hairstyle-* / expression-* / face-retouch / id-photo / linkedin — **不需要加**（Gemini 在这些任务上身份保持已经稳定）
   >
   > **Gemini 模型局限性提示（生成 prompt 时同步提示用户）：**
   > - **透明 PNG 输出**：Gemini 2.5 Flash Image 不支持 alpha 通道。`bg-remove-transparent` 类 prompt 应在详情页加标注「Photoroom / remove.bg / rembg 推奨」或将 toolSlug 切到 chatgpt
   > - **大范围编辑（colorize / outfit-swap）容易整图重画**：必须配 R6 才能稳定保持身份
   > - **强度副词无效**（R8）：subtle / dramatic / bold 等副词被模型忽略，要明显效果必须用具体几何或参考图
   >
   > **R5 分类专属反向防呆模板（生成时按 useCase 选用，避免遗漏）：**
   > - 着せ替え类（outfit-swap）：`Do not alter the facial features or invent accessories that are not requested.`
   > - 背景置換类（bg-replace）：`No white halo around the subject and no color cast on the skin from the new background.`
   > - 背景透過类（bg-remove）：`No white halo around the subject and no fringing along the hair edges.`
   > - 美肌类（face-retouch）：`Do not over-smooth the skin and no plastic-looking face.`
   > - 表情/髪型类（expression / hairstyle）：`Do not modify the facial structure or invent details around the mouth/hair.`
   > - 不要物除去类（remove-bystanders）：`Do not invent details that conflict with the existing scene.`
   > - 写真修復・カラー化类（colorize / restore）：`Do not sharpen aggressively or invent details that are not visible in the source.`
   > - 证明写真类（id-photo）：`Without beautification and no shadows on the face or background.`
   >
   > **工具风格：**
   >   - gemini → 一文完结的指令式英文（"Replace the background ... while keeping ..."）
   >   - chatgpt → 多轮対話前提のターン1指令（"I uploaded a photo. Please ..." と始め、後続の微調整を想定）
   >   - dall-e → inpaint/局部编辑指令式（"Edit only the background area to ..."）
   > - useCase 命名建议（写真加工系）：bg-remove-transparent / bg-replace-studio / id-photo-passport / linkedin-profile-photo / hairstyle-change-bob / outfit-swap-suit / face-retouch-natural / colorize-old-photo / remove-bystanders / restore-damaged-photo
   >
   > **分配计划：**
   > {按工具×分类的分配表，含每组合的数量}
   >
   > **已有 prompt 标题（避免语义重复）：**
   > {Phase 0 查询到的已有标题列表}
   >
   > **输出格式（JSON 数组）：**
   > ```json
   > [
   >   {
   >     "categorySlug": "programming",
   >     "toolSlug": "chatgpt",
   >     "prompt": "You are an expert code reviewer...",
   >     "useCase": "code-review",
   >     "difficulty": "intermediate"
   >   }
   > ]
   > ```
   >
   > useCase 命名规则：英文 kebab-case，描述具体用途，2-4 词（如 code-review, meeting-summary, seo-article-optimization）

3. **主 agent 转换为 `RawCollectedItem[]`**：

   对 Haiku 返回的每个 item：
   - `sourceId`: `"text-{toolSlug}-{useCase}"`（如 `text-chatgpt-code-review`）
   - `sourceUrl`: `"text://prompta.jp/{toolSlug}/{categorySlug}/{useCase}"`（合成 URL，用于去重）
   - `imageUrl`: `""`（空字符串 — download-images 会视为 falsy，走 text-only pass-through 分支）
   - `prompt`: Haiku 生成的英文 prompt 内容
   - `negativePrompt`: `""`（文字 prompt 无 negative）
   - `width`: `0`
   - `height`: `0`
   - `author`: `"Prompta AI"`

4. **组装 `FetchResult` 并写入 `/tmp/prompta-raw.json`**：
   ```json
   {
     "success": true,
     "items": [ ...RawCollectedItem[] ],
     "totalFetched": N,
     "skipped": 0
   }
   ```

---

对所有 source：读取 `/tmp/prompta-raw.json`，检查 `success` 字段。如 `false`，输出错误并中止。
报告：总抓取/生成数、跳过数、cursor（仅 civitai）。

### Phase 2: 去重

```bash
cd src/scripts/collect && npx tsx check-duplicates.ts < /tmp/prompta-raw.json > /tmp/prompta-deduped.json 2>/tmp/prompta-dedup.log
```

读取 `/tmp/prompta-deduped.json`，检查 `success`。
报告：新条目数、重复数。如新条目数 < 5，警告用户可能需要增加 pages 或更换 cursor。

> **source=text 说明**：合成 `sourceUrl`（`text://prompta.jp/{tool}/{category}/{useCase}`）是确定性的，`check-duplicates.ts` 按 sourceUrl 匹配，自动防止重复生成相同 useCase 的 prompt。

### Phase 3: AI 分类与筛选

**source=text 时跳过 Haiku 分类**（生成时已指定 categorySlug 和 toolSlug）：

1. 读取 `/tmp/prompta-deduped.json` 中的 `newItems` 数组。

2. **如果 source=text**：
   - 跳过 Haiku 分类子 agent（分类信息已在生成时确定）
   - 所有 items 的 `quality` 默认设为 `4`（AI 生成质量稳定）
   - 所有 items 的 `isUseful` 设为 `true`
   - 对过短（< 20 词）或过长（> 600 词）的 prompt 过滤掉（`isUseful = false`）
   - 从 `sourceId` 中提取 categorySlug（格式：`text-{tool}-{useCase}`，对应关系在生成时已确定）
   - 仍然应用 `selection_score = quality * adjusted_priority[categorySlug]` 筛选
   - 仍然应用单分类 40% 上限
   - 取 top N（N = target 参数）
   - 跳到步骤 4

3. **如果 source 非 text**：启动 **Haiku 子 agent** 进行批量分类：

   ```
   Agent(model: "haiku", subagent_type: "general-purpose")
   ```

   子 agent 指令：
   > 你是一个 AI 图片 prompt 分类器。对以下每个 prompt 进行分类。
   >
   > 可用分类（slug → 含义）：
   > - hairstyle — 发型相关（头发颜色、长度、样式）
   > - clothing — 服装穿搭（衣服、裙子、制服）
   > - cosplay — 角色扮演（动漫/游戏角色 cos）
   > - costume — 特定服饰道具（和服、盔甲、翅膀）
   > - camera — 摄影技巧（角度、光线、构图）
   > - body-type — 体型姿势（体格、身高、动作）
   > - color — 色彩风格（配色、氛围）
   > - anime — 动漫风格（画风、二次元）
   > - creative — 创意艺术（抽象、超现实）
   > - background — 背景场景（室内、户外、幻想）
   > - expression — 表情情绪（笑容、眼神）
   > - business — 商业用途
   > - education — 教育用途
   > - programming — 编程相关
   > - **photo-edit — 写真加工（对ユーザーアップロード写真の編集指令文）**
   >
   > **photo-edit vs 既存生成カテゴリの曖昧解消ルール（重要）：**
   > 以下のいずれかに該当 → photo-edit に分類：
   > 1. prompt が `the uploaded photo` / `this image` / `this person` / `my photo` などユーザーの既存画像を参照
   > 2. 動詞が `replace` / `remove` / `change` / `restore` / `colorize` / `retouch` / `swap` / `edit` / `make ... transparent` のような既存写真への操作
   > 3. 出力指定が `transparent PNG` / `passport size` / `cropped from group photo` のような後加工出力フォーマット
   >
   > 上記いずれにも該当せず「ゼロから新しい人物・シーンを生成」する場合 → 従来の hairstyle / clothing / cosplay / camera 等に分類（例：`1girl, long hair, school uniform` は clothing、`a woman with long blonde hair in a studio` は hairstyle）
   >
   > 对每个 item 输出 JSON：
   > ```json
   > {
   >   "sourceId": "原 sourceId",
   >   "categorySlug": "分类 slug",
   >   "quality": 1-5,
   >   "isUseful": true/false,
   >   "reason": "简短说明"
   > }
   > ```
   >
   > 标记 `isUseful: false` 的情况：
   > - prompt 只是 LoRA 名称（如 `<lora:xxx:0.8>`）没有实际描述
   > - prompt 太短或无意义
   > - 明显 NSFW 内容
   > - 纯模型/参数配置无视觉描述
   >
   > quality 评分：
   > - 5: 详细的视觉描述，多个可学习的技巧
   > - 4: 好的描述，有清晰的风格方向
   > - 3: 基本可用的 prompt
   > - 2: 较简单，学习价值低
   > - 1: 基本无用

4. 主 agent 收回分类结果后（或 source=text 直接使用生成时的分类）：
   - 过滤掉 `isUseful: false` 的条目
   - 过滤掉 `quality < 3` 的条目
   - 按 SEO 优先级计算 `selection_score = quality * adjusted_priority[categorySlug]`
   - 按 `selection_score` 降序排列
   - 取 top N（N = target 参数）
   - 限制：单分类不超过总选择数的 40%

5. 将筛选后的 items（保留原始 `RawCollectedItem` 数据 + 分类结果）写入 `/tmp/prompta-classified.json`。

### Phase 4: AI 富化

1. 读取 `/tmp/prompta-classified.json`。

2. 启动 **Haiku 子 agent** 进行日文翻译和 SEO 富化：

   ```
   Agent(model: "haiku", subagent_type: "general-purpose")
   ```

   子 agent 指令：
   > 你是日文 SEO 文案专家。为以下 AI prompt 生成日文元数据。
   >
   > 对每个 item，基于其英文 prompt 内容和分类，生成：
   >
   > ```json
   > {
   >   "sourceId": "原 sourceId",
   >   "title": "日文标题（25-35字符，包含分类关键词）",
   >   "description": "日文描述（1-2句，说明 prompt 的效果和用途）",
   >   "slug": "english-slug-based-on-content（用英文，kebab-case，3-5 词）",
   >   "tags": ["日文标签1", "日文标签2", "日文标签3"],
   >   "seoTitle": "SEO标题（<=60字符，包含'プロンプト'关键词）",
   >   "seoDescription": "SEO描述（<=155字符，自然融入关键词）",
   >   "difficulty": "beginner|intermediate|advanced",
   >   "altText": "画像の日本語 alt テキスト（30-80文字、画像内容を具体的に説明）"
   > }
   > ```
   >
   > **画像系 SEO 関連キーワード（分類別）：**
   > - hairstyle → 「髪型 プロンプト」「ヘアスタイル AI」
   > - clothing → 「服装 プロンプト」「衣装 AI画像」
   > - cosplay → 「コスプレ プロンプト」「コスプレ AI」
   > - costume → 「衣装 プロンプト」「コスチューム AI」
   > - camera → 「カメラアングル プロンプト」「構図 AI」
   > - body-type → 「体型 プロンプト」「ポーズ AI」
   > - color → 「カラー プロンプト」「色彩 AI画像」
   > - anime → 「アニメ プロンプト」「アニメ風 AI」
   > - creative → 「クリエイティブ プロンプト」「アート AI」
   > - background → 「背景 プロンプト」「風景 AI」
   > - expression → 「表情 プロンプト」「感情表現 AI」
   > - **photo-edit → 「AI 写真加工」「写真 AI 加工」「背景 削除 AI」「証明写真 AI」「プロフィール写真 AI」「Nano Banana プロンプト」（サブテーマで使い分け）**
   >
   > **テキスト系 SEO 関連キーワード（工具別）：**
   > - chatgpt → 「ChatGPT プロンプト」「ChatGPT 活用法」
   > - claude → 「Claude プロンプト」「Claude 活用法」
   > - gemini → 「Gemini プロンプト」「Gemini 活用法」
   >
   > **テキスト系 SEO 関連キーワード（分類別）：**
   > - writing → 「文章作成 プロンプト」「ライティング AI」
   > - programming → 「プログラミング プロンプト」「コード生成 AI」
   > - business → 「ビジネス プロンプト」「会議 AI」
   > - education → 「教育 プロンプト」「学習 AI」
   > - creative → 「クリエイティブ プロンプト」「アイデア AI」
   >
   > **画像系工具別 SEO キーワード（根据 source 追加到 title/seoTitle 中）：**
   > - source=midjourney → 「Midjourney プロンプト」「ミッドジャーニー 画像生成」
   > - source=dalle → 「DALL-E プロンプト」「ダリ 画像生成」「DALL-E 3」
   > - source=civitai → 「Stable Diffusion プロンプト」「SD 画像生成」
   > - source=lexica → 「Stable Diffusion プロンプト」「SD 画像生成」「Lexica」
   >
   > title 命名规则：
   > - 用日文描述 prompt 的效果和用途
   > - 包含分类和工具关键词
   > - 画像系例: 「ツインテールの美少女 - 髪型プロンプト」
   > - テキスト系例: 「コードレビュー自動化 - ChatGPTプロンプト」「議事録作成 - Claudeプロンプト」
   >
   > slug 命名规则：
   > - 英文 kebab-case
   > - 基于 prompt 的主要用途/内容
   > - 画像系例: twintail-girl-hairstyle, red-dress-fashion
   > - テキスト系例: chatgpt-code-review, claude-meeting-summary
   >
   > tags 规则：
   > - 3-5 个日文标签
   > - **必须优先从以下已审核标签词表中选择**（不在词表中的标签不会显示独立页面）：
   >   ChatGPT, Claude, Gemini, プログラミング, コード品質, 開発効率化,
   >   ビジネス, 業務効率化, 意思決定, 教育, 教育サポート, 学習効率化,
   >   ファンタジー, ダークファンタジー, クリエイティブ, アニメ, アニメ プロンプト,
   >   コスプレ, 服装, 衣装, 服装プロンプト, 衣装プロンプト,
   >   髪型, ロングヘア, 金髪, 黒髪, ポートレート,
   >   カメラ, シネマティック, ライティング, 色, マルチカラー,
   >   体型, 猫, ドレス, 和風, ゴシック, 兜, セーラー服, キャラクター,
   >   クリエイティブ プロンプト, 文章品質, 執筆効率化, アイデア生成, 創造性, ユーモア,
   >   写真加工, 背景透過, 背景削除, 背景置換, 証明写真, プロフィール写真,
   >   美肌加工, 顔加工, 着せ替え, 髪型変更, 写真修復, カラー化, 不要物除去, 表情変更, Nano Banana
   > - 第一个标签是分类关键词（如「髪型」或「プログラミング」）
   > - 只有在词表中确实没有合适标签时，才可新增1个新标签（会自动标记为未审核）
   >
   > difficulty 判断：
   > - beginner: 简单直接的 prompt，<50 words
   > - intermediate: 中等复杂度，有技巧性
   > - advanced: 复杂的多层描述，需要经验
   >
   > altText 規則（画像系のみ、source=text の場合は空文字列 ""）：
   > - 日本語で画像の視覚的内容を具体的に説明（30-80文字）
   > - 英文 prompt content に基づいて画像の見た目を描写
   > - 工具名を含める（Stable Diffusion / Midjourney / DALL-E）
   > - 「AI生成画像」で終わる
   > - 例: 「水墨画風の初音ミクと梅の花びら - Stable Diffusion AI生成画像」
   > - 例: 「赤いドレスの女性ファッション - Midjourney AI生成画像」
   > - 例: 「サイバーパンク都市の夜景 - DALL-E 3 AI生成画像」

3. 主 agent 收回富化结果后，组装 `EnrichedPromptData[]` 格式：
   - 合并原始 `RawCollectedItem` 字段（sourceUrl, imageUrl, content=prompt, negativePrompt, width, height, author）
   - 合并 AI 生成的字段（title, description, slug, tags, seoTitle, seoDescription, difficulty, altText）
   - 添加 `categorySlug`（来自 Phase 3 分类）
   - 添加 `toolSlug`（根据 source 设置）：
     - source=civitai → `"stable-diffusion"`
     - source=lexica → `"stable-diffusion"`
     - source=midjourney → `"midjourney"`
     - source=dalle → `"dall-e"`
     - source=promptsChat → `"chatgpt"`
     - source=text → 从生成数据中取（`sourceId` 格式 `text-{toolSlug}-{useCase}` 中提取，或直接使用 Phase 1 中保留的 toolSlug）
   - **source=text 时**：`imageUrl` 不设置（undefined 或空字符串），download-images 会走 text-only 分支

4. 将完整的 `EnrichedPromptData[]` 写入 `/tmp/prompta-enriched.json`。

### Phase 5: 下载图片

```bash
cd src/scripts/collect && cat /tmp/prompta-enriched.json | npx tsx download-images.ts > /tmp/prompta-final.json 2>/tmp/prompta-download.log
```

读取 `/tmp/prompta-final.json`，检查结果数组长度。

**source 非 text/promptsChat 时**：如果成功数 < 输入数的 70%（失败率 >30%），中止并报告。
**source=text 或 promptsChat 时**：所有 items 无 imageUrl，download-images.ts 全部 pass-through（0 张图片下载是正常的），跳过 70% 成功率检查。

报告：成功下载数、失败数（source=text/promptsChat 时报告 "N/A — 文本 prompt 无图片"）。

### Phase 6: 写入数据库

```bash
cd src/scripts/collect && cat /tmp/prompta-final.json | npx tsx write-prompts.ts > /tmp/prompta-results.json 2>/tmp/prompta-write.log
```

读取 `/tmp/prompta-results.json`，统计 success/failure 数量。
报告：成功写入数、失败数、各 slug。

### Phase 7: 线上验证

1. 等待 70 秒让 ISR 刷新：
   ```bash
   sleep 70
   ```

2. 用 Browser MCP 截图验证：
   - 首页 `https://www.prompta.jp/`
   - 1-2 个有新内容的分类页 `https://www.prompta.jp/prompts/{category}`
   - 1 个新 prompt 详情页 `https://www.prompta.jp/prompt/{slug}`

3. 用 curl 验证 HTTP 状态码：
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://www.prompta.jp/prompt/{slug}
   ```

如果页面未刷新，注明"ISR 缓存尚未更新，稍后会自动刷新"。

### Phase 8: 生成报告

输出结构化报告：

**source 非 text 时（画像 prompt）：**

```
## 采集报告

### 统计
- 抓取: X 条 | 去重后: Y 条 | 分类通过: Z 条
- 图片下载: A 成功 / B 失败
- DB 写入: C 成功 / D 失败
- **本次新增: C 条 prompt**

### 分类分布
| 分类 | 采集前 | 采集后 | 本次新增 |
|------|--------|--------|----------|
| hairstyle | N | N+n | n |
| ... | ... | ... | ... |

### 新增 URL
- https://www.prompta.jp/prompt/slug-1
- https://www.prompta.jp/prompt/slug-2
- ...

### 下次采集
- Cursor: {cursor}
- 建议: {基于分类分布的建议}
```

**source=text 时（文字 prompt）：**

```
## 文字 Prompt 生成报告

### 统计
- 生成: X 条 | 去重后: Y 条 | 筛选通过: Z 条
- 图片下载: N/A（文本 prompt）
- DB 写入: C 成功 / D 失败
- **本次新增: C 条文字 prompt**

### 工具分布
| 工具 | 生成前 | 生成后 | 本次新增 |
|------|--------|--------|----------|
| chatgpt | N | N+n | n |
| claude | N | N+n | n |
| gemini | N | N+n | n |

### 分类分布
| 分类 | 生成前 | 生成后 | 本次新增 |
|------|--------|--------|----------|
| writing | N | N+n | n |
| programming | N | N+n | n |
| business | N | N+n | n |
| education | N | N+n | n |
| creative | N | N+n | n |

### 新增 URL
- https://www.prompta.jp/prompt/slug-1
- https://www.prompta.jp/prompt/slug-2
- ...

### 下次生成
- 建议: {基于工具/分类分布的建议，指出哪些工具/分类仍缺内容}
```

---

## SEO 优先级算法

在 Phase 0 和 Phase 3 中使用，由主 agent 内联计算：

```
SEO_BASE_PRIORITY = {
  // 画像系分类
  hairstyle:   240,   // 月搜索量 2400, KD 10
  clothing:    130,   // 月搜索量 1300, KD 10
  cosplay:     120,   // 月搜索量 480,  KD 4
  costume:      53,   // 月搜索量 320,  KD 6
  camera:       52,   // 月搜索量 260,  KD 5
  body-type:    43,   // 月搜索量 390,  KD 9
  color:        25,   // 月搜索量 320,  KD 13
  anime:        19,   // 月搜索量 260,  KD 14
  background:    3,
  expression:    3,

  // テキスト系分類
  writing:      80,   // 「ChatGPT 文章作成」月搜索 1600+
  programming:  70,   // 「ChatGPT プログラミング」月搜索 1300+
  business:     60,   // 「ChatGPT ビジネス」月搜索 1000+
  education:    50,   // 「AI 学習」月搜索 800+
  creative:     40,   // 「AI クリエイティブ」月搜索 500+（テキスト系として）

  // 写真加工系（指令式 prompt、対象は Gemini 2.5 Flash Image / ChatGPT 画像編集 / DALL-E inpainting）
  'photo-edit': 160,  // 「AI 写真加工」2900/月 + 「写真 AI 加工」2400/月 + 「背景 削除 AI」480/月、合計 KD 約 38
}

TARGET_PER_CATEGORY = 10

对每个分类:
  gap = max(TARGET - current_count, 0)
  adjusted_priority = base_priority * (1 + gap * 0.5)

对每个候选 item:
  selection_score = quality * adjusted_priority[categorySlug]

按 selection_score 降序取 top N
限制: 单分类不超过总选择数的 40%
```

> **注意**：source=text 时，`creative` 分类的 base_priority 使用 40（テキスト系值），而非画像系的 3。
> 主 agent 应根据 source 参数选择正确的 priority 值。

## 错误处理

| 场景 | 处理 |
|------|------|
| 环境变量缺失 | Phase 0 中止 |
| CivitAI API 失败 | 检查 fetch.log，报告错误 |
| 去重后 < 5 条 | 警告，建议增加 pages |
| 分类后 < target | 按实际数量继续，报告不足 |
| 图片下载失败率 > 30% | 中止，报告失败项（source=text 跳过此检查） |
| DB 写入失败 | 报告失败项，成功的保留 |
| 线上页面未刷新 | 注明 ISR 延迟，不视为错误 |
| Node.js -e 引号问题 | 复杂逻辑写入 /tmp/*.js 再执行 |
| Midjourney HF 签名 URL 过期 | 签名 URL 有效期 ~1 小时，Phase 1-6 应快速连续执行 |
| DALL-E 签名 URL 过期 | Phase 1-6 应快速连续执行，不要在 Phase 间长时间暂停 |
| Haiku 生成内容不足 | 按实际生成数量继续后续 Phase |
| 生成 prompt 过短（<20词）或过长（>600词） | Phase 3 中主 agent 过滤掉 |
| 合成 sourceUrl 冲突（重复 useCase） | Phase 2 去重脚本自动过滤 |

## 模型分工

| 任务 | 模型 | 理由 |
|------|------|------|
| 流程编排、错误处理、SEO 筛选 | Opus (主 agent) | 复杂推理和协调 |
| Prompt 分类 + 质量评估 | Haiku (子 agent) | 简单分类任务，低成本 |
| 日文翻译 + SEO 富化 | Haiku (子 agent) | 翻译 + 文案，低成本 |
| 文本 Prompt 生成 | Haiku (子 agent) | 批量模板生成，低成本 |
| 线上验证 | Opus (主 agent) | Browser MCP 需要视觉判断 |
