import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ItemGrid from './ItemGrid'
import { Item } from '../types'
import { SearchProvider, useSearch } from '../context/SearchContext'

interface SearchSectionProps {
  items: Item[]
}

function SearchContent() {
  const {
    searchQuery,
    selectedCategory,
    categories,
    filteredItems,
    setSearchQuery,
    setSelectedCategory,
  } = useSearch()

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <ItemGrid filteredItems={filteredItems} searchQuery={searchQuery} />
    </>
  )
}

export default function SearchSection({ items }: SearchSectionProps) {
  return (
    <SearchProvider items={items}>
      <SearchContent />
    </SearchProvider>
  )
}