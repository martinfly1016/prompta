'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  _count?: { prompts: number }
}

interface Prompt {
  id: string
  title: string
  description: string
  category: { name: string; slug: string }
  views: number
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, promptsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/prompts?limit=6'),
        ])

        const catsData = await catsRes.json()
        const promptsData = await promptsRes.json()

        setCategories(catsData)
        setPrompts(promptsData.prompts || [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            プロンプタ
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#categories" className="hover:text-primary transition-colors">
              カテゴリ
            </Link>
            <Link href="/search" className="hover:text-primary transition-colors">
              検索
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              管理画面
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            AIを使いこなすためのプロンプト集
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            ChatGPT、Claude、その他のAIツール向けの高品質なプロンプトを無料で提供しています。
          </p>

          <div className="max-w-md mx-auto">
            <Link
              href="/search"
              className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors w-full justify-center"
            >
              <Search size={20} />
              プロンプトを検索
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">カテゴリ</h2>

          {isLoading ? (
            <div className="text-center text-muted-foreground">読み込み中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group p-6 border border-border rounded-lg hover:shadow-lg transition-all hover:border-primary"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-3">{cat.icon || '📌'}</div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {cat._count?.prompts || 0}個のプロンプト
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">最新プロンプト</h2>
            <Link href="/search" className="text-primary hover:underline">
              すべて見る →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">読み込み中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompt/${prompt.id}`}
                  className="group p-6 bg-white dark:bg-slate-800 border border-border rounded-lg hover:shadow-lg transition-all hover:border-primary"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {prompt.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {prompt.category.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      👁️ {prompt.views}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">プロンプト作成者様へ</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            あなたが作成したプロンプトを共有しませんか?
            管理画面からプロンプトを追加・管理できます。
          </p>
          <Link
            href="/admin/login"
            className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            管理画面へログイン
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">プロンプタ</h3>
              <p className="text-slate-400 text-sm">
                AIプロンプトの共有プラットフォーム
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    検索
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">その他</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/admin/login" className="hover:text-white transition-colors">
                    管理画面
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">言語</h4>
              <p className="text-sm text-slate-400">日本語 (日本)</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Prompta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
