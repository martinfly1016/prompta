'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowRight } from 'lucide-react'
import TagChip from '@/components/TagChip'
import { getImageProxyUrl } from '@/lib/image-proxy'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  _count?: { prompts: number }
}

interface PromptImage {
  url: string
  altText?: string
}

interface Tag {
  id: string
  name: string
  color?: string
}

interface Prompt {
  id: string
  title: string
  description: string
  category: { name: string; slug: string }
  views: number
  images?: PromptImage[]
  tags?: Tag[]
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
          fetch('/api/prompts?limit=12'),
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
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            プロンプタ
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#categories" className="text-sm hover:text-primary transition-colors">
              カテゴリ
            </Link>
            <Link href="/search" className="text-sm hover:text-primary transition-colors">
              検索
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              管理画面
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-blue-900/20"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-indigo-900/20"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              AIを使いこなすための<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">プロンプト集</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              ChatGPT、Claude、その他のAIツール向けの高品質なプロンプトを無料で提供。
              <br className="hidden sm:block" />
              仕事の効率化から創造性の向上まで、あらゆるシーンで役立つプロンプト。
            </p>

            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <Search size={22} />
              プロンプトを検索
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Prompts - Moved Up */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">人気のプロンプト</div>
              <h2 className="text-4xl font-bold">トレンドプロンプト</h2>
            </div>
            <Link href="/search" className="text-primary hover:underline text-sm font-medium">
              すべて見る →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">読み込み中...</div>
          ) : prompts.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              プロンプトはまだ利用できません。
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {prompts.slice(0, 8).map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompt/${prompt.id}`}
                  className="group flex flex-col h-full bg-card rounded-xl border border-border hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* 图片 */}
                  <div className="relative w-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden flex-shrink-0" style={{paddingBottom: '100%'}}>
                    {prompt.images && prompt.images.length > 0 ? (
                      <img
                        src={getImageProxyUrl(prompt.images[0].url)}
                        alt={prompt.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🎯
                      </div>
                    )}
                  </div>

                  {/* 内容 */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                      {prompt.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
                      {prompt.description}
                    </p>

                    {/* Tags */}
                    {prompt.tags && prompt.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <TagChip
                            key={tag.id}
                            name={tag.name}
                            color={tag.color}
                          />
                        ))}
                        {prompt.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground px-2.5 py-1">
                            +{prompt.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border dark:border-slate-700/50">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium">
                        {prompt.category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        👁️ {prompt.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-14">
            <div className="text-sm font-semibold text-primary mb-2">カテゴリ一覧</div>
            <h2 className="text-4xl font-bold">用途別プロンプト</h2>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">読み込み中...</div>
          ) : categories.length === 0 ? (
            <div className="text-center text-muted-foreground">
              カテゴリが読み込めませんでした。後でもう一度お試しください。
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group relative p-7 border border-border rounded-xl hover:border-primary/50 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300"></div>

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {cat.icon || '📌'}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cat._count?.prompts || 0}個のプロンプト
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-300 flex-shrink-0"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">プロンプト作成者様へ</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-blue-100">
            あなたが作成したプロンプトを共有しませんか?
            <br className="hidden sm:block" />
            管理画面からプロンプトを追加・管理できます。
          </p>
          <Link
            href="/admin/login"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            管理画面へログイン
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4 text-lg">プロンプタ</h3>
              <p className="text-sm text-slate-400">
                AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">ナビゲーション</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    プロンプト検索
                  </Link>
                </li>
                <li>
                  <Link href="#categories" className="hover:text-white transition-colors">
                    カテゴリ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">管理</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/admin/login" className="hover:text-white transition-colors">
                    管理画面
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">言語</h4>
              <p className="text-sm">日本語 (日本)</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Prompta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
