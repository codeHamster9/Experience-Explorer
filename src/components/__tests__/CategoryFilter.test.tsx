import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from '../CategoryFilter'
import { Provider } from 'jotai'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('CategoryFilter', () => {
  const mockItems = [
    { id: 1, category: 'Adventure', title: '', description: '', imageUrl: '' },
    { id: 2, category: 'Relaxation', title: '', description: '', imageUrl: '' },
    { id: 3, category: 'Urban', title: '', description: '', imageUrl: '' }
  ]

  it('renders all categories', () => {
    render(
      <Provider>
        <CategoryFilter items={mockItems} />
      </Provider>
    )

    expect(screen.getByText('All Categories')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('Relaxation')).toBeInTheDocument()
    expect(screen.getByText('Urban')).toBeInTheDocument()
  })

  it('shows selected category', () => {
    render(
      <Provider>
        <CategoryFilter items={mockItems} />
      </Provider>
    )

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Adventure' } })
    expect(select).toHaveValue('Adventure')
  })

  it('renders filter icon', () => {
    render(
      <Provider>
        <CategoryFilter items={mockItems} />
      </Provider>
    )
    expect(screen.getByTestId('filter')).toBeInTheDocument()
  })
})
