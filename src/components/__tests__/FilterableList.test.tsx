import { render, screen, fireEvent } from '@testing-library/react'
import FilterableList from '../FilterableList'
import { items } from '../../data/items'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('FilterableList', () => {
  it('renders all items initially', () => {
    render(<FilterableList />)
    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('filters items by search query', () => {
    render(<FilterableList />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')

    fireEvent.change(searchInput, { target: { value: 'Mountain' } })

    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()
  })

  it('filters items by category', () => {
    render(<FilterableList />)
    const categorySelect = screen.getByRole('combobox')

    fireEvent.change(categorySelect, { target: { value: 'Adventure' } })

    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.getByText('Forest Camping')).toBeInTheDocument()
    expect(screen.queryByText('Beach Resort')).not.toBeInTheDocument()
  })

  it('shows no results message when no items match', () => {
    render(<FilterableList />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')

    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    expect(
      screen.getByText('No items found matching your criteria')
    ).toBeInTheDocument()
  })

  it('combines search and category filters', () => {
    render(<FilterableList />)
    const searchInput = screen.getByPlaceholderText('Search experiences...')
    const categorySelect = screen.getByRole('combobox')

    fireEvent.change(searchInput, { target: { value: 'Mountain' } })
    fireEvent.change(categorySelect, { target: { value: 'Adventure' } })

    expect(screen.getByText('Mountain Trek')).toBeInTheDocument()
    expect(screen.queryByText('Forest Camping')).not.toBeInTheDocument()
  })
})
