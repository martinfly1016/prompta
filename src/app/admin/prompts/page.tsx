'use client'

export const dynamic = 'force-dynamic'

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">プロンプト管理</h1>
        <Link
          href="/admin/prompts/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          新規作成
        </Link>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        style={{
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
        }}
      >
        {isLoading ? (
          <div className="p-12 text-center text-slate-600">
            読み込み中...
          </div>
        ) : prompts.length === 0 ? (
          <div className="p-12 text-center text-slate-600">
            プロンプトがまだありません。
          </div>
        ) : (
          <table className="w-full">
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr className="border-b border-slate-200">
                <th className="text-left px-6 py-4 font-semibold text-slate-900">タイトル</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-900">カテゴリ</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-900">状態</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {prompts.map((prompt) => (
                <tr
                  key={prompt.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-slate-900">{prompt.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{prompt.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-700">{prompt.category.name}</td>
                  <td className="px-6 py-5">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: prompt.isPublished ? '#dcfce7' : '#f3f4f6',
                        color: prompt.isPublished ? '#15803d' : '#374151'
                      }}
                    >
                      {prompt.isPublished ? '公開' : '下書き'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/prompts/${prompt.id}`}
                        className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(prompt.id)}
                        className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
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
