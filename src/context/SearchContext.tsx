import React, { createContext, useContext, useState, useMemo } from 'react'
import { Item } from '../types'

interface SearchContextType {
  searchQuery: string
  selectedCategory: string
  categories: string[]
  filteredItems: Item[]
  setSearchQuery: (value: string) => void
  setSelectedCategory: (value: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children, items }: { children: React.ReactNode; items: Item[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items]
  )

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [items, searchQuery, selectedCategory])

  const value = {
    searchQuery,
    selectedCategory,
    categories,
    filteredItems,
    setSearchQuery,
    setSelectedCategory,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
