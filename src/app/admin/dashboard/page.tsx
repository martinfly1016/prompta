export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { BarChart3, FileText, Layers, Eye } from 'lucide-react'
import QuickActionsSection from './QuickActionsSection'

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
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
    },
    {
      title: '公開中',
      value: stats.publishedPrompts,
      icon: BarChart3,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
    },
    {
      title: 'カテゴリ数',
      value: stats.totalCategories,
      icon: Layers,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
    },
    {
      title: '総閲覧数',
      value: stats.totalViews,
      icon: Eye,
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="rounded-lg border transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#475569',
                    margin: 0
                  }}>{card.title}</p>
                  <p style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginTop: '12px',
                    margin: 0
                  }}>{card.value}</p>
                </div>
                <div
                  className="rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: card.bgColor,
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon
                    color={card.color}
                    size={28}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <QuickActionsSection />

      {/* Info Card */}
      <div
        className="rounded-lg border-l-4 transition-all duration-200"
        style={{
          borderLeftColor: '#0284c7',
          backgroundColor: '#f0f7ff',
          borderColor: '#cffafe',
          padding: '24px'
        }}
      >
        <h3 style={{
          fontWeight: '600',
          color: '#0f172a',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>💡</span>
          ヒント
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#475569',
          marginTop: '12px',
          margin: 0
        }}>
          プロンプトは作成後、「公開」状態にしないと、公開サイトには表示されません。
        </p>
      </div>
    </div>
  )
}
