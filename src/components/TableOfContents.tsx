'use client'

import { useState, useEffect } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav style={{
      marginBottom: '40px',
      padding: '24px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
    }}>
      <h2 style={{
        fontSize: '16px',
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        📋 目次
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
          >
            <a
              href={`#${item.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                backgroundColor: activeId === item.id ? '#eff6ff' : 'transparent',
                color: activeId === item.id ? '#0284c7' : '#475569',
                fontWeight: activeId === item.id ? 600 : 400,
              }}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(item.id)
                }
              }}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: activeId === item.id ? '#0284c7' : '#e2e8f0',
                color: activeId === item.id ? '#ffffff' : '#64748b',
                flexShrink: 0,
              }}>
                {index + 1}
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
