import React, { useState, useMemo, useCallback } from 'react'
import { items } from '../data/items'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ItemGrid from '../components/ItemGrid'
import { useRenderCount } from '@uidotdev/usehooks'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const renderCount = useRenderCount()
  console.info('renderCount home:', renderCount)

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    []
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
  }, [searchQuery, selectedCategory])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className=" mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Discover Experiences
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
          <ItemGrid 
            filteredItems={filteredItems} 
            searchQuery={searchQuery} 
          />
        </div>
      </div>
    </div>
  )
}
