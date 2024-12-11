import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePokemon } from '../pokemonService'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('pokemonService', () => {
  beforeEach(() => {
    queryClient.clear()
  })

  it('fetches pokemon data', async () => {
    window.fetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'bulbasaur' }),
      })
    )

    const { result } = renderHook(() => usePokemon(1), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toEqual({ name: 'bulbasaur' })
    })
  })

  it('handles pokemon fetch error', async () => {
    window.fetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    )

    const { result } = renderHook(() => usePokemon(1), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })
  })
}) 