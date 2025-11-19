'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '60px', paddingBottom: '40px', borderTop: '1px solid #1e293b' }}>
      <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontWeight: 700, color: '#ffffff', marginBottom: '12px', fontSize: '18px' }}>プロンプタ</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
              AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '12px', fontSize: '14px' }}>ナビゲーション</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  ホーム
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="#categories" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  カテゴリ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '12px', fontSize: '14px' }}>言語</h4>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>日本語 (日本)</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '12px', fontSize: '14px' }}>お問い合わせ</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="https://twitter.com/prompta_jp" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  X: @prompta_jp
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:prompta.jp@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  メール: prompta.jp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          <p style={{ margin: 0 }}>&copy; 2024 Prompta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
