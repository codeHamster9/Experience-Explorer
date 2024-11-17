import React, { useState, useMemo } from 'react'
import { items } from '../data/items'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ItemCard from './ItemCard'

export default function FilterableList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Discover Experiences
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No items found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
