'use client'

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
          className="mx-auto rounded-lg max-w-[800px] relative"
          style={{ overflow: 'visible' }}
        >
          <img
            src={getImageProxyUrl(image.url)}
            alt={image.altText || `効果図 ${index + 1}`}
            className="max-w-full h-auto object-contain rounded-lg relative z-0"
            style={{ display: 'block' }}
          />

          {/* 原图缩略图覆层 - 显示在右下角 */}
          {image.originalImages && image.originalImages.length > 0 && (
            <div className="absolute z-10" style={{ bottom: '16px', right: '16px' }}>
              <div className="flex gap-2">
                {image.originalImages.map((original, idx) => (
                  <div
                    key={original.id}
                    className="relative rounded-lg overflow-hidden border-2 border-white shadow-lg"
                    style={{
                      width: '150px',
                    }}
                  >
                    <img
                      src={getImageProxyUrl(original.url)}
                      alt={original.altText || `原図 ${idx + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
