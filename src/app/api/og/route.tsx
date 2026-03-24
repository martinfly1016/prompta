import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Tool colors matching constants.ts
const TOOL_COLORS: Record<string, string> = {
  'stable-diffusion': '#7c3aed',
  'midjourney': '#2563eb',
  'chatgpt': '#10a37f',
  'claude': '#d97706',
  'dall-e': '#ef4444',
  'gemini': '#4285f4',
}

const TOOL_ICONS: Record<string, string> = {
  'stable-diffusion': '🎨',
  'midjourney': '🖼️',
  'chatgpt': '💬',
  'claude': '🤖',
  'dall-e': '🎯',
  'gemini': '✨',
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'AIプロンプト集'
  const tool = searchParams.get('tool') || ''
  const category = searchParams.get('category') || ''
  const type = searchParams.get('type') || 'prompt' // prompt | tool | category | guide

  const toolColor = TOOL_COLORS[tool] || '#0ea5e9'
  const toolIcon = TOOL_ICONS[tool] || ''

  // Load Noto Sans JP font
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEk757Y0rw_qMHVdbR2L8Y9QTJ1LwkRmR5GprQAe-TiQ.0.woff2'
  ).then(res => res.arrayBuffer())

  const typeLabel = type === 'guide' ? 'ガイド' : type === 'tool' ? 'ツール' : type === 'category' ? 'カテゴリ' : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: '"Noto Sans JP"',
        }}
      >
        {/* Top: badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {tool && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: toolColor,
                color: 'white',
                fontSize: '24px',
                fontWeight: 700,
              }}
            >
              {toolIcon} {tool.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()).replace('Dall E', 'DALL-E').replace('Chatgpt', 'ChatGPT')}
            </div>
          )}
          {category && (
            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '22px',
              }}
            >
              {category}
            </div>
          )}
          {typeLabel && !tool && !category && (
            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(14,165,233,0.2)',
                color: '#7dd3fc',
                fontSize: '22px',
                fontWeight: 600,
              }}
            >
              {typeLabel}
            </div>
          )}
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: title.length > 30 ? '48px' : '56px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title.length > 60 ? title.slice(0, 57) + '...' : title}
          </div>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: 'white',
                fontSize: '24px',
                fontWeight: 700,
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}>Prompta</span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>prompta.jp</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
            }}
          >
            AIプロンプト集
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
