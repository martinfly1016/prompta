'use client'

import Image from 'next/image'
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

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return null
  }

  // Filter to show only effect images
  const effectImages = images.filter(img => img.imageType !== 'original')

  if (!effectImages || effectImages.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* 垂直列表：显示所有效果图像 */}
      {effectImages.map((image, index) => (
        <div
          key={image.id}
          className="flex justify-center"
        >
          {/* 图片容器 - 作为原图浮层定位参照 */}
          <div className="relative inline-block">
            <Image
              src={getImageProxyUrl(image.url)}
              alt={image.altText || `効果図 ${index + 1}`}
              width={800}
              height={600}
              quality={85}
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              className="max-w-full h-auto object-contain rounded-lg block"
            />

            {/* 原图缩略图覆层 - 显示在图片右下角 */}
            {image.originalImages && image.originalImages.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  zIndex: 10,
                }}
              >
                <div className="flex gap-2">
                  {image.originalImages.map((original, idx) => (
                    <div
                      key={original.id}
                      className="relative rounded-lg overflow-hidden border-2 border-white shadow-lg"
                      style={{
                        width: '150px',
                      }}
                    >
                      <Image
                        src={getImageProxyUrl(original.url)}
                        alt={original.altText || `原図 ${idx + 1}`}
                        width={150}
                        height={150}
                        quality={80}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
