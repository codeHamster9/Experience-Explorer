import { render, screen, fireEvent } from '@testing-library/react'
import SearchSection from '../SearchSection'
import { items } from '../../data/items'
import { describe, it, expect } from 'vitest'

describe('SearchSection', () => {
  it('renders all items initially', () => {
    render(<SearchSection items={items} />)
    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('filters items by search query', () => {
    render(<SearchSection items={items} />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')

    fireEvent.change(searchInput, { target: { value: 'Mountain' } })

    expect(screen.getByText('Mountain')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()
  })

  it('filters items by category', () => {
    render(<SearchSection items={items} />)
    const categorySelect = screen.getByRole('combobox')

    fireEvent.change(categorySelect, { target: { value: 'Adventure' } })

    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.getByText('Forest Camping')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()
  })

  it('shows no results message when no items match', () => {
    render(<SearchSection items={items} />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')

    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    expect(
      screen.getByText('No items found matching your criteria')
    ).toBeInTheDocument()
  })

  it('combines search and category filters', () => {
    render(<SearchSection items={items} />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')
    const categorySelect = screen.getByRole('combobox')

    fireEvent.change(searchInput, { target: { value: 'Mountain' } })
    fireEvent.change(categorySelect, { target: { value: 'Adventure' } })

    expect(screen.getByText('Mountain')).toBeInTheDocument()
    expect(screen.queryByText('Forest Camping')).not.toBeInTheDocument()
  })
})
