# Prompta 生产环境快速修复指南

**问题**: 生产环境 API 返回 500 和 401 错误
**状态**: ⚠️ 需要立即修复
**修复时间**: 15 分钟

---

## 🚨 问题总结

```
❌ GET /api/categories → 500 错误 (数据库连接失败)
❌ GET /api/prompts → 401 错误 (认证问题)
✅ HTML 页面 → 200 成功
✅ 静态资源 → 200 成功
```

---

## ⚡ 快速修复步骤

### 步骤 1: 登录 Vercel 仪表板 (1 分钟)

访问: https://vercel.com/martinfly1016/prompta/settings/environment-variables

### 步骤 2: 添加/验证环境变量 (5 分钟)

在 Vercel 环境变量设置中，确保以下变量存在且正确:

#### 必需变量

```
DATABASE_URL
值: postgresql://postgres:mjKbrVldxszwnbiVFRcBNNNzeGQjziqk@interchange.proxy.rlwy.net:15624/railway
来源: 从 Railway 复制

NEXTAUTH_SECRET
值: <使用下面的命令生成>
来源: 本地生成

NEXTAUTH_URL
值: https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app
来源: 当前项目 URL

BLOB_READ_WRITE_TOKEN
值: VercelBlobReadWrite_XXXX...
来源: 从 Vercel Blob Storage 复制 (可选，仅用于图片上传)
```

#### 生成 NEXTAUTH_SECRET

在本地终端运行:
```bash
openssl rand -base64 32
```

输出示例:
```
aB3kL9pM2xQ7vW5cY8dE6fG4hJ1iO0kLmN9oP3qR4sT5uV
```

复制这个值到 Vercel 的 NEXTAUTH_SECRET。

### 步骤 3: 验证环境变量设置 ✅

在 Vercel 中设置好所有变量后，应该看到:

```
✅ DATABASE_URL = postgresql://...
✅ NEXTAUTH_SECRET = <生成的密钥>
✅ NEXTAUTH_URL = https://prompta-...
✅ BLOB_READ_WRITE_TOKEN = VercelBlobReadWrite_... (可选)
```

### 步骤 4: 重新部署 (2 分钟)

**选项 A: 使用 Vercel 仪表板重新部署** (推荐)

1. 访问: https://vercel.com/martinfly1016/prompta/deployments
2. 找到最新的 deployment
3. 点击菜单 (...)
4. 选择 "Redeploy"
5. 点击 "Redeploy" 按钮

或者触发新部署:

**选项 B: 推送代码触发自动部署**

```bash
git commit --allow-empty -m "chore: Trigger redeploy with env vars"
git push origin main
```

### 步骤 5: 验证修复 (2 分钟)

访问生产 URL: https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app

打开浏览器开发者工具 (F12) 检查:

**Network 标签**:
- [ ] GET / → 200 ✅
- [ ] GET /api/categories → 200 ✅ (之前是 500)
- [ ] GET /api/prompts?limit=6 → 200 ✅ (之前是 401)

**Console 标签**:
- [ ] 没有 JavaScript 错误
- [ ] 没有网络错误

**页面内容**:
- [ ] 首页加载成功
- [ ] 分类列表显示
- [ ] 提示词卡片显示
- [ ] 图片缩略图显示 (新功能)

---

## 🔧 如果仍然有问题

### 问题: 仍然返回 500

**可能原因**: 数据库迁移未在生产环境执行

**解决方案**:
```bash
# 使用本地 Prisma 执行生产数据库迁移
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### 问题: 仍然返回 401

**可能原因**: NextAuth 配置错误

**检查**:
1. NEXTAUTH_URL 是否正确
2. NEXTAUTH_SECRET 是否正确
3. 重新检查 API 代码 (src/app/api/prompts/route.ts)

### 问题: 环境变量未生效

**解决方案**:
1. 清除 Vercel 缓存
2. 在 Vercel 仪表板中重新保存变量
3. 等待 1-2 分钟
4. 重新部署

---

## ✅ 完整检查清单

修复完成后，检查以下项目:

```
□ DATABASE_URL 在 Vercel 中已设置
□ NEXTAUTH_SECRET 在 Vercel 中已设置
□ NEXTAUTH_URL 在 Vercel 中已设置
□ BLOB_READ_WRITE_TOKEN 在 Vercel 中已设置 (可选)
□ 应用已重新部署
□ GET /api/categories 返回 200
□ GET /api/prompts 返回 200
□ 首页加载并显示分类
□ 首页加载并显示提示词列表
□ 图片缩略图在卡片上显示 (新功能)
□ 没有控制台错误
□ 没有网络错误
```

---

## 📱 测试新功能 (图片上传)

修复完毕后，可以测试新增的图片上传功能:

1. **访问管理后台**: https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app/admin/login
2. **登录** (使用默认账户或配置的账户)
3. **创建新提示词**
4. **上传图片** (拖拽或点击选择)
5. **保存**
6. **验证图片在首页显示**

---

## 🆘 如需帮助

如果修复失败，检查:

1. **Vercel 部署日志**:
   https://vercel.com/martinfly1016/prompta/deployments

2. **Vercel 函数日志**:
   https://vercel.com/martinfly1016/prompta/logs

3. **本地测试**:
   ```bash
   DATABASE_URL="postgresql://..." npm run dev
   ```

4. **检查生产环境变量**:
   ```bash
   # 确认值
   echo $DATABASE_URL
   echo $NEXTAUTH_SECRET
   echo $NEXTAUTH_URL
   ```

---

## 📊 预期结果

修复完成后，应该看到:

### 首页显示正确的内容
```
┌─────────────────────────────┐
│     プロンプタ              │
│                             │
│  AIを使いこなすための...     │
│  プロンプトを検索...        │
│                             │
│  【カテゴリ】               │
│  ✍️ ライティング (0)        │
│  💻 プログラミング (0)      │
│  💼 ビジネス (0)            │
│  📚 教育 (0)                │
│  🎨 クリエイティブ (0)      │
│                             │
│  【最新プロンプト】         │
│  プロンプトはまだ...        │
└─────────────────────────────┘
```

### API 响应正确
```json
// GET /api/categories
[
  { id: 1, name: "ライティング", ... },
  { id: 2, name: "プログラミング", ... },
  ...
]

// GET /api/prompts?limit=6
{
  "prompts": [
    {
      "id": 1,
      "title": "...",
      "description": "...",
      "images": [
        { "url": "...", "order": 0 }
      ]
    }
  ],
  "pagination": { ... }
}
```

---

**时间估计**: 15 分钟
**难度**: 简单 (只需配置环境变量)
**风险**: 低 (仅重新部署)

