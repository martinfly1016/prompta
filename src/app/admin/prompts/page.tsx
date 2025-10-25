'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Prompt {
  id: string
  title: string
  description: string
  category: { name: string }
  isPublished: boolean
  createdAt: string
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrompts()
  }, [])

  const fetchPrompts = async () => {
    try {
      const res = await fetch('/api/prompts')
      const data = await res.json()
      setPrompts(data.prompts)
    } catch (error) {
      console.error('Failed to fetch prompts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このプロンプトを削除しますか？')) return

    try {
      await fetch(`/api/prompts/${id}`, { method: 'DELETE' })
      setPrompts(prompts.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Failed to delete prompt:', error)
      alert('削除に失敗しました')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">プロンプト管理</h1>
        <Link
          href="/admin/prompts/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
        >
          <Plus size={20} />
          新規作成
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            読み込み中...
          </div>
        ) : prompts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            プロンプトがまだありません。
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">タイトル</th>
                <th className="text-left px-6 py-3 font-semibold">カテゴリ</th>
                <th className="text-left px-6 py-3 font-semibold">状態</th>
                <th className="text-right px-6 py-3 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {prompts.map((prompt) => (
                <tr key={prompt.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{prompt.title}</p>
                      <p className="text-sm text-muted-foreground">{prompt.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{prompt.category.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        prompt.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {prompt.isPublished ? '公開' : '下書き'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/prompts/${prompt.id}`}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(prompt.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
