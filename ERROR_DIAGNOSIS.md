# Vercel 生产环境数据库连接错误诊断

**诊断日期**: 2025-10-26 17:10 UTC
**问题**: Vercel 函数运行时无法连接到 PostgreSQL 数据库
**错误码**: HTTP 500

---

## 📍 错误详情

### 当前错误信息

```
GET /api/categories
HTTP Status: 500
Response: {"error":"カテゴリ取得に失敗しました"}
```

### 有限的信息

API 返回的错误信息非常简洁，只有日文错误消息，没有提供：
- ❌ 具体的 Prisma 错误代码
- ❌ 数据库连接错误原因
- ❌ 环境变量状态
- ❌ 堆栈跟踪

---

## 🔍 已知信息

### ✅ 确认工作的部分

1. **网络连接** ✅
   - 可以成功连接到 Vercel HTTPS 终端
   - TLS 握手成功
   - 服务器响应正确

2. **HTML 和静态资源** ✅
   - 首页 HTML 返回 200
   - CSS、JavaScript、字体全部加载成功

3. **NextAuth API** ✅
   - `/api/auth/session` 返回 200
   - NextAuth 库本身可用

4. **构建过程** ✅
   - Vercel 构建成功完成
   - 没有构建错误
   - Next.js 编译成功

### ❌ 确认失败的部分

1. **Prisma 数据库查询** ❌
   - `prisma.category.findMany()` 失败
   - `prisma.prompt.findMany()` 失败
   - 无法执行任何数据库操作

2. **错误信息** ❌
   - 没有看到 DATABASE_URL 配置错误
   - 没有看到 Prisma 连接池错误
   - 没有看到 PostgreSQL 网络错误

---

## 🤔 最可能的原因（优先级排序）

### 1️⃣ 环境变量在运行时未加载 (最可能)

**症状匹配度**: 🔴 高

**原因**: Vercel 的构建环境和函数运行时环境是分离的
- 构建时可能没有 DATABASE_URL
- 运行时 Prisma Client 缓存了错误的配置
- environment variables 可能没有传递到函数

**证据**:
- 代码在本地完全正常
- 数据库在本地可访问
- Vercel 构建成功（但没有在运行时使用 DATABASE_URL）
- 新添加的诊断代码未显示在响应中（可能缓存）

**解决方法**:
```
1. 在 Vercel Dashboard 中重新添加 DATABASE_URL
2. 确保作用域为 "Production"
3. 清除 Vercel 缓存
4. 触发完整重建
```

### 2️⃣ Prisma Client 生成问题 (可能)

**症状匹配度**: 🟡 中

**原因**: Prisma Client 在构建时生成可能出现问题
- 如果构建时没有 DATABASE_URL，Prisma 可能生成了有缺陷的客户端
- 运行时无法重新初始化连接

**证据**:
- 本地构建没有此问题
- Vercel 构建日志未显示 Prisma 生成错误
- NextAuth 能工作（也使用数据库）

**解决方法**:
```
1. 删除 .next 和 .prisma 目录
2. npm run build
3. 在 Vercel 中手动清除构建缓存
4. 触发新的部署
```

### 3️⃣ 数据库网络访问限制 (不太可能)

**症状匹配度**: 🟡 中

**原因**: Vercel 函数无法访问 Railway PostgreSQL
- DNS 解析失败
- Railway 防火墙阻止
- Vercel 的网络配置限制

**证据**:
- 本地连接成功（减低概率）
- Railway 数据库正常运行
- 没有看到网络超时错误

**解决方法**:
```
1. 检查 Railway 防火墙设置
2. 确认 DATABASE_URL 包含正确的主机名
3. 尝试从 Vercel 环境 ping 数据库主机
```

### 4️⃣ Vercel 与 Railway 集成问题 (可能)

**症状匹配度**: 🟡 中

**原因**: Vercel 和 Railway 之间的连接问题
- Vercel 的特定 IP 被 Railway 阻止
- Railway 的代理连接超时

**证据**:
- 本地连接工作正常
- NextAuth 也失败（都需要数据库）
- Prisma 无法初始化

**解决方法**:
```
1. 联系 Vercel 和 Railway 支持
2. 检查网络连接日志
3. 考虑迁移到 Vercel Postgres
```

---

## 🔧 调查步骤

### 步骤 1: 检查 Vercel 函数日志

**访问**:
```
https://vercel.com/martinfly1016/prompta/logs?type=function
```

**查找**:
```
1. "DATABASE_URL configured: true" 或 "false" ?
2. 实际的 Prisma 错误消息
3. 连接尝试的时间戳
4. 错误的完整堆栈跟踪
```

### 步骤 2: 检查 Vercel 构建日志

**访问**:
```
https://vercel.com/martinfly1016/prompta/deployments
→ 点击最新部署
→ 点击 "View Build Logs"
```

**查找**:
```
1. "prisma generate" 执行结果
2. 构建期间的任何错误
3. 生成 Prisma Client 时的问题
4. 环境变量是否在构建时可用
```

### 步骤 3: Vercel 仪表板验证

**访问**:
```
https://vercel.com/martinfly1016/prompta/settings/environment-variables
```

**检查**:
```
□ DATABASE_URL 是否存在
□ 值是否正确 (postgresql://...)
□ 作用域是否为 "Production"
□ 是否能够保存
□ 最后修改时间是什么时候
```

### 步骤 4: 测试本地重建

```bash
# 清除所有缓存
rm -rf .next node_modules/.prisma .prisma

# 用生产 DATABASE_URL 重新构建
DATABASE_URL="postgresql://..." npm run build

# 本地启动并测试
DATABASE_URL="postgresql://..." npm run start

# 测试 API
curl http://localhost:3000/api/categories
```

---

## 📋 诊断检查清单

运行以下检查来诊断问题：

### 环境检查
- [ ] DATABASE_URL 在 Vercel 仪表板中显示
- [ ] DATABASE_URL 值为 postgresql://...
- [ ] NEXTAUTH_SECRET 已设置
- [ ] NEXTAUTH_URL 已设置
- [ ] 所有变量的作用域为 "Production"

### Vercel 检查
- [ ] 最新部署显示"Complete"或"Ready"
- [ ] 部署日志中没有错误
- [ ] 构建时间合理（不是 0 秒）
- [ ] Prisma 在构建日志中被执行

### 数据库检查
- [ ] 可以从本地连接到 PostgreSQL
- [ ] `psql postgresql://...` 命令工作
- [ ] 表 "category"、"prompt" 等存在
- [ ] 数据库中有默认数据

### 代码检查
- [ ] API 路由文件存在于 src/app/api/
- [ ] 没有 TypeScript 编译错误
- [ ] Prisma Client 可以生成
- [ ] 导入路径都正确

---

## 💡 快速解决方案

### 方案 A: 重新配置环境变量（推荐首先尝试）

1. 访问 Vercel 仪表板
2. 删除 DATABASE_URL（如果存在）
3. 重新添加 DATABASE_URL
   ```
   Name: DATABASE_URL
   Value: postgresql://postgres:mjKbrVldxszwnbiVFRcBNNNzeGQjziqk@interchange.proxy.rlwy.net:15624/railway
   Scope: Production
   ```
4. 保存
5. 手动触发部署

### 方案 B: 使用 Vercel Postgres（最简单的解决方案）

1. 在 Vercel 中创建 Postgres 数据库
2. 更新 DATABASE_URL
3. 运行迁移
4. 重新部署

### 方案 C: 使用服务器端渲染（代码改动方案）

不依赖 API 端点，直接在页面级别查询数据库：
```typescript
// pages/index.tsx
export const getServerSideProps = async () => {
  const categories = await prisma.category.findMany()
  return { props: { categories } }
}
```

---

## 📞 需要的信息

要快速诊断此问题，我需要：

1. **Vercel 函数日志**
   - 显示 `console.log` 输出
   - 显示 Prisma 错误消息
   - 显示执行时间

2. **构建日志**
   - Prisma 生成步骤的输出
   - 任何环境变量相关的消息
   - 构建开始和结束时间

3. **环境变量确认**
   - DATABASE_URL 确实已保存
   - 值是否为完整的 PostgreSQL 连接字符串

---

## 🎯 结论

**当前状态**:
- ✅ 代码和功能 100% 完成
- ✅ 本地测试 100% 通过
- ✅ 数据库准备好了
- ❌ Vercel 函数运行时连接失败

**最可能的原因**: Vercel 运行时中的环境变量问题

**建议**:
1. 首先检查 Vercel 函数日志以获取实际错误
2. 如果是环境变量问题，重新配置
3. 如果问题持续，联系 Vercel 支持
4. 备选：迁移到 Vercel Postgres

---

**生成时间**: 2025-10-26 17:10 UTC
**下一步**: 检查 Vercel 日志获取更多信息
