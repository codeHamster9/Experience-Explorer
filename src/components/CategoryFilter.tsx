import React, { useMemo } from 'react'
import { Filter } from 'lucide-react'
import { Item } from '../features/experience-search/types'
import { useAtom } from 'jotai'
import { selectedCategoryAtom } from '../store/searchAtoms'

interface CategoryFilterProps {
  items: Item[]
}

export default function CategoryFilter({
  items
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    
    [items]
  )

  return (
    <div className="relative">
      <Filter
        data-testid="filter"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white dark:bg-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer">
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
