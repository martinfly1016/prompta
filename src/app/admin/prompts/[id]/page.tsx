'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Category {
  id: string
  name: string
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
      setTags(Array.isArray(JSON.parse(data.tags)) ? JSON.parse(data.tags).join(', ') : '')
      setIsPublished(data.isPublished)
    } catch (error) {
      console.error('Failed to fetch prompt:', error)
      setError('プロンプトの読込に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !description || !content || !categoryId) {
      setError('すべての項目を入力してください')
      return
    }

    setIsSaving(true)

    try {
      const method = isNew ? 'POST' : 'PUT'
      const url = isNew ? '/api/prompts' : `/api/prompts/${id}`
      const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean)

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

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={20} />
        戻る
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              タイトル *
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              説明 *
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              カテゴリ *
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              タグ (カンマで区切る)
            </label>
            <input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例: 文章作成, ChatGPT"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              プロンプト内容 *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor="published" className="text-sm font-medium cursor-pointer">
              公開する
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 font-medium"
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}
