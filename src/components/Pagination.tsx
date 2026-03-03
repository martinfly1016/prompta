import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null

  function pageHref(page: number) {
    if (page === 1) return basePath
    const sep = basePath.includes('?') ? '&' : '?'
    return `${basePath}${sep}page=${page}`
  }

  return (
    <nav aria-label="ページネーション" className={`flex items-center justify-center gap-2 mt-12 mb-8 flex-wrap ${className}`}>
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          rel="prev"
          className="px-3 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          ← 前へ
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
          ← 前へ
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className="w-10 h-10 flex items-center justify-center rounded-lg font-medium bg-blue-600 text-white"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={pageHref(page)}
              className="w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          rel="next"
          className="px-3 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          次へ →
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
          次へ →
        </span>
      )}
    </nav>
  )
}
