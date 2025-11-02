'use client'

export default function SkeletonNav() {
  return (
    <nav className="category-nav-bar">
      {/* 全部按钮骨架 */}
      <div className="skeleton-nav-item" />

      {/* 分类按钮骨架 - 5个 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-nav-item skeleton-nav-item-wide" />
      ))}

      {/* 间隔 */}
      <div className="search-bar-nav-spacer"></div>

      {/* 搜索框骨架 */}
      <div className="skeleton-search-bar" />
    </nav>
  )
}
