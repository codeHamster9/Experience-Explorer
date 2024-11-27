import { render, screen, fireEvent } from '@testing-library/react'
import SearchSection from '../SearchSection'
import { items } from '../../data/items'
import { Provider } from 'jotai'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('SearchSection', () => {
  it('renders search bar and category filter', () => {
    render(
      <Provider>
        <SearchSection items={items} />
      </Provider>
    )
    
    expect(screen.getByPlaceholderText('Search experiences...')).toBeInTheDocument()
    expect(screen.getByText('All Categories')).toBeInTheDocument()
  })

  it('filters items by search query', () => {
    render(
      <Provider>
        <SearchSection items={items} />
      </Provider>
    )

    // Get initial items
    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.getByText('Beach Resort')).toBeInTheDocument()
    
    // Type into search bar
    const searchInput = screen.getByPlaceholderText('Search experiences...')
    fireEvent.change(searchInput, { target: { value: 'Mountain' } })

    // Verify filtered results
    expect(screen.getByText('Mountain')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()

    // Clear search should show all items again
    fireEvent.change(searchInput, { target: { value: '' } })
    expect(screen.getByText('Mountain Trek')).toBeInTheDocument() 
    expect(screen.getByText('Beach Resort')).toBeInTheDocument()
  })

  it('filters items by category', () => {
    render(
      <Provider>
        <SearchSection items={items} />
      </Provider>
    )
    
    const categorySelect = screen.getByRole('combobox')
    fireEvent.change(categorySelect, { target: { value: 'Adventure' } })

    // Check filtered results
    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()
  })
})
