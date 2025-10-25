import { prisma } from '@/lib/prisma'
import { BarChart3, FileText, Layers, Eye } from 'lucide-react'

async function getDashboardStats() {
  const [totalPrompts, publishedPrompts, totalCategories, totalViews] = await Promise.all([
    prisma.prompt.count(),
    prisma.prompt.count({ where: { isPublished: true } }),
    prisma.category.count(),
    prisma.prompt.aggregate({
      _sum: { views: true },
    }),
  ])

  return {
    totalPrompts,
    publishedPrompts,
    totalCategories,
    totalViews: totalViews._sum.views || 0,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: '総プロンプト数',
      value: stats.totalPrompts,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: '公開中',
      value: stats.publishedPrompts,
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'カテゴリ数',
      value: stats.totalCategories,
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: '総閲覧数',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
                <div className={`${card.bgColor} rounded-lg p-3`}>
                  <Icon className={`${card.color}`} size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/prompts"
            className="p-4 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <h3 className="font-semibold">新しいプロンプトを追加</h3>
            <p className="text-sm text-muted-foreground mt-1">
              新しいプロンプトを作成または編集
            </p>
          </a>
          <a
            href="/admin/categories"
            className="p-4 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <h3 className="font-semibold">カテゴリを管理</h3>
            <p className="text-sm text-muted-foreground mt-1">
              カテゴリを追加・編集・削除
            </p>
          </a>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200">ヒント</h3>
        <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
          プロンプトは作成後、「公開」状態にしないと、公開サイトには表示されません。
        </p>
      </div>
    </div>
  )
}
