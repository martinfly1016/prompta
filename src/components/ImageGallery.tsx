'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getImageProxyUrl } from '@/lib/image-proxy'

interface ImageGalleryProps {
  images: Array<{
    id: string
    url: string
    altText?: string
    imageType?: string
    parentImageId?: string | null
    originalImages?: Array<{
      id: string
      url: string
      altText?: string
    }>
  }>
}

interface ImageTransform {
  scale: number
  offsetX: number
  offsetY: number
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageTransform, setImageTransform] = useState<ImageTransform>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const lightboxContainerRef = useRef<HTMLDivElement>(null)

  if (!images || images.length === 0) {
    return null
  }

  // Filter to show only effect images
  const effectImages = images.filter(img => img.imageType !== 'original')

  if (!effectImages || effectImages.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? effectImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === effectImages.length - 1 ? 0 : prev + 1))
  }

  const currentImage = effectImages[currentIndex]

  // 重置图片变换状态
  const resetImageTransform = () => {
    setImageTransform({
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    })
  }

  // 切换图片时重置变换
  useEffect(() => {
    if (isLightboxOpen) {
      resetImageTransform()
    }
  }, [currentIndex, isLightboxOpen])

  // 处理滚轮缩放
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!imgRef.current) return

    e.preventDefault()

    const zoomSpeed = 0.1
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed
    const newScale = Math.max(1, Math.min(5, imageTransform.scale + delta))

    // 计算鼠标相对于容器的位置
    const rect = lightboxContainerRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2

    setImageTransform((prev) => ({
      scale: newScale,
      offsetX: prev.offsetX - (mouseX * delta) / newScale,
      offsetY: prev.offsetY - (mouseY * delta) / newScale,
    }))
  }

  // 处理鼠标按下（开始拖动）
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageTransform.scale <= 1) return // 只有缩放时才能拖动

    setIsDragging(true)
    setDragStart({ x: e.clientX - imageTransform.offsetX, y: e.clientY - imageTransform.offsetY })
  }

  // 处理鼠标移动（拖动）
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const newOffsetX = e.clientX - dragStart.x
    const newOffsetY = e.clientY - dragStart.y

    setImageTransform((prev) => ({
      ...prev,
      offsetX: newOffsetX,
      offsetY: newOffsetY,
    }))
  }

  // 处理鼠标抬起（结束拖动）
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 双击重置缩放
  const handleDoubleClick = () => {
    resetImageTransform()
  }

  // 关闭lightbox并重置
  const closeLightbox = () => {
    setIsLightboxOpen(false)
    resetImageTransform()
  }

  return (
    <>
      <div className="space-y-4">
        {/* 主图片 */}
        <div className="mx-auto bg-gray-200 rounded-lg overflow-hidden cursor-pointer max-w-[800px] relative" onClick={() => setIsLightboxOpen(true)}>
          <img
            src={getImageProxyUrl(currentImage.url)}
            alt={currentImage.altText || `效果图 ${currentIndex + 1}`}
            className="w-full h-auto object-contain"
          />

          {/* 原图缩略图覆层 - 显示在右下角 */}
          {currentImage.originalImages && currentImage.originalImages.length > 0 && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex gap-2">
                {currentImage.originalImages.map((original, idx) => (
                  <div
                    key={original.id}
                    className="relative rounded-lg overflow-hidden border-2 border-white shadow-lg"
                    style={{
                      width: '120px',
                      height: 'auto',
                      aspectRatio: '1',
                    }}
                  >
                    <img
                      src={getImageProxyUrl(original.url)}
                      alt={original.altText || `原图 ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 导航按钮 */}
          {effectImages.length > 1 && (
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
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {effectImages.length}
              </div>
            </>
          )}
        </div>

        {/* 缩略图 - 仅显示效果图像 */}
        {effectImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {effectImages.map((image, index) => (
              <button
                key={image.id}
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

      {/* 灯箱 - 全屏覆盖，支持缩放和拖动 */}
      {isLightboxOpen && (
        <div
          className="fixed z-50 flex items-center justify-center bg-black/98 overflow-hidden"
          style={{
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
          }}
          onClick={closeLightbox}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          ref={lightboxContainerRef}
        >
          <div
            className="relative w-full h-full flex items-center justify-center px-4 py-4 cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
              aria-label="关闭"
              title="关闭 (Esc)"
            >
              <X size={32} />
            </button>

            {/* 图片容器 - 支持缩放和拖动 */}
            <div
              className="relative flex items-center justify-center w-full h-full"
              onDoubleClick={handleDoubleClick}
            >
              <img
                ref={imgRef}
                src={getImageProxyUrl(currentImage.url)}
                alt={currentImage.altText || `效果图 ${currentIndex + 1}`}
                className="max-w-[95vw] max-h-[90vh] object-contain select-none pointer-events-none"
                style={{
                  transform: `translate(${imageTransform.offsetX}px, ${imageTransform.offsetY}px) scale(${imageTransform.scale})`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
                draggable={false}
              />
            </div>

            {/* 导航按钮 - 固定位置，确保始终可见 */}
            {effectImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                  aria-label="上一张"
                  title="上一张"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                  aria-label="下一张"
                  title="下一张"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            {/* 计数器 - 底部始终可见 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-6 py-3 rounded-full text-sm font-medium">
              {currentIndex + 1} / {effectImages.length}
            </div>

            {/* 缩放提示 */}
            {imageTransform.scale > 1 && (
              <div className="absolute bottom-8 right-8 z-10 bg-black/70 text-white/80 px-4 py-2 rounded text-xs font-medium">
                双击重置
              </div>
            )}

            {/* 操作提示 */}
            <div className="absolute top-6 left-6 z-10 text-white/60 text-xs leading-relaxed">
              <div>💡 使用鼠标滚轮缩放图片</div>
              <div>🖱️ 拖动图片移动位置</div>
              <div>👆 双击重置图片</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
