# SEMrush 月度关键词データスナップショット — Brief

> **対象 agent**: SEMrush API アクセス権限を持つ別 agent（または手動 user）。
> **トリガー**: 月 1 回（毎月 1 日 or 任意の月初）。または `/collect-content` 実行前のキーワード調査要求時。
> **コスト感**: 1 回の snapshot は SEMrush Pro plan API クォータで充分カバーできる量（推定 200 API unit / 月）。

---

## 1. 目的

prompta.jp（日本語 AI プロンプト集サイト）の **次の意思決定** をデータドリブンにする：

1. `/collect-content` で次に **どの主題** を採集するか（カテゴリ × tool × キーワード）
2. どの guide / category / tool page を **次に書く / 拡張する** か
3. 新規 freemium tool 化候補（personal-color / hair-color の次）の主題
4. 競合（`romptn.com`, `ururuailab.com`, `noplog.com`, `ai-freak.com`）に対する content gap の埋め方

データ更新頻度が低いため（月 1）、本 brief で取得する 4 つの deliverable がそのまま **1 ヶ月分の戦略インプット** になる。

---

## 2. 成果物（4 ファイル + 1 README）

保存場所: `seo/semrush-snapshots/{YYYY-MM-DD}/`（実行日 = フォルダ名）

```
seo/semrush-snapshots/2026-06-01/
├── README.md                  ← human-readable summary（agent の note も含む）
├── keyword-universe.json      ← Deliverable A
├── content-gap.json           ← Deliverable B
├── domain-rankings.json       ← Deliverable C
└── topic-clusters.json        ← Deliverable D
```

### 命名規則

- フォルダ名は **実行日**（snapshot 取得日）の `YYYY-MM-DD` 形式
- 各 JSON は配列 of objects、UTF-8、トレイリングカンマなし
- 全 ファイル末尾に必ず `_meta` フィールド：

```json
{
  "_meta": {
    "snapshotDate": "2026-06-01",
    "semrushDatabase": "jp",
    "apiUnitsConsumed": 42,
    "agentVersion": "SEMrush-snapshot-v1",
    "notes": "Optional free text"
  },
  "data": [ ... ]
}
```

---

## 3. Deliverable A — Keyword Universe

### 入力（prompta 側で事前生成）

実行前に prompta 側で以下を叩いて **input.json** を作成し、SEMrush agent に渡す：

```bash
npx tsx src/scripts/data-analys/_semrush_input_builder.ts \
  > seo/semrush-snapshots/{YYYY-MM-DD}/input.json
```

`input.json` の中身は以下のキーワードリスト（自動生成、~150-250 件）：

- **既存 GSC 認知**: `watch-keywords.ts` の 38 件 + GSC top queries 過去 28 日 top 50
- **採集主題候補**: 14 category × 6 tool の組み合わせから seed phrase（`{cat-jp} プロンプト`, `{tool} {cat-jp}` など）
- **competitor も含む明示候補**: B 群の Content Gap でカバーする競合 URL のキー

input.json schema：
```json
{
  "_meta": {...},
  "keywords": [
    {
      "keyword": "コスプレ プロンプト",
      "source": "gsc-top-queries",
      "currentTargetPage": "/prompts/cosplay",
      "promptaRank": 6.27,
      "notes": "..."
    },
    ...
  ]
}
```

### ⚠️ 必須: SEMrush API endpoint 使用（Web UI scraping は禁止）

Web UI scraping は proxy rate-limit でカバレッジが激減するため**禁止**。代わりに以下の **REST API endpoint をバッチで呼ぶ**：

| 用途 | endpoint | 仕様 |
|---|---|---|
| バッチ keyword 難易度 | `phrase_kdi` | カンマ区切りで複数 keyword 一気に取得可能（推奨 50 件/call） |
| keyword 詳細（volume / intent / trend） | `phrase_this` | 1 keyword / call |
| SERP top URLs | `phrase_organic` | 1 keyword / call、display_limit=5 |
| competitor organic keywords | `domain_organic` | 1 domain / call、export_columns に `Ph,Po,Nq,Kd,Tr` |
| domain overview | `domain_rank` | 1 domain / call |

**実装サンプル（推奨フロー）**:

```bash
# 1. 入力 keyword をチャンク化（50 件/chunk）
jq -r '.keywords | map(.keyword) | _nwise(50) | join(";")' input.json > chunks.txt

# 2. 各 chunk について phrase_kdi を呼び出し（API key は環境変数）
while read chunk; do
  curl "https://api.semrush.com/?type=phrase_kdi_all&phrase=${chunk}&database=jp&key=${SEMRUSH_KEY}&export_columns=Ph,Kd"
done < chunks.txt

# 3. 各 keyword について phrase_this（volume / intent / trend）
# 4. 各 keyword について phrase_organic（top 5 URLs）
```

**API 利用予算目安**: 148 keyword × 平均 3 endpoint = ~444 API call。Pro plan の 10K reports/day 制限内で余裕。

---

### 出力（SEMrush agent が生成）— `keyword-universe.json`

input.json の各 keyword について、以下を SEMrush から取得：

| フィールド | SEMrush 由来 | 必須? | 説明 |
|---|---|---|---|
| `keyword` | input | ✅ | 入力をそのまま |
| `searchVolume` | `Nq` | ✅ | 月間検索ボリューム（日本市場） |
| `keywordDifficulty` | `Kd` | ✅ | 0-100, 低いほど狙いやすい |
| `cpcJpy` | `Cp`（USD換算→¥） | optional | 商用意図のシグナル |
| `intent` | `In` | optional | informational / navigational / commercial / transactional |
| `searchTrend` | `Tg` | optional | 過去 12 ヶ月の月次トレンド配列 |
| `serpFeatures` | `Fk` | optional | featured snippet, image pack 等 |
| `topUrls` | `domain_organic` (top 5) | ✅ | SERP top 5 ranking URLs |
| `promptaCurrentRank` | input から | ✅ | prompta の現在順位（input で渡したもの、pass-through） |
| `_notes` | agent 判断 | optional | データなし / 無関連 等の場合 |

「**データが取れない場合**」（SEMrush に未登録キーワード、検索量 0 等）も **欠落させず** `searchVolume: null` + `_notes` で理由を残す。

### keyword-universe.json — Inline schema example（コピペ用 minimal template）

```json
{
  "_meta": {
    "snapshotDate": "2026-05-22",
    "semrushDatabase": "jp",
    "apiUnitsConsumed": 444,
    "agentVersion": "SEMrush-snapshot-v2",
    "notes": "Full API-based collection, no UI scraping"
  },
  "data": [
    {
      "keyword": "コスプレ プロンプト",
      "searchVolume": 590,
      "keywordDifficulty": 25,
      "cpcJpy": 12,
      "intent": "informational",
      "searchTrend": [320, 480, 590, 720, 590, 480, ...],
      "serpFeatures": ["image_pack"],
      "topUrls": [
        {"position": 1, "url": "https://example1.com/...", "title": "..."},
        {"position": 2, "url": "https://example2.com/...", "title": "..."}
      ],
      "promptaCurrentRank": 5,
      "_notes": null
    },
    {
      "keyword": "未登録 キーワード",
      "searchVolume": null,
      "keywordDifficulty": null,
      "cpcJpy": null,
      "intent": null,
      "topUrls": [],
      "promptaCurrentRank": null,
      "_notes": "SEMrush database に該当データなし"
    }
  ]
}
```

### 推奨 SEMrush API endpoint

- `phrase_kdi` (keyword difficulty)
- `phrase_this` (volume + intent + trend)
- `phrase_organic` (top URLs)

---

## 4. Deliverable B — Content Gap

### 競合（固定リスト、変更時は本 brief を更新）

```
romptn.com
ururuailab.com
noplog.com
ai-freak.com
```

### 出力 — `content-gap.json`

各 competitor について：

```json
{
  "competitor": "romptn.com",
  "competitorTotalKeywords": 12345,
  "gaps": [
    {
      "keyword": "midjourney プロンプト 一覧",
      "competitorPosition": 3,
      "promptaPosition": null,
      "searchVolume": 1900,
      "keywordDifficulty": 32,
      "estimatedTraffic": 285,
      "competitorUrl": "https://romptn.com/article/12345",
      "roi": 59.4,
      "_recommendation": "新建 guide / 拡張既存 chatgpt-prompt-techniques"
    }
  ]
}
```

### Gap 定義

- `promptaPosition` is `null` OR `competitorPosition + 10 < promptaPosition`
- ソート: `roi = searchVolume / max(keywordDifficulty, 1)` 降順
- top 30 / competitor まで取得
- `_recommendation`: 自由テキスト（new content / 拡張 / new tool / tag 追加 等の方向性 1 行）
- **`priority` フィールド必須**: 各 gap に以下のいずれかをタグ：
  - `"actionable"` — prompta が取りに行ける標準機会
  - `"deprioritize"` — NSFW / 単一ブランド名（pixai / kling / playground 等）/ ゲーム特化（ff11 / 装備 / キャラクターコード等）/ アダルト系
  - `"manual-review"` — 文脈次第（agent が判断付かない場合）

### content-gap.json — Inline schema example

```json
{
  "_meta": {...},
  "data": [
    {
      "competitor": "romptn.com",
      "competitorTotalKeywords": 12345,
      "gaps": [
        {
          "keyword": "stable diffusion プロンプト",
          "competitorPosition": 2,
          "promptaPosition": null,
          "searchVolume": 6600,
          "keywordDifficulty": 20,
          "estimatedTraffic": 1320,
          "competitorUrl": "https://romptn.com/...",
          "roi": 330,
          "priority": "actionable",
          "_recommendation": "expand stable-diffusion-prompt-guide"
        },
        {
          "keyword": "ai エロ",
          "competitorPosition": 44,
          "promptaPosition": null,
          "searchVolume": 40500,
          "keywordDifficulty": 34,
          "roi": 1191.2,
          "priority": "deprioritize",
          "_recommendation": "NSFW — exclude from prompta strategy"
        }
      ]
    }
  ]
}
```

---

## 5. Deliverable C — Prompta Domain Rankings

### 出力 — `domain-rankings.json`

prompta.jp が現在 organic で当たっている上位 100-200 キーワード。

**⚠️ Schema は flat-root 必須。`data[0]` で配列ラップしないこと**（v1 では agent が誤ってラップし、修正された前例あり）。

```json
{
  "_meta": {...},
  "totalOrganicKeywords": 234,
  "estimatedMonthlyTraffic": 1500,
  "topKeywords": [
    {
      "keyword": "コスプレ プロンプト",
      "position": 6,
      "searchVolume": 480,
      "url": "https://www.prompta.jp/prompts/cosplay",
      "estimatedTraffic": 12,
      "trend": "up",
      "keywordDifficulty": 27,
      "intent": "informational"
    }
  ]
}
```

**❌ DO NOT**:
```json
{
  "_meta": {...},
  "data": [{ "totalOrganicKeywords": ... }]   ← 余分なラップ、絶対禁止
}
```

この snapshot を **GSC データと突き合わせる**：差分があれば SEMrush 側の遅延 or 計測対象の差を `_notes` に記載。

---

## 6. Deliverable D — Topic Clusters

### 出力 — `topic-clusters.json`

prompta が **未開拓 or 浅薄に開拓されている** topic cluster を 10-15 件特定：

```json
{
  "clusters": [
    {
      "topic": "AI 画像生成 初心者",
      "seedKeyword": "ai 画像生成 やり方",
      "totalSearchVolume": 8200,
      "averageKeywordDifficulty": 28,
      "promptaCoverage": "thin",
      "subKeywords": [
        {"keyword": "...", "volume": 1200, "kd": 24},
        ...
      ],
      "competitorsRanking": ["romptn.com", "noplog.com"],
      "_recommendation": "新建 /guides/ai-image-generation-beginner ガイド"
    }
  ]
}
```

### Topic Cluster の定義

- SEMrush の Topic Research / Keyword Magic Tool を使用
- 各 cluster は 5-15 関連キーワードで構成
- `promptaCoverage`: `none` / `thin` / `partial` / `good`
- competitor ranking ≥ 2 で prompta = none/thin → 高優先度

---

## 7. README.md — Human Summary

各 snapshot フォルダ直下に Markdown サマリー：

```markdown
# SEMrush Snapshot — {YYYY-MM-DD}

## TL;DR
- Universe: N keywords scanned, **coverage = K/N (P%)** with non-null vol+KD, 平均 KD = X, 平均 volume = Y
  - ⚠️ If coverage < 50% → 「COVERAGE BELOW THRESHOLD: {reason}」を冒頭に明記
- Content Gap: 計 N 件 gaps、うち **actionable = M 件 / deprioritize = D 件 / manual-review = R 件**
- Domain: prompta 全 N 件 organic, est traffic = N/月（vs 先月 ±N%）
- Topic Clusters: M 件未開拓 cluster 特定

## Top 5 推奨アクション（**`priority: actionable` のみから**、agent 判断、根拠付き）
1. **{action}**: 根拠 = {keyword X, volume Y, KD Z, current rank N}, 推定 ROI = {N}
2. ...

> **重要**: NSFW / 単一ブランド / ゲーム特化 query は `priority: deprioritize` 扱いなので **このリストに含めない**。それらは「Deprioritized findings (informational only)」セクションに別途列挙。

## Anomaly / Warnings
- SEMrush で取れなかった keyword: N 件（リスト在 _missing.txt）
- promptaCurrentRank が GSC と乖離 > 10 のもの: N 件
- 競合の新規大物コンテンツ（先月 vs 今月 estimated traffic +50% 以上）: ...

## Diff vs 前月 snapshot
- 新規入り keywords: N
- 消えた keywords: N
- Position 大幅改善（-10 以上）: N
- Position 大幅悪化（+10 以上）: N
```

前月 snapshot との diff は **agent が自分で実行**：`seo/semrush-snapshots/` 配下を `ls -1 | sort | tail -2` で前 2 つを比較。

---

## 8. 月度実行フロー

### Step 1 — prompta 側 input 準備（user or main agent）

```bash
# 当日付フォルダを作成
TODAY=$(date +%Y-%m-%d)
mkdir -p seo/semrush-snapshots/$TODAY

# input.json 生成（watch-keywords + GSC top + 自動拡張）
npx tsx src/scripts/data-analys/_semrush_input_builder.ts \
  > seo/semrush-snapshots/$TODAY/input.json

# ファイルを SEMrush agent に渡す（または PR / 共有フォルダ経由）
```

### Step 2 — SEMrush agent 側で API 実行

`input.json` を読み、上記 4 deliverable + README.md を**同じフォルダ**に生成。

### Step 3 — prompta 側 ingest

```bash
# Snapshot を git に commit（agent が PR を投げる or user が直接 add）
git add seo/semrush-snapshots/$TODAY
git commit -m "data(semrush): monthly snapshot $TODAY"

# `/collect-content` の Phase 0.5 が次回実行時に自動で latest を読む
```

### Step 4 — `/collect-content` が consume

`/collect-content` Phase 0.5（後述）で latest snapshot を読み、採集主題の優先度計算に使用。

---

## 9. データ品質契約

SEMrush agent は **以下を保証**：

1. **完全性**: input.json の全 keyword について、null 含めて 1:1 で出力
2. **トランスペアレンシー**: データなしの場合は `null` + `_notes` に理由
3. **タイムスタンプ**: `_meta.snapshotDate` を実行時刻基準で正確に
4. **再現性**: 同じ input を使えば 24h 以内なら同等の結果が出ること（SEMrush 自体は数日 lag あるため厳密一致は不要）
5. **エラー時の挙動**: API 失敗時は途中まで保存 + README.md に明記、勝手に他の API source（ahrefs 等）にフォールバックしない
6. **🎯 最低カバレッジ閾値（v2 で追加・必須）**: `keyword-universe.json` の `data` 配列で、`searchVolume` と `keywordDifficulty` が**両方 non-null** な行が **≥ 50% (= ≥ 75/148)** であること。下回った場合は README.md の冒頭に大文字で **「⚠️ COVERAGE BELOW THRESHOLD」** と明記し、quota / rate-limit / API 障害のいずれが原因かを書くこと。
7. **🎯 Schema 厳守（v2 で追加・必須）**: 各 deliverable の root shape は §3 / §5 / §6 / §7 の inline JSON example と完全一致。特に `domain-rankings.json` は flat root（`data[0]` ラップ禁止）。Agent は出力前に schema validation 推奨（`jq` 等で root keys 確認）。
8. **🎯 `priority` フィールド必須（v2 で追加・必須）**: `content-gap.json` の各 gap、`keyword-universe.json` の各 row に `priority: "actionable" | "deprioritize" | "manual-review"` を付与。README の Top 5 Recommended Actions は `priority == "actionable"` のものだけから抽出すること。

---

## 10. 失効・更新ポリシー

- snapshot age > **35 日** → `/collect-content` Phase 0.5 で警告表示「データが古い、refresh 推奨」
- snapshot age > **60 日** → 警告を WARN レベルに昇格
- 古い snapshot（>180 日）は `seo/semrush-snapshots/_archive/` に移動可能

---

## 付録 A — 競合追加・変更時のフロー

`romptn.com / ururuailab.com / noplog.com / ai-freak.com` の 4 競合は **本 brief のセクション 4 を直接編集** することで変更。変更後は次回 snapshot から自動反映。

新規競合追加候補は以下のシグナルで決定：
- GSC で prompta のターゲットキーワードを高頻度で奪っているドメイン（`gsc-query.ts --mode=top-pages` に表示される `query` で SERP 確認）
- 月間 organic traffic > 50,000 セッション（SEMrush domain-overview で確認）
- 言語: 日本語サイト優先

---

## 付録 B — Keyword Universe input.json 自動生成のロジック

`_semrush_input_builder.ts` が生成する keyword リストは下記 3 source の union：

1. **GSC top queries 過去 28 日 top 50** — `gsc-query.ts --mode=top-queries`
2. **watch-keywords.ts 全 38 件** — `import { WATCH_KEYWORDS } from '@/lib/seo/watch-keywords'`
3. **採集主題候補** — 14 category × 6 tool の組み合わせ（最大 84 件、prompta 内部用テンプレ）：
   - `{categoryJP} プロンプト`（例: コスプレ プロンプト）
   - `{tool} {categoryJP}`（例: chatgpt 体型）
   - `ai {categoryJP}`（例: ai 髪型）

重複は最初に出現したものを優先。最終 unique ~150-250 件を期待。

---

## 付録 C — Schema 例（最小実装、コピペで起点に使用可）

[seo/semrush-snapshots/_schema-examples/](./_schema-examples/) に上記 4 ファイルのミニマム JSON 例を配置（初回 snapshot 生成前に user / agent が確認用）。

---

> **Brief 最終更新**: 2026-05-22（初版） — 修正履歴を本ファイル末尾に記入してください。

---

## 変更履歴

- **2026-05-22 v2**: 初回 snapshot で発生した問題を反映した改訂版
  - **§3 Deliverable A** に「API endpoint 必須使用 + バッチ呼び出し」要求を明示。Web UI スクレイピングは禁止（rate limit で覆盖率劇減）
  - **§3 / §5 / §6 / §7** に **inline JSON schema example** を追加（笑い的に「附録 C 参照」だけだった → agent が schema を間違える事故防止）
  - **§9 データ品質契約** に「**keyword-universe で ≥50% (=75/148) 以上の searchVolume + keywordDifficulty を埋めること**」を必須化
  - **§9** に「`_recommendation` field で NSFW / 単一ブランド名 / ゲーム特化 query は明示的に `priority: deprioritize` マークすること」を追加
  - **§7 README** の「Top 5 Recommended Actions」は `priority != deprioritize` のものだけから抽出するルールを追加
  - **§11 Lessons Learned from First Run** 節を新設

- 2026-05-22 v1（初版）: 作成。SEMrush agent が proxy 経由で rate-limit され、148 中 11 件しか metric が取れない事象が発生。下記 §11 参照。

---

## 11. Lessons Learned from First Run (2026-05-22 v1)

### 観察された問題

1. **覆盖率 7.4%**: keyword-universe.json で 148 入力中 11 件しか searchVolume / KD が埋まらなかった。残り 137 件は null + _notes。agent は web UI を scraping し proxy で「请求过于频繁、请1分钟后再试」rate limit を受けてフォールバック。
2. **Schema 違反**: domain-rankings.json が brief の flat-root 仕様ではなく `data[0]` 配列ラップで届いた（修正側で `jq` で展開）。
3. **品質ノイズ**: content-gap.json の top ROI 15 件中 13 件が NSFW / ゲーム / 単一ブランド系。`_recommendation` で「deprioritize」とマークされてはいたが、README の Top 5 Recommended Actions に紛れ込んだ。
4. **API units 過少**: `apiUnitsConsumed: 6` — brief 想定 ~200 units の 3% のみ消費。本来の API 呼び出しを使えていない証拠。

### v2 で追加した対策

- §3 Deliverable A 冒頭に **「使用すべき SEMrush API endpoint」明示**:
  - `phrase_kdi` — バッチ KD（カンマ区切りで複数 keyword 一気に）
  - `phrase_this` — volume + intent + trend
  - `phrase_organic` — SERP top 5 URLs
  - `domain_organic` — competitor / our 用
  - `domain_rank` — domain overview
- §9 に「**最低カバレッジ閾値: keyword-universe で searchVolume + KD が両方 non-null な行が ≥50% (= ≥75/148)**」必須化。下回った場合は agent が README で明示的に rate-limit / quota 問題を報告
- §3 / §5 / §6 / §7 に inline schema example を追加（コピペで使えるテンプレ）
- README の Top 5 Recommended Actions は `priority != deprioritize` の項目から抽出する（純流量だけで選ばない）

これらは agent 側で実装すべきもので、本 brief の契約に明記済。
