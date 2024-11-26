import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'jotai'
import PokemonCard from '../PokemonCard'
import { describe, it, expect, vi } from 'vitest'

const mockPokemon = {
  id: 1,
  name: 'Bulbasaur',
  sprites: {
    front_default: 'bulbasaur.png'
  },
  stats: [{ base_stat: 100 }],
  moves: [
    { move: { name: 'tackle' } },
    { move: { name: 'growl' } }
  ]
}

vi.mock('../../store/battleAtoms', () => ({
  currentTurnAtom: { init: 'Player 1' },
  winnerAtom: { init: null },
  pokemonById: () => ({
    pokemon: mockPokemon,
    hp: 100
  })
}))

describe('PokemonCard', () => {
  const mockOnMoveSelect = vi.fn()

  it('renders pokemon information', () => {
    render(
      <Provider>
        <PokemonCard 
          pokemonId={1}
          playerId="Player 1"
          onMoveSelect={mockOnMoveSelect}
        />
      </Provider>
    )

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('HP: 100/100')).toBeInTheDocument()
    expect(screen.getByAltText('Bulbasaur')).toHaveAttribute('src', 'bulbasaur.png')
  })

  it('handles move selection', () => {
    render(
      <Provider>
        <PokemonCard 
          pokemonId={1}
          playerId="Player 1"
          onMoveSelect={mockOnMoveSelect}
        />
      </Provider>
    )

    fireEvent.click(screen.getByText('tackle'))
    expect(mockOnMoveSelect).toHaveBeenCalledWith('tackle')
  })
}) 