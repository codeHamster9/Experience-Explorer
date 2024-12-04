import React from 'react'
import { Search } from 'lucide-react'
import {searchQueryAtom} from '../../store/searchAtoms'
import { useAtom } from 'jotai/react'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  return (
    <div className="flex-1 relative">
      <Search data-testid="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search experiences..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      />
    </div>
  )
}