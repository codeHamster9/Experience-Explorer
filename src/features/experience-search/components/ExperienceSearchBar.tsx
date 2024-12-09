import SearchBar from '@/components/SearchBar/SearchBar'
import { searchQueryAtom } from '@/store/searchAtoms'
import { useAtom } from 'jotai/react'

export function ExperienceSearchBar() {
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
    return (
        <SearchBar placeholder="Search for experiences..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    )
}
