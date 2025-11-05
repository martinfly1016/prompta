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
    <div className="flex h-screen" style={{ backgroundColor: '#f8fafc' }} data-admin-layout>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col`}
        style={{
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0'
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {sidebarOpen ? (
            <div>
              <h1 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0
              }}>プロンプタ</h1>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                marginTop: '4px',
                margin: 0
              }}>管理画面</p>
            </div>
          ) : (
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a'
            }}>P</div>
          )}
        </div>

        {/* Menu Items */}
        <nav style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                  color: isActive ? '#0284c7' : '#475569',
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                <Icon size={20} color={isActive ? '#0284c7' : '#475569'} />
                {sidebarOpen && <span style={{ fontSize: '14px' }}>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e2e8f0'
        }}>
          {sidebarOpen && (
            <>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                marginBottom: '12px',
                margin: 0
              }}>ログイン中</p>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#0f172a',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '12px',
                margin: 0
              }}>{session?.user?.email}</p>
            </>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#f1f5f9',
              border: 'none',
              color: '#475569',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>ログアウト</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              color: '#475569',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div style={{
          height: '64px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '32px',
          paddingRight: '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            {menuItems.find((item) => item.href === pathname)?.label || 'ダッシュボード'}
          </h2>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: '#f8fafc',
          width: '100%'
        }}>
          <div style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '32px',
            boxSizing: 'border-box'
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
