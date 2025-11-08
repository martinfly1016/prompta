'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { ImageUpload } from '@/components/ImageUpload'
import { SingleImageUpload } from '@/components/SingleImageUpload'

interface Category {
  id: string
  name: string
}

interface UploadedImage {
  url: string
  size: number
  type: string
}

// New structure to pair effect images with their original images
interface EffectImageWithOriginal {
  id?: string  // Database ID for existing effect images
  effect: UploadedImage
  original: UploadedImage | null
  showOriginalUpload: boolean
}

export default function EditPromptPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [categories, setCategories] = useState<Category[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  // New state structure: array of image pairs instead of separate images and originalImage
  const [imagePairs, setImagePairs] = useState<EffectImageWithOriginal[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const isNew = id === 'new'

  useEffect(() => {
    fetchCategories()
    if (!isNew) {
      fetchPrompt()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
      if (data.length > 0 && !categoryId) {
        setCategoryId(data[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchPrompt = async () => {
    try {
      const res = await fetch(`/api/prompts/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setDescription(data.description)
      setContent(data.content)
      setCategoryId(data.categoryId)

      // Handle tags safely - they may be null, undefined, or invalid JSON
      try {
        if (data.tags && data.tags !== 'undefined') {
          const parsed = JSON.parse(data.tags)
          setTags(Array.isArray(parsed) ? parsed.join(', ') : '')
        } else {
          setTags('')
        }
      } catch (e) {
        console.error('Error parsing tags:', e)
        setTags('')
      }

      setIsPublished(data.isPublished)

      // Reconstruct image pairs from the database images
      if (data.images && Array.isArray(data.images)) {
        const effectImages = data.images.filter((img: any) => img.imageType !== 'original')

        // For each effect image, find its paired original image
        const pairs: EffectImageWithOriginal[] = effectImages.map((effectImg: any) => {
          const originalImg = data.images.find(
            (img: any) => img.imageType === 'original' && img.parentImageId === effectImg.id
          )

          return {
            id: effectImg.id,
            effect: {
              url: effectImg.url,
              size: effectImg.fileSize,
              type: effectImg.mimeType,
            },
            original: originalImg ? {
              url: originalImg.url,
              size: originalImg.fileSize,
              type: originalImg.mimeType,
            } : null,
            showOriginalUpload: !!originalImg, // Show upload area if original exists
          }
        })

        setImagePairs(pairs)
      }
    } catch (error) {
      console.error('Failed to fetch prompt:', error)
      setError('プロンプトの読込に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler for when user uploads new effect images
  const handleEffectImagesChange = (newImages: UploadedImage[]) => {
    // Add new pairs for newly uploaded images
    const currentEffectUrls = imagePairs.map(pair => pair.effect.url)
    const addedImages = newImages.filter(img => !currentEffectUrls.includes(img.url))

    // Remove pairs for deleted images
    const newImageUrls = newImages.map(img => img.url)
    const remainingPairs = imagePairs.filter(pair => newImageUrls.includes(pair.effect.url))

    // Create new pairs for added images
    const newPairs = addedImages.map(img => ({
      effect: img,
      original: null,
      showOriginalUpload: false,
    }))

    setImagePairs([...remainingPairs, ...newPairs])
  }

  // Toggle showing the original image upload for a specific pair
  const handleToggleOriginalUpload = (index: number) => {
    setImagePairs(pairs => {
      const updated = [...pairs]
      updated[index] = {
        ...updated[index],
        showOriginalUpload: !updated[index].showOriginalUpload
      }
      return updated
    })
  }

  // Handler for when user uploads an original image for a specific pair
  const handleOriginalImageUpload = (index: number, image: UploadedImage | null) => {
    setImagePairs(pairs => {
      const updated = [...pairs]
      updated[index] = {
        ...updated[index],
        original: image,
        // Keep upload area visible after upload so user can see/change it
      }
      return updated
    })
  }

  // Remove a specific effect image and its original
  const handleRemoveEffectImage = (index: number) => {
    setImagePairs(pairs => pairs.filter((_, i) => i !== index))
  }

  // Remove just the original image from a pair
  const handleRemoveOriginal = (index: number) => {
    setImagePairs(pairs => {
      const updated = [...pairs]
      updated[index] = {
        ...updated[index],
        original: null,
      }
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !description || !content || !categoryId) {
      setError('すべての項目を入力してください')
      return
    }

    if (imagePairs.length === 0) {
      setError('少なくとも1枚の画像をアップロードしてください')
      return
    }

    setIsSaving(true)

    try {
      const method = isNew ? 'POST' : 'PUT'
      const url = isNew ? '/api/prompts' : `/api/prompts/${id}`
      const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean)

      // Transform imagePairs into the format expected by the API
      const allImages = imagePairs.flatMap((pair, index) => {
        const images: any[] = [{
          url: pair.effect.url,
          fileName: `effect-${index}`,
          fileSize: pair.effect.size,
          mimeType: pair.effect.type,
          order: index,
          imageType: 'effect',
        }]

        // Include the database ID if this is an existing image
        if (pair.id) {
          images[0].effectImageId = pair.id
        }

        // Add the original image if it exists
        if (pair.original) {
          images.push({
            url: pair.original.url,
            fileName: `original-${index}`,
            fileSize: pair.original.size,
            mimeType: pair.original.type,
            order: index,
            imageType: 'original',
            parentImageId: pair.id, // Reference to the effect image
          })
        }

        return images
      })

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          content,
          categoryId,
          tags: tagArray,
          isPublished,
          images: allImages,
        }),
      })

      if (!res.ok) throw new Error('保存に失敗しました')

      router.push('/admin/prompts')
    } catch (error) {
      setError('保存に失敗しました')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="text-center text-muted-foreground">読み込み中...</div>
  }

  // Don't pass existing images to ImageUpload - it should only show the upload area for NEW images
  // The imagePairs grid above already displays all existing effect images
  const effectImages: UploadedImage[] = []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <button
        onClick={() => router.back()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#64748b',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
      >
        <ArrowLeft size={20} />
        戻る
      </button>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '16px',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="title" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              タイトル <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="description" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              説明 <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="category" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              カテゴリ <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            >
              <option value="">選択してください</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="tags" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              タグ (カンマで区切る)
            </label>
            <input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例: 文章作成, ChatGPT"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                color: '#0f172a'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="content" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              プロンプト内容 <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                height: '256px',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '13px',
                transition: 'all 0.2s',
                fontFamily: 'monospace',
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', 'source-code-pro', monospace",
                resize: 'vertical',
                color: '#0f172a'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Images Section - Now with paired structure */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0f172a'
            }}>
              効果画像 <span style={{ color: '#dc2626' }}>*</span>
            </label>

            {/* Display existing effect images with their original image controls */}
            {imagePairs.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                {imagePairs.map((pair, index) => (
                  <div
                    key={pair.effect.url}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    {/* Effect Image Preview */}
                    <div style={{ position: 'relative' }}>
                      <img
                        src={pair.effect.url}
                        alt={`Effect ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveEffectImage(index)}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete effect image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Toggle Original Upload Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleOriginalUpload(index)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: pair.showOriginalUpload ? '#e2e8f0' : '#0284c7',
                        color: pair.showOriginalUpload ? '#475569' : '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {pair.showOriginalUpload ? '原图を隠す' : '添加原图'}
                    </button>

                    {/* Original Image Upload Area */}
                    {pair.showOriginalUpload && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginTop: '8px',
                        paddingTop: '8px',
                        borderTop: '1px solid #e2e8f0'
                      }}>
                        {pair.original ? (
                          <div style={{ position: 'relative' }}>
                            <div style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: '#64748b',
                              marginBottom: '4px'
                            }}>
                              原図
                            </div>
                            <img
                              src={pair.original.url}
                              alt="Original"
                              style={{
                                width: '100%',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '2px solid #0284c7'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveOriginal(index)}
                              style={{
                                position: 'absolute',
                                top: '24px',
                                right: '6px',
                                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Delete original image"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: '#64748b',
                              marginBottom: '4px'
                            }}>
                              原図
                            </div>
                            <SingleImageUpload
                              image={pair.original}
                              onImageChange={(img) => handleOriginalImageUpload(index, img)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload area for new effect images */}
            <ImageUpload
              images={effectImages}
              onImagesChange={handleEffectImagesChange}
              maxImages={10}
            />

            {imagePairs.length === 0 && (
              <p style={{
                color: '#dc2626',
                fontSize: '13px',
                marginTop: '6px'
              }}>
                少なくとも1枚の画像をアップロードしてください
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '12px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <input
              id="published"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                accentColor: '#0284c7'
              }}
            />
            <label htmlFor="published" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#0f172a',
              cursor: 'pointer'
            }}>
              公開する
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: '12px 24px',
              backgroundColor: isSaving ? '#cbd5e1' : '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isSaving ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = '#0369a1';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = '#0284c7';
              }
            }}
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}
