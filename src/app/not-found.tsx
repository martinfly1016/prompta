import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          404
        </h1>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#334155' }}>
          ページが見つかりません
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>
          申し訳ございません。お探しのページは見つかりませんでした。
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            padding: '12px 24px',
            backgroundColor: '#0284c7',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ホームに戻る
          </Link>
          <Link href="/?search=" style={{
            padding: '12px 24px',
            backgroundColor: '#e2e8f0',
            color: '#0f172a',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            プロンプトを検索
          </Link>
        </div>
      </div>
    </div>
  )
}
