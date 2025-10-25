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
