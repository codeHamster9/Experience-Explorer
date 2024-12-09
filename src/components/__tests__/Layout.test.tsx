import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Layout'
import { vi, describe, it, expect } from 'vitest'
import React from 'react'

// Mock the Clerk components
vi.mock('@clerk/clerk-react', () => ({
  UserButton: () => <div data-testid="user-button">User Button</div>,
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Layout', () => {
  it('renders header with title and navigation', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )

    expect(screen.getByText('MyApp')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Pokemon Battle')).toBeInTheDocument()
  })

  it('renders user button', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )

    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })
})
