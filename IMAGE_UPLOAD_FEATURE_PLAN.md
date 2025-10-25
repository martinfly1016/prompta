# Prompta 图片上传功能实施方案

## 📋 需求概述

### 用户需求
根据 2025-10-25 的需求讨论，用户希望 Prompta 项目参考 https://opennana.com/awesome-prompt-gallery/ 的设计，添加完整的图片上传和展示功能。

### 核心需求确认
- **图片用途**: 展示 AI 生成的效果图（每个提示词配图展示使用该提示词生成的效果）
- **图片数量**: 支持多张图片（画廊模式）
- **存储服务**: Vercel Blob
- **上传要求**: 必需（创建提示词时必须上传至少一张图片）

---

## 🎯 实施方案（方案 B：完整文件上传功能）

### 阶段 1: 数据库设计修改

#### 1.1 创建 `PromptImage` 模型

```prisma
// prisma/schema.prisma

model PromptImage {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)

  url       String   // Vercel Blob URL
  blobKey   String   // Blob storage key for deletion
  fileName  String   // Original filename
  fileSize  Int      // File size in bytes
  mimeType  String   // image/jpeg, image/png, etc.
  width     Int?     // Image width
  height    Int?     // Image height

  order     Int      @default(0) // Display order in gallery
  altText   String?  // Alt text for accessibility

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([promptId])
  @@index([order])
}
```

#### 1.2 修改 `Prompt` 模型

```prisma
model Prompt {
  // ... 现有字段 ...

  images    PromptImage[] // 添加一对多关系

  // ... 其他字段 ...
}
```

#### 1.3 数据库迁移命令

```bash
npx prisma migrate dev --name add_prompt_images
npx prisma generate
```

---

### 阶段 2: 安装必要依赖

```bash
# Vercel Blob 存储
npm install @vercel/blob

# 文件上传组件
npm install react-dropzone

# 图片处理（可选）
npm install sharp

# 类型定义
npm install --save-dev @types/react-dropzone
```

---

### 阶段 3: 创建图片上传 API

#### 3.1 上传 API 端点

**文件**: `src/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 文件大小限制: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

// 允许的文件类型
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  try {
    // 验证用户权限
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '未找到文件' }, { status: 400 })
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件类型，仅支持 JPG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '文件过大，最大支持 10MB' },
        { status: 400 }
      )
    }

    // 上传到 Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    // 返回上传结果
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: '上传失败，请重试' },
      { status: 500 }
    )
  }
}
```

#### 3.2 删除图片 API

**文件**: `src/app/api/upload/delete/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: '缺少 URL' }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: '删除失败，请重试' },
      { status: 500 }
    )
  }
}
```

---

### 阶段 4: 创建上传组件

#### 4.1 图片上传组件

**文件**: `src/components/ImageUpload.tsx`

```typescript
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X, Upload, Loader2 } from 'lucide-react'

interface UploadedImage {
  url: string
  size: number
  type: string
}

interface ImageUploadProps {
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('上传失败')
        }

        return response.json()
      })

      const results = await Promise.all(uploadPromises)
      onImagesChange([...images, ...results])
    } catch (error) {
      console.error('Upload error:', error)
      alert('图片上传失败，请重试')
    } finally {
      setUploading(false)
    }
  }, [images, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages,
  })

  const removeImage = async (index: number) => {
    const imageToRemove = images[index]

    try {
      await fetch('/api/upload/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageToRemove.url }),
      })

      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
    } catch (error) {
      console.error('Delete error:', error)
      alert('删除失败，请重试')
    }
  }

  return (
    <div className="space-y-4">
      {/* 已上传图片预览 */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image.url}
                alt={`上传图片 ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 上传区域 */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
          `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          )}

          <p className="text-sm text-gray-600">
            {uploading
              ? '正在上传...'
              : isDragActive
              ? '放开以上传图片'
              : `拖拽图片到这里，或点击选择文件 (最多 ${maxImages} 张)`}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            支持 JPG, PNG, WebP, GIF，单个文件最大 10MB
          </p>
          <p className="text-xs text-gray-500 mt-1">
            已上传: {images.length} / {maxImages}
          </p>
        </div>
      )}
    </div>
  )
}
```

---

### 阶段 5: 修改提示词管理页面

#### 5.1 修改创建/编辑表单

**文件**: `src/app/admin/prompts/page.tsx` (部分修改)

在表单中添加图片上传部分：

```typescript
import { ImageUpload } from '@/components/ImageUpload'

// 在组件状态中添加
const [images, setImages] = useState<UploadedImage[]>([])

// 在表单中添加
<div>
  <label className="block text-sm font-medium mb-2">
    效果图片 *
  </label>
  <ImageUpload
    images={images}
    onImagesChange={setImages}
    maxImages={10}
  />
  {images.length === 0 && (
    <p className="text-red-500 text-sm mt-1">
      至少需要上传一张效果图
    </p>
  )}
</div>

// 提交时保存图片信息到数据库
```

---

### 阶段 6: 修改前端展示

#### 6.1 首页卡片展示

**文件**: `src/app/page.tsx`

修改提示词卡片，展示第一张图片：

```typescript
<Link href={`/prompt/${prompt.id}`}>
  <div className="relative aspect-video mb-4">
    {prompt.images?.[0] && (
      <Image
        src={prompt.images[0].url}
        alt={prompt.title}
        fill
        className="object-cover rounded-lg"
      />
    )}
  </div>
  <h3>{prompt.title}</h3>
  <p>{prompt.description}</p>
</Link>
```

#### 6.2 详情页图片画廊

**文件**: `src/components/ImageGallery.tsx`

创建图片画廊组件（支持轮播/灯箱）：

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
  images: Array<{ url: string; altText?: string }>
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // 实现轮播、灯箱等功能...

  return (
    <div>
      {/* 主图片 */}
      {/* 缩略图 */}
      {/* 灯箱 */}
    </div>
  )
}
```

---

## 📁 需要修改/创建的文件清单

### 数据库
- [ ] `prisma/schema.prisma` - 添加 PromptImage 模型

### API 路由
- [ ] `src/app/api/upload/route.ts` - 新建上传 API
- [ ] `src/app/api/upload/delete/route.ts` - 新建删除 API
- [ ] `src/app/api/prompts/route.ts` - 修改查询包含图片
- [ ] `src/app/api/prompts/[id]/route.ts` - 修改 CRUD 包含图片

### 组件
- [ ] `src/components/ImageUpload.tsx` - 新建上传组件
- [ ] `src/components/ImageGallery.tsx` - 新建画廊组件

### 管理页面
- [ ] `src/app/admin/prompts/page.tsx` - 添加图片上传
- [ ] `src/app/admin/prompts/[id]/page.tsx` - 编辑页添加图片管理

### 展示页面
- [ ] `src/app/page.tsx` - 首页展示图片
- [ ] `src/app/prompt/[id]/page.tsx` - 详情页画廊
- [ ] `src/app/category/[slug]/page.tsx` - 分类页展示图片
- [ ] `src/app/search/page.tsx` - 搜索页展示图片

### 环境配置
- [ ] `.env.local` - 添加 BLOB_READ_WRITE_TOKEN
- [ ] `vercel.json` - 配置 Blob 存储

---

## ⚙️ Vercel Blob 配置

### 1. 在 Vercel 项目中启用 Blob

1. 进入 Vercel Dashboard → 你的项目
2. 点击 Storage 标签页
3. 点击 Create Database → Blob
4. 创建后会自动生成 `BLOB_READ_WRITE_TOKEN`

### 2. 本地开发配置

在 `.env.local` 添加：

```bash
BLOB_READ_WRITE_TOKEN=your_token_here
```

---

## ⏱️ 预计工作量

| 阶段 | 预计时间 | 说明 |
|------|---------|------|
| 数据库设计与迁移 | 20 分钟 | Prisma schema + migration |
| 上传 API 开发 | 30 分钟 | 上传和删除端点 |
| 上传组件开发 | 40 分钟 | React Dropzone 集成 |
| 管理界面修改 | 30 分钟 | 表单集成上传组件 |
| 前端展示修改 | 40 分钟 | 首页、详情页、画廊 |
| 测试与优化 | 30 分钟 | 功能测试和性能优化 |
| **总计** | **约 3 小时** | 完整功能实现 |

---

## ✅ 验收标准

功能完成后应满足以下标准：

1. **上传功能**
   - [ ] 支持拖拽上传
   - [ ] 支持点击选择文件
   - [ ] 显示上传进度
   - [ ] 文件类型和大小验证
   - [ ] 多图片批量上传

2. **管理功能**
   - [ ] 图片预览
   - [ ] 删除图片
   - [ ] 图片排序
   - [ ] 至少一张图片验证

3. **展示功能**
   - [ ] 首页卡片显示缩略图
   - [ ] 详情页显示所有图片
   - [ ] 图片画廊（轮播或网格）
   - [ ] 图片灯箱查看
   - [ ] 响应式设计

4. **性能优化**
   - [ ] 图片懒加载
   - [ ] Next.js Image 优化
   - [ ] Vercel Blob CDN 加速

---

## 🔄 后续扩展功能（可选）

1. **图片编辑**
   - 裁剪、旋转
   - 添加水印
   - 滤镜效果

2. **AI 功能**
   - 自动生成 alt 文本
   - 图片标签识别
   - 相似图片推荐

3. **社交功能**
   - 图片点赞
   - 图片下载
   - 图片分享

---

## 📝 备注

- 文档创建时间: 2025-10-25
- 方案版本: v1.0
- 状态: 待实施
- 负责人: Claude Code

---

## 🔗 相关资源

- [Vercel Blob 文档](https://vercel.com/docs/storage/vercel-blob)
- [React Dropzone](https://react-dropzone.js.org/)
- [Next.js Image 组件](https://nextjs.org/docs/app/api-reference/components/image)
