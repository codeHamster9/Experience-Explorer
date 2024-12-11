import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ItemGrid from './ItemGrid'
import { Item } from '../types'
import { useSearch } from '../context/SearchContext'
import ItemCard from './ItemCard'

interface SearchSectionProps {
  items: Item[]
}

export default function SearchSection({ items }: SearchSectionProps) {
  const {
    searchQuery,
    selectedCategory,
    categories,
    filteredItems,
    setSearchQuery,
    setSelectedCategory,
  } = useSearch(items)

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
      <ItemGrid
        items={filteredItems}
        renderItem={(item: Item) => <ItemCard item={item} searchQuery={searchQuery} />}
      />
    </>
  )
}