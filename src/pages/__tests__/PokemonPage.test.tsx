import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PokemonPage from '../../pages/pokemonPage'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

vi.mock('../../services/pokemonService', () => ({
  usePokemon: () => ({
    data: {
      id: 1,
      name: 'Bulbasaur',
      sprites: { front_default: 'bulbasaur.png' },
      stats: [{ base_stat: 100 }],
      moves: [{ move: { name: 'tackle' } }]
    },
    isLoading: false
  })
}))

describe('PokemonPage', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )

  it('renders pokemon battle page', async () => {
    render(<PokemonPage />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Current Turn: Player 1')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    vi.mock('../../services/pokemonService', () => ({
      usePokemon: () => ({
        isLoading: true
      })
    }))

    render(<PokemonPage />, { wrapper })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
}) 