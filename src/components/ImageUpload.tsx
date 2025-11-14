'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Loader2 } from 'lucide-react'

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


  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      {images.length < maxImages && (
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
