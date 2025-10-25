'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  _count?: { prompts: number }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name) {
      setError('カテゴリ名は必須です')
      return
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, icon }),
      })

      if (!res.ok) throw new Error('保存に失敗しました')

      setName('')
      setDescription('')
      setIcon('')
      setShowForm(false)
      await fetchCategories()
    } catch (error) {
      setError('保存に失敗しました')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このカテゴリを削除しますか?')) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('削除に失敗しました')
      await fetchCategories()
    } catch (error) {
      alert('削除に失敗しました')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">カテゴリ管理</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setName('')
            setDescription('')
            setIcon('')
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
        >
          <Plus size={20} />
          新規作成
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">カテゴリ名 *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例: ライティング"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="カテゴリの説明を入力"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">アイコン</label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例: ✍️"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">読み込み中...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            カテゴリがまだありません。
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">アイコン</th>
                <th className="text-left px-6 py-3 font-semibold">カテゴリ名</th>
                <th className="text-left px-6 py-3 font-semibold">説明</th>
                <th className="text-center px-6 py-3 font-semibold">プロンプト数</th>
                <th className="text-right px-6 py-3 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 text-2xl">{cat.icon || '-'}</td>
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{cat.description || '-'}</td>
                  <td className="px-6 py-4 text-center">{cat._count?.prompts || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
