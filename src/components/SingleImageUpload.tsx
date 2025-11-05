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

interface SingleImageUploadProps {
  image: UploadedImage | null
  onImageChange: (image: UploadedImage | null) => void
}

export function SingleImageUpload({
  image,
  onImageChange,
}: SingleImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)

    try {
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('上传失败')
      }

      const result = await response.json()
      onImageChange(result)
    } catch (error) {
      console.error('Upload error:', error)
      alert('图片上传失败，请重试')
    } finally {
      setUploading(false)
    }
  }, [onImageChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1,
    disabled: uploading || image !== null,
  })

  const removeImage = async () => {
    if (!image) return

    try {
      await fetch('/api/upload/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: image.url }),
      })

      onImageChange(null)
    } catch (error) {
      console.error('Delete error:', error)
      alert('删除失败，请重试')
    }
  }

  return (
    <div className="space-y-4">
      {/* 已上传图片预览 */}
      {image && (
        <div className="relative inline-block">
          <div className="relative max-w-[120px] h-auto group">
            <Image
              src={image.url}
              alt="上传的原图"
              width={120}
              height={120}
              className="w-auto h-auto max-w-[120px] object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* 上传区域 */}
      {!image && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}
          `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          )}

          <p className="text-sm text-gray-600">
            {uploading
              ? '正在上传...'
              : isDragActive
              ? '放开以上传图片'
              : '拖拽图片到这里，或点击选择文件'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            支持 JPG, PNG, WebP, GIF，单个文件最大 10MB
          </p>
        </div>
      )}
    </div>
  )
}
