'use client'

export default function QuickActionsSection() {
  return (
    <div
      className="rounded-lg border transition-all duration-200"
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#0f172a',
        margin: 0,
        marginBottom: '24px'
      }}>クイックアクション</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/prompts"
          style={{
            padding: '24px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            transition: 'all 0.2s',
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0284c7';
            e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.05)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <h3 style={{
            fontWeight: '600',
            color: '#0f172a',
            fontSize: '16px',
            margin: 0
          }}>新しいプロンプトを追加</h3>
          <p style={{
            fontSize: '14px',
            color: '#475569',
            marginTop: '8px',
            margin: 0
          }}>
            新しいプロンプトを作成または編集
          </p>
        </a>
        <a
          href="/admin/categories"
          style={{
            padding: '24px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            transition: 'all 0.2s',
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0284c7';
            e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.05)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <h3 style={{
            fontWeight: '600',
            color: '#0f172a',
            fontSize: '16px',
            margin: 0
          }}>カテゴリを管理</h3>
          <p style={{
            fontSize: '14px',
            color: '#475569',
            marginTop: '8px',
            margin: 0
          }}>
            カテゴリを追加・編集・削除
          </p>
        </a>
      </div>
    </div>
  )
}
