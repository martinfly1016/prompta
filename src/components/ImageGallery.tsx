'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getImageProxyUrl } from '@/lib/image-proxy'

interface ImageGalleryProps {
  images: Array<{ url: string; altText?: string }>
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = images[currentIndex]

  return (
    <>
      <div className="space-y-4">
        {/* 主图片 */}
        <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer group" style={{paddingBottom: '56.25%'}}>
          <img
            src={getImageProxyUrl(currentImage.url)}
            alt={currentImage.altText || `效果图 ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors"
          >
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
              点击放大
            </div>
          </button>

          {/* 导航按钮 */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* 计数器 */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* 缩略图 */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex ? 'ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.url}
                  alt={`缩略图 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 灯箱 */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 overflow-hidden"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center px-4 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-20 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label="关闭"
            >
              <X size={28} />
            </button>

            {/* 灯箱图片容器 - 使用 flexbox 确保图片完整显示 */}
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src={getImageProxyUrl(currentImage.url)}
                alt={currentImage.altText || `效果图 ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
            </div>

            {/* 导航按钮 - 固定位置，确保始终可见 */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
                  aria-label="上一张"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
                  aria-label="下一张"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* 计数器 - 底部始终可见 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
