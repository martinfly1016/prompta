'use client'

export default function PromptCardSkeleton() {
  return (
    <div className="skeleton-card">
      {/* 图片骨架 */}
      <div className="skeleton-card-image" />

      {/* 内容骨架 */}
      <div className="skeleton-card-content">
        {/* 标题骨架 */}
        <div className="skeleton-text skeleton-text-title" />
        <div className="skeleton-text skeleton-text-title-short" />

        {/* 描述骨架 */}
        <div className="skeleton-text skeleton-text-desc" />
        <div className="skeleton-text skeleton-text-desc-short" />

        {/* 标签骨架 */}
        <div className="skeleton-tags">
          <div className="skeleton-tag" />
          <div className="skeleton-tag" />
        </div>

        {/* 底部信息骨架 */}
        <div className="skeleton-footer">
          <div className="skeleton-text skeleton-text-small" />
          <div className="skeleton-text skeleton-text-small" />
        </div>
      </div>
    </div>
  )
}
