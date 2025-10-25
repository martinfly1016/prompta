# Vercel 重新部署后的测试计划

**部署触发时间**: 2025-10-26 (刚刚推送)
**预计部署完成**: 2-3 分钟
**测试开始时间**: 部署完成后

---

## 📊 修复前后对比

### 修复前
```
❌ GET /api/categories → 500 错误
❌ GET /api/prompts → 401 错误
❌ 首页无法显示数据
❌ 新增功能无法测试
```

### 修复后 (预期)
```
✅ GET /api/categories → 200 OK
✅ GET /api/prompts → 200 OK
✅ 首页显示完整数据
✅ 新增功能可以测试
```

---

## 🔄 当前状态

### 已完成 ✅
- [x] 数据库迁移验证 - Schema is up to date
- [x] 环境变量配置 - DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
- [x] Vercel 重新部署触发 - 刚刚推送

### 进行中 ⏳
- [ ] Vercel 构建和部署中 (2-3 分钟)

### 待执行 📋
- [ ] 重新测试 API
- [ ] 验证首页数据显示
- [ ] 完整功能测试

---

## 🧪 部署完成后的测试步骤

### 步骤 1: 等待部署 (2-3 分钟)

访问 Vercel 部署页面查看状态:
```
https://vercel.com/martinfly1016/prompta/deployments
```

等待出现新的 deployment，状态变为绿色 ✅

### 步骤 2: 打开生产 URL (部署完成后)

```
https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app
```

### 步骤 3: 打开浏览器开发者工具 (F12)

进入 **Network** 标签，刷新页面

### 步骤 4: 检查 API 请求

应该看到以下请求:

#### ✅ 预期成功的请求

```
GET /api/categories
状态码: 200 OK
响应: [{"id":1,"name":"ライティング",...},...]

GET /api/prompts?limit=6
状态码: 200 OK
响应: {"prompts":[...],"pagination":{...}}

GET /api/auth/session
状态码: 200 OK
```

#### ❌ 如果仍然失败

```
GET /api/categories → 500
GET /api/prompts → 401

说明: 需要进一步调查
- 检查 Vercel 函数日志
- 查看具体错误信息
- 可能需要手动在 Vercel 仪表板重新部署
```

### 步骤 5: 验证首页内容

刷新页面后，应该看到:

```
✅ 分类列表 (5 个分类)
   - ✍️ ライティング
   - 💻 プログラミング
   - 💼 ビジネス
   - 📚 教育
   - 🎨 クリエイティブ

✅ 提示词列表 (如果有数据)
   - 卡片标题
   - 描述
   - 图片缩略图 (新功能!)

✅ 导航菜单
✅ 搜索功能
```

---

## 🎯 新增功能验证

一旦首页显示成功，可以测试新增的图片功能:

### 1. 图片缩略图 (首页) ⭐

- [ ] 每个提示词卡片显示一张图片
- [ ] 图片按 aspect-video 比例显示
- [ ] 图片有 hover 缩放效果
- [ ] 没有图片时显示占位符 (📷 符号)

### 2. 图片画廊 (详情页) ⭐

- [ ] 点击首页卡片进入详情页
- [ ] 详情页显示完整的图片画廊
- [ ] 可以用上一张/下一张按钮导航
- [ ] 缩略图列表可以快速切换

### 3. 灯箱功能 ⭐

- [ ] 点击主图片打开灯箱
- [ ] 灯箱显示全屏图片
- [ ] 可以在灯箱中导航
- [ ] ESC 或点击外围关闭灯箱

### 4. 图片上传 (管理后台) ⭐

- [ ] 访问 /admin/login
- [ ] 登录成功
- [ ] 创建新提示词时显示 ImageUpload 组件
- [ ] 可以拖拽上传图片
- [ ] 可以点击选择图片
- [ ] 显示上传进度和预览
- [ ] 保存后图片显示在首页

---

## 📋 完整的测试清单

部署完成后需要验证:

### API 测试
- [ ] GET /api/categories - 返回 200
- [ ] GET /api/prompts - 返回 200
- [ ] POST /api/upload - 可以上传文件
- [ ] DELETE /api/upload/delete - 可以删除文件

### 前端页面
- [ ] 首页加载并显示数据
- [ ] 分类页面正常
- [ ] 搜索功能正常
- [ ] 详情页正常
- [ ] 管理后台正常

### 新增功能
- [ ] 首页图片缩略图显示
- [ ] 详情页图片画廊工作
- [ ] 灯箱功能工作
- [ ] 图片上传功能工作

### 响应式设计
- [ ] 桌面版本 (1920x1080)
- [ ] 平板版本 (768x1024)
- [ ] 手机版本 (375x667)

---

## 📞 如果部署失败或 API 仍然返回错误

### 检查部署日志

```
https://vercel.com/martinfly1016/prompta/deployments
↓
点击最新的 deployment
↓
查看 "View Build Logs" 按钮
```

### 检查函数日志

```
https://vercel.com/martinfly1016/prompta/logs
↓
Filter by: "function"
↓
查看具体的 API 错误信息
```

### 手动在 Vercel 仪表板重新部署

```
https://vercel.com/martinfly1016/prompta/deployments
↓
找到最新的 deployment
↓
点击菜单 (...)
↓
选择 "Redeploy"
```

### 本地测试验证

```bash
# 用生产数据库本地测试
DATABASE_URL="postgresql://..." npm run dev

# 访问本地首页
http://localhost:3000

# 检查 API
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/prompts
```

---

## 🎯 成功指标

部署完成后，应该看到:

```
✅ 首页 HTML 加载 (200 OK)
✅ 分类 API 返回数据 (200 OK)
✅ 提示词 API 返回数据 (200 OK)
✅ 首页显示分类和提示词
✅ 首页显示图片缩略图 (新功能!)
✅ 管理后台可以访问
✅ 新功能可以完整测试
```

---

## ⏱️ 时间表

```
现在 (T+0):    推送代码触发部署
T+1分钟:       Vercel 开始构建
T+2-3分钟:     部署完成
T+3分钟后:     重新测试生产环境
```

---

**下一步**: 等待 2-3 分钟，然后重新访问生产 URL 进行测试!

