'use client'

import { useEffect, useRef } from 'react'

interface TagChipProps {
  name: string
  color?: string
  onClick?: () => void
  className?: string
}

export default function TagChip({
  name,
  color = 'blue',
  onClick,
  className = '',
}: TagChipProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Unified purple border style for all tags - compact size for card display
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderRadius: '9999px',
    fontWeight: 500,
    fontSize: '0.875rem',
    backgroundColor: 'transparent',
    border: '1px solid #9333ea',
    transition: 'opacity 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    textDecoration: 'none',
  }

  // Apply style with !important for non-button elements
  useEffect(() => {
    if (spanRef.current && !onClick) {
      spanRef.current.setAttribute('style', `
        display: inline-block;
        padding: 6px 12px;
        border-radius: 9999px;
        font-weight: 500;
        font-size: 0.875rem;
        background-color: transparent;
        color: #9333ea !important;
        border: 1px solid #9333ea;
        transition: opacity 0.2s ease;
        cursor: default;
        text-decoration: none;
      `)
    }
  }, [onClick])

  if (onClick) {
    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        style={{
          ...baseStyle,
          color: '#9333ea',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.8'
          e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
        className={className}
      >
        {name}
      </button>
    )
  }

  return (
    <span
      ref={spanRef}
      className={className}
    >
      {name}
    </span>
  )
}
