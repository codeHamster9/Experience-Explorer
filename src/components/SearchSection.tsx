import React, { useState, useMemo, useCallback } from 'react'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ItemGrid from './ItemGrid'
import { Item } from '../types'


interface SearchSectionProps {
  items: Item[]
}

export default function SearchSection({ items }: SearchSectionProps) {
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

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value)
  }, [])

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>
      <ItemGrid filteredItems={filteredItems} searchQuery={searchQuery} />
    </>
  )
} 