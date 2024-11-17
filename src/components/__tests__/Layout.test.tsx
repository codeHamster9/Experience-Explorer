import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
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
}))

describe('Layout', () => {
  it('renders header with title and user button', () => {
    render(
      <ClerkProvider publishableKey="test">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ClerkProvider>
    )

    expect(screen.getByText('Experience Explorer')).toBeInTheDocument()
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })
})
