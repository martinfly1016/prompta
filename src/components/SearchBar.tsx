'use client'

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
  isSearching?: boolean
}

export default function SearchBar({
  onSearch,
  onClear,
  isSearching = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        onSearch(query)
      }
    },
    [query, onSearch]
  )

  const handleClear = useCallback(() => {
    setQuery('')
    onClear()
  }, [onClear])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit(e as any)
      }
    },
    [handleSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className="search-bar-wrapper">
      <div className="search-bar-container">
        <div className="search-input-group">
          <Search className="search-bar-icon" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="検索..."
            className="search-bar-input"
            disabled={isSearching}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="search-bar-clear"
              title="検索をクリア"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="search-bar-button"
          disabled={isSearching || !query.trim()}
        >
          {isSearching ? (
            <div className="spinner-small" />
          ) : (
            <Search size={18} />
          )}
        </button>
      </div>
    </form>
  )
}
