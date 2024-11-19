import React from 'react'
import ItemCard from './ItemCard'
import { Item } from '../types' // You might need to create/import this type

interface ItemGridProps {
  filteredItems: Item[]
  searchQuery: string
}

export default function ItemGrid({ filteredItems, searchQuery }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.length ? (
        filteredItems.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            searchQuery={searchQuery} 
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No items found matching your criteria
        </p>
      )}
    </div>
  )
} 