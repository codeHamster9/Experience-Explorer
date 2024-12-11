
interface ItemGridProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

export default function ItemGrid<T>({ items, renderItem }: ItemGridProps<T>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.length ? (
        items.map((item) => renderItem(item))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No items found matching your criteria
        </p>
      )}
    </div>
  )
} 