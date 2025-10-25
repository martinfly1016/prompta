# 测试设置指南

## 问题诊断

在开发环境中，由于 `DATABASE_URL` 环境变量未能正确加载到 Node.js 进程，导致 Prisma 客户端无法连接到数据库。

## 测试方案

为了完成前端功能测试，我们将使用以下方法：

### 方案 A: 使用 Mock 数据（推荐用于 UI 测试）

创建一个本地测试环境，使用 Mock API 响应来测试 UI 组件。

### 方案 B: 修复环境变量加载

确保 `.env` 文件在开发服务器启动时被正确加载。

## 实施步骤

### 步骤 1: 验证 .env 文件

```bash
cat .env | grep DATABASE_URL
```

应该输出：
```
DATABASE_URL=postgresql://...
```

### 步骤 2: 验证 NODE_ENV

```bash
echo $NODE_ENV
```

如果为空，设置为：
```bash
export NODE_ENV=development
```

### 步骤 3: 启动服务器

```bash
npm run dev
```

### 步骤 4: 创建测试账户

访问管理后台：
```
http://localhost:3000/admin/login
```

默认账户（从 seed 数据）：
- 邮箱：admin@example.com
- 密码：changeme

### 步骤 5: 创建测试提示词及图片

1. 登录管理后台
2. 点击"新規作成"
3. 填写表单字段
4. 使用 ImageUpload 组件上传测试图片
5. 保存

## 测试场景

### 前端 UI 测试
- [x] 首页加载和渲染
- [x] 图片卡片显示
- [x] 导航功能
- [x] 搜索功能
- [x] 分类页面

### 后台管理测试
- [ ] 登录功能
- [ ] 创建提示词
- [ ] 上传图片
- [ ] 编辑提示词
- [ ] 删除提示词

### 图片功能测试
- [ ] ImageUpload 组件拖拽
- [ ] ImageUpload 组件点击选择
- [ ] ImageGallery 组件轮播
- [ ] ImageGallery 组件灯箱
- [ ] 图片删除

## 已识别的问题

### 环境问题
- ❌ DATABASE_URL 加载失败
- ❌ Prisma 客户端初始化失败
- ❌ API 返回 500 错误

### 前端问题
- ✅ 类型错误已修复（添加 null 检查）
- ✅ 页面可以优雅降级

## 后续步骤

1. 检查 .env 文件权限
2. 确保 DATABASE_URL 正确格式
3. 验证数据库连接
4. 运行 Prisma 迁移
5. 使用 Seed 脚本初始化数据

## 命令参考

```bash
# 检查环境
cat .env

# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# 运行 Seed 脚本
npm run db:seed

# 启动开发服务器
npm run dev

# 打开 Prisma Studio
npm run db:studio
```
