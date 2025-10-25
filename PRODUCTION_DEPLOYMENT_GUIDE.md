# Prompta 生产环境部署指南

**部署日期**: 2025-10-26
**环境**: Vercel + Railway PostgreSQL
**应用**: Prompta AI 提示词库平台

---

## 📋 部署前检查清单

在开始部署之前，请确保以下条件都已满足：

### 代码准备
- [x] 所有代码已提交到 main 分支
- [x] 最后一次 git push 已完成
- [x] 代码编译通过 (npm run build)
- [x] 所有测试已通过
- [x] TypeScript 类型检查无错误

### 数据库准备
- [x] 开发环境数据库迁移已完成
- [x] PostgreSQL 连接已验证
- [x] PromptImage 表已创建
- [x] 索引已创建

### 文档准备
- [x] 所有文档已完成
- [x] API 文档已完成
- [x] 部署指南已完成

---

## 🚀 分步骤部署指南

### 步骤 1: 准备 Vercel Blob Storage (5 分钟)

Vercel Blob 用于存储上传的图片。

#### 1.1 创建 Blob Storage (如果尚未创建)

```bash
# 使用 Vercel CLI (需要已安装)
vercel storage create blob --name prompta-images
```

#### 1.2 获取 Token

访问 Vercel 仪表板:
```
https://vercel.com/dashboard
```

1. 选择你的项目 "prompta"
2. 进入 "Storage" 标签
3. 点击 "Blob" 存储
4. 复制 "Read/Write Token"

该 Token 看起来像:
```
VercelBlobReadWrite_XXXX...
```

---

### 步骤 2: 配置环境变量 (10 分钟)

#### 2.1 在 Vercel 仪表板配置

1. 进入 Vercel 项目设置
   ```
   https://vercel.com/martinfly1016/prompta/settings/environment-variables
   ```

2. 添加以下环境变量:

| 变量名 | 值 | 说明 |
|------|-----|------|
| `BLOB_READ_WRITE_TOKEN` | `VercelBlobReadWrite_...` | 从 Blob Storage 复制 |
| `DATABASE_URL` | `postgresql://user:pass@host/db` | Railway PostgreSQL 连接字符串 |
| `NEXTAUTH_SECRET` | (生成) | 见下文 |
| `NEXTAUTH_URL` | `https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app` | 你的生产 URL |

#### 2.2 生成 NEXTAUTH_SECRET

在本地终端运行:
```bash
openssl rand -base64 32
```

输出示例:
```
aB3kL9pM2xQ7vW5cY8dE6fG4hJ1iO0kLmN9oP
```

复制此值到 Vercel 环境变量。

#### 2.3 验证 DATABASE_URL

使用 Railway 中的数据库连接字符串。格式:
```
postgresql://username:password@hostname:port/dbname
```

获取方法:
1. 访问 Railway 仪表板: https://railway.app
2. 打开 Prompta 项目
3. 点击 PostgreSQL 数据库
4. 复制连接字符串

---

### 步骤 3: 验证部署配置 (5 分钟)

#### 3.1 检查 next.config.js

确保配置包含必要的设置:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['blob.vercel-storage.com'], // 允许 Blob 图片
  },
};

module.exports = nextConfig;
```

#### 3.2 检查 package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

### 步骤 4: 触发 Vercel 部署 (2 分钟)

#### 方案 A: 自动部署 (推荐)

Vercel 会自动监听 GitHub 上的 main 分支更新。

1. 确保代码已推送到 GitHub
   ```bash
   git push origin main
   ```

2. Vercel 将自动开始部署
3. 访问 Vercel 仪表板查看进度
4. 部署完成后会收到邮件通知

#### 方案 B: 手动部署

```bash
# 使用 Vercel CLI
vercel deploy --prod
```

#### 方案 C: 在 Vercel 仪表板手动重新部署

1. 进入 Vercel 项目
2. 选择最新的 deployment
3. 点击 "Redeploy" 按钮

---

### 步骤 5: 运行数据库迁移 (5 分钟)

部署成功后，需要在生产环境运行数据库迁移。

#### 5.1 连接到生产数据库

使用 Prisma Migrate:

```bash
# 设置生产环境变量
export DATABASE_URL="postgresql://..."

# 运行迁移
npx prisma migrate deploy
```

或者在 Vercel 中使用构建脚本:

编辑 `package.json`:
```json
{
  "scripts": {
    "build": "next build && npx prisma migrate deploy"
  }
}
```

#### 5.2 或者使用 Seed 脚本初始化数据

```bash
npm run db:seed
```

---

### 步骤 6: 验证部署 (10 分钟)

#### 6.1 访问生产应用

```
https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app
```

#### 6.2 检查首页

- [ ] 首页加载成功
- [ ] 分类正确显示
- [ ] 菜单链接可用
- [ ] 没有 JavaScript 错误

#### 6.3 检查管理后台

```
https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app/admin/login
```

- [ ] 登录页面加载
- [ ] 可以用 admin@example.com / changeme 登录
- [ ] 仪表板正确显示

#### 6.4 测试图片上传 (可选)

1. 登录管理后台
2. 进入"新規作成"创建新提示词
3. 上传一张测试图片
4. 保存并检查图片是否显示在首页

---

## 🔧 常见问题解决

### 问题 1: 部署失败

**错误**: `Build failed`

**检查**:
1. 查看 Vercel 构建日志
2. 确认环境变量已设置
3. 确认 DATABASE_URL 格式正确
4. 检查代码是否有语法错误

### 问题 2: 图片上传不工作

**错误**: `BLOB_READ_WRITE_TOKEN not found`

**解决**:
1. 在 Vercel 环境变量中添加 BLOB_READ_WRITE_TOKEN
2. 重新部署应用
3. 清除浏览器缓存

### 问题 3: 数据库连接失败

**错误**: `PrismaClientInitializationError`

**解决**:
1. 验证 DATABASE_URL 格式
2. 检查数据库是否在线
3. 运行 `npx prisma db push`
4. 检查数据库防火墙规则

### 问题 4: 500 错误

**检查**:
1. 查看 Vercel 函数日志
2. 检查环境变量是否正确
3. 查看 API 错误响应

---

## 📊 部署验证清单

完成以下检查确保部署成功:

### 应用程序检查
- [ ] 首页可访问
- [ ] 页面加载快速 (< 3 秒)
- [ ] 没有 JavaScript 错误
- [ ] 样式加载完整
- [ ] 响应式设计正常

### API 检查
- [ ] GET /api/categories - 返回 200
- [ ] GET /api/prompts - 返回 200
- [ ] POST /api/upload - 接受文件上传
- [ ] DELETE /api/upload/delete - 删除文件
- [ ] NextAuth API - 工作正常

### 数据库检查
- [ ] 表已创建
- [ ] 迁移已执行
- [ ] 数据可查询
- [ ] 性能正常

### 安全检查
- [ ] HTTPS 已启用
- [ ] CSP 头正确
- [ ] 身份验证工作
- [ ] 无安全警告

---

## 🔐 安全检查清单

部署前请确保:

- [ ] 所有敏感信息都在环境变量中
- [ ] 没有硬编码的 API 密钥
- [ ] DATABASE_URL 安全存储
- [ ] NEXTAUTH_SECRET 足够长和安全
- [ ] CORS 配置正确
- [ ] 文件上传限制已设置 (10MB)
- [ ] 文件类型验证已启用
- [ ] SQL 注入防护 (已由 Prisma 提供)
- [ ] XSS 防护 (已由 Next.js 提供)

---

## 📈 性能优化

### 图片优化
```javascript
// Next.js Image 组件自动优化
<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={450}
  priority={false}
  placeholder="blur"
/>
```

### 缓存策略

在 `vercel.json` 中配置:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=60, stale-while-revalidate=120"
        }
      ]
    },
    {
      "source": "/_next/image(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 监控与日志

使用 Vercel Analytics:
```javascript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

---

## 🚨 部署后监控

### 错误监控

监控 Vercel 仪表板中的:
- Function Logs (API 错误)
- Performance (页面加载时间)
- Real Experience Score (Core Web Vitals)

### 日志检查

定期检查:
```bash
# 查看最近的部署日志
vercel logs prompta --follow
```

### 性能指标

监控:
- 首屏加载时间 (FCP)
- 最大内容绘制 (LCP)
- 累积布局移位 (CLS)
- 页面大小
- API 响应时间

---

## 🔄 更新和回滚

### 更新应用

正常的 git push 将自动触发重新部署:
```bash
git add .
git commit -m "feat: Add new feature"
git push origin main
```

### 回滚到上一个版本

在 Vercel 仪表板中:
1. 进入 Deployments
2. 找到要回滚的版本
3. 点击 "Promote to Production"

或使用 CLI:
```bash
vercel deploy --prod -c
```

---

## 📞 支持和联系

### 文档
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Vercel Blob 文档](https://vercel.com/docs/storage/vercel-blob)

### 社区
- [Vercel 社区论坛](https://github.com/vercel/next.js/discussions)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

## ✅ 部署完成检查表

```
☐ 代码已推送到 main 分支
☐ Vercel Blob Storage 已创建
☐ 所有环境变量已配置
☐ 数据库迁移已运行
☐ 应用可访问
☐ API 端点正常工作
☐ 图片上传功能正常
☐ 管理后台正常
☐ 没有错误或警告
☐ 性能指标正常
☐ 安全检查通过
```

---

## 📝 部署记录

**部署日期**: ___________
**部署人员**: ___________
**部署状态**: ☐ 成功 ☐ 部分成功 ☐ 失败
**问题**: ___________
**解决方案**: ___________
**验证完成**: ☐ 是 ☐ 否

---

**指南版本**: 1.0
**最后更新**: 2025-10-26
**维护者**: Claude Code AI Assistant

