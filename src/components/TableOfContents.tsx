'use client'

import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

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
    <nav className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <List size={18} className="text-white" />
        </div>
        <span>目次</span>
      </h2>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
          >
            <a
              href={`#${item.id}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeId === item.id
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-gray-700 hover:bg-white hover:text-blue-600'
              }`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(item.id)
                }
              }}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                activeId === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-100 text-blue-600'
              }`}>
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
