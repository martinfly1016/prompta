'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Menu, X, LogOut, LayoutDashboard, FileText, Layers, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // 如果是登录页面，不显示侧边栏和顶部栏
  const isLoginPage = pathname === '/admin/login'

  const menuItems = [
    {
      href: '/admin/dashboard',
      label: 'ダッシュボード',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/prompts',
      label: 'プロンプト管理',
      icon: FileText,
    },
    {
      href: '/admin/categories',
      label: 'カテゴリ管理',
      icon: Layers,
    },
    {
      href: '/admin/settings',
      label: '設定',
      icon: Settings,
    },
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  // 如果是登录页面，只返回 children
  if (isLoginPage) {
    return children
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-200">
          {sidebarOpen ? (
            <div>
              <h1 className="text-lg font-bold text-slate-900">プロンプタ</h1>
              <p className="text-xs text-slate-500 mt-1">管理画面</p>
            </div>
          ) : (
            <div className="text-lg font-bold text-slate-900">P</div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200">
          {sidebarOpen && (
            <>
              <p className="text-xs text-slate-500 mb-3">ログイン中</p>
              <p className="text-sm font-medium text-slate-900 truncate mb-3">{session?.user?.email}</p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            {sidebarOpen && <span>ログアウト</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            {menuItems.find((item) => item.href === pathname)?.label || 'ダッシュボード'}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
