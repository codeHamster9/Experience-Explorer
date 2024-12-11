import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../SearchBar'
import { describe, vi, beforeEach, it, expect } from 'vitest'

describe('SearchBar', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)
    expect(
      screen.getByPlaceholderText('Search experiences...')
    ).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    render(<SearchBar value="test" onChange={mockOnChange} />)
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)
    const input = screen.getByPlaceholderText('Search experiences...')

    fireEvent.change(input, { target: { value: 'new search' } })
    expect(mockOnChange).toHaveBeenCalledWith('new search')
  })

  it('renders search icon', () => {
    render(<SearchBar value="" onChange={mockOnChange} />)
    expect(screen.getByTestId('search')).toBeInTheDocument()
  })
})
