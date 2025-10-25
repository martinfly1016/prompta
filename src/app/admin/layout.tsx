'use client'

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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          {sidebarOpen ? (
            <div>
              <h1 className="text-xl font-bold">プロンプタ</h1>
              <p className="text-xs text-slate-400">管理画面</p>
            </div>
          ) : (
            <div className="text-xl font-bold">P</div>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-700">
          {sidebarOpen && (
            <>
              <p className="text-xs text-slate-400 mb-3">ログイン中</p>
              <p className="text-sm font-medium truncate mb-3">{session?.user?.email}</p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
          >
            <LogOut size={16} />
            {sidebarOpen && <span>ログアウト</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-border flex items-center px-6">
          <h2 className="text-2xl font-bold text-foreground">
            {menuItems.find((item) => item.href === pathname)?.label || 'ダッシュボード'}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
