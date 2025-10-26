'use client'

interface TagChipProps {
  name: string
  color?: string
  onClick?: () => void
  className?: string
}

const colorStyles = {
  blue: {
    bg: 'rgb(45 53 72)',           /* 深蓝灰色背景 #2d3548 */
    text: 'rgb(147 197 253)',       /* 浅蓝色文字 */
    darkBg: 'rgb(45 53 72)',
    darkText: 'rgb(147 197 253)',
  },
  purple: {
    bg: 'rgb(55 48 80)',           /* 深紫色背景 */
    text: 'rgb(196 181 253)',       /* 浅紫色文字 */
    darkBg: 'rgb(55 48 80)',
    darkText: 'rgb(196 181 253)',
  },
  pink: {
    bg: 'rgb(80 48 68)',           /* 深粉色背景 */
    text: 'rgb(249 168 212)',       /* 浅粉色文字 */
    darkBg: 'rgb(80 48 68)',
    darkText: 'rgb(249 168 212)',
  },
  green: {
    bg: 'rgb(48 80 56)',           /* 深绿色背景 */
    text: 'rgb(134 239 172)',       /* 浅绿色文字 */
    darkBg: 'rgb(48 80 56)',
    darkText: 'rgb(134 239 172)',
  },
  red: {
    bg: 'rgb(80 48 48)',           /* 深红色背景 */
    text: 'rgb(252 165 165)',       /* 浅红色文字 */
    darkBg: 'rgb(80 48 48)',
    darkText: 'rgb(252 165 165)',
  },
  orange: {
    bg: 'rgb(80 60 45)',           /* 深橙色背景 */
    text: 'rgb(254 174 79)',        /* 浅橙色文字 */
    darkBg: 'rgb(80 60 45)',
    darkText: 'rgb(254 174 79)',
  },
  indigo: {
    bg: 'rgb(50 52 80)',           /* 深靛蓝背景 */
    text: 'rgb(165 180 252)',       /* 浅靛蓝文字 */
    darkBg: 'rgb(50 52 80)',
    darkText: 'rgb(165 180 252)',
  },
  cyan: {
    bg: 'rgb(45 70 80)',           /* 深青色背景 */
    text: 'rgb(34 211 238)',        /* 浅青色文字 */
    darkBg: 'rgb(45 70 80)',
    darkText: 'rgb(34 211 238)',
  },
}

export default function TagChip({
  name,
  color = 'blue',
  onClick,
  className = '',
}: TagChipProps) {
  const style = colorStyles[color as keyof typeof colorStyles] || colorStyles.blue

  const baseStyle = {
    display: 'inline-block',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    borderRadius: '9999px',
    fontWeight: 500,
    fontSize: '0.65rem',
    backgroundColor: style.darkBg,
    color: style.darkText,
    transition: 'opacity 0.2s ease',
    border: 'none',
    cursor: onClick ? 'pointer' : 'default',
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={{
          ...baseStyle,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        className={className}
      >
        {name}
      </button>
    )
  }

  return <span style={baseStyle} className={className}>{name}</span>
}
