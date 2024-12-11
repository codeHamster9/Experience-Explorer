import React from 'react'
import { render, screen } from '@testing-library/react'
import { ClerkProvider } from '@clerk/clerk-react'
import Layout from '../Layout'
import { vi, describe, it, expect } from 'vitest'

vi.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({
    children,
  }: {
    children: React.ReactNode | null | undefined;
  }) => {
    if (!children) {
      throw new Error('ClerkProvider: children is null or undefined')
    }
    return <>{children}</>
  },
  UserButton: () => <div data-testid="user-button">User Button</div>,
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>
  }
})

describe('Layout', () => {
  it('renders header with title and user button', () => {
    render(
      <ClerkProvider publishableKey="test">
        <Layout />
      </ClerkProvider>
    )

    expect(screen.getByText('Experience Explorer')).toBeInTheDocument()
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })
})
