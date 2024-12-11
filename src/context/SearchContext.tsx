import { useState, useMemo } from 'react'
import { Item } from '../types'

export function useSearch(items: Item[]) {
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

  return {
    searchQuery,
    selectedCategory,
    categories,
    filteredItems,
    setSearchQuery,
    setSelectedCategory,
  }
}
