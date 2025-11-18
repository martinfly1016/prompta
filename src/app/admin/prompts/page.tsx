'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import Pagination from '@/components/Pagination'

interface Prompt {
  id: string
  title: string
  description: string
  category: { name: string }
  isPublished: boolean
  createdAt: string
}

interface PaginationData {
  page: number
  limit: number
  total: number
  pages: number
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  })

  useEffect(() => {
    fetchPrompts(currentPage)
  }, [currentPage])

  const fetchPrompts = async (page: number) => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/admin/prompts?page=${page}&limit=20`)
      const data = await res.json()
      setPrompts(data.prompts)
      setPagination(data.pagination)
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
      // Refetch prompts to update list and pagination
      fetchPrompts(currentPage)
    } catch (error) {
      console.error('Failed to delete prompt:', error)
      alert('削除に失敗しました')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#0f172a',
          margin: 0
        }}>プロンプト管理 {pagination.total > 0 && <span style={{ color: '#64748b', fontSize: '24px' }}>({pagination.total}件)</span>}</h1>
        <Link
          href="/admin/prompts/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
        >
          <Plus size={20} />
          新規作成
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        {isLoading ? (
          <div style={{
            padding: '48px 32px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}>
            読み込み中...
          </div>
        ) : prompts.length === 0 ? (
          <div style={{
            padding: '48px 32px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}>
            プロンプトがまだありません。
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontSize: '14px'
                }}>タイトル</th>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontSize: '14px'
                }}>カテゴリ</th>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontSize: '14px'
                }}>状態</th>
                <th style={{
                  textAlign: 'right',
                  padding: '16px 24px',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontSize: '14px'
                }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((prompt, index) => (
                <tr
                  key={prompt.id}
                  style={{
                    borderBottom: index !== prompts.length - 1 ? '1px solid #e2e8f0' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  <td style={{
                    padding: '16px 24px',
                    borderBottom: 'inherit'
                  }}>
                    <div>
                      <p style={{
                        fontWeight: '600',
                        color: '#0f172a',
                        margin: 0,
                        fontSize: '14px'
                      }}>{prompt.title}</p>
                      <p style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginTop: '6px',
                        margin: 0
                      }}>{prompt.description}</p>
                    </div>
                  </td>
                  <td style={{
                    padding: '16px 24px',
                    color: '#475569',
                    fontSize: '14px',
                    borderBottom: 'inherit'
                  }}>
                    {prompt.category.name}
                  </td>
                  <td style={{
                    padding: '16px 24px',
                    borderBottom: 'inherit'
                  }}>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block',
                        backgroundColor: prompt.isPublished ? 'rgba(2, 132, 199, 0.1)' : '#f1f5f9',
                        color: prompt.isPublished ? '#0284c7' : '#64748b'
                      }}
                    >
                      {prompt.isPublished ? '推荐中' : '未推荐'}
                    </span>
                  </td>
                  <td style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    borderBottom: 'inherit'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '8px'
                    }}>
                      <Link
                        href={`/admin/prompts/${prompt.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          color: '#475569',
                          borderRadius: '6px',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.1)';
                          e.currentTarget.style.color = '#0284c7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#475569';
                        }}
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(prompt.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          color: '#475569',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          transition: 'all 0.2s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fee2e2';
                          e.currentTarget.style.color = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#475569';
                        }}
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  )
}
