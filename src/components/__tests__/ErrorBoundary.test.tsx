import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'
import { vi, describe, beforeEach, afterAll, it, expect } from 'vitest'
import React from 'react'

const ErrorComponent = () => {
  throw new Error('Test error')
}

const consoleErrorSpy = vi.spyOn(console, 'error')
consoleErrorSpy.mockImplementation(() => {})

describe('ErrorBoundary', () => {
  beforeEach(() => {
    consoleErrorSpy.mockClear()
  })

  afterAll(() => {
    consoleErrorSpy.mockRestore()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders error UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument()
  })

  it('logs error information when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(consoleErrorSpy).toHaveBeenCalled()
  })

  it('refresh button reloads the page', () => {
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByRole('button', { name: /refresh page/i }))
    expect(reloadMock).toHaveBeenCalled()
  })
})
