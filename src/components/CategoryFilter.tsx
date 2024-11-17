import React from 'react'
import { Filter } from 'lucide-react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onChange: (category: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="relative">
      <Filter
        data-testid="filter"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
