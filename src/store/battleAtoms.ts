import { atom } from 'jotai'
import { Pokemon } from '../types/pokemon'

interface PokemonPlayer {
  pokemon: Pokemon | null;
  hp: number;
  id: number;
}

// Helper function to get random Pokemon ID
const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1

// Initial state factory to ensure fresh state
const createInitialPlayer = () => ({
  pokemon: null,
  hp: 0,
  id: getRandomPokemonId(),
})

// Atoms for game state
export const player1Atom = atom<PokemonPlayer>(createInitialPlayer())
export const player2Atom = atom<PokemonPlayer>(createInitialPlayer())

export const isPlayer1TurnAtom = atom<boolean>(true)
export const gameLogAtom = atom<string[]>([])
export const winnerAtom = atom<string | null>(null)

// Derived atom for current turn display
export const currentTurnAtom = atom(
  (get) => get(isPlayer1TurnAtom) ? 'Player 1' : 'Player 2'
)

// Action atoms
export const initGameAtom = atom(
  null,
  (get, set) => {
    // Reset both players with new IDs
    set(player1Atom, createInitialPlayer())
    set(player2Atom, createInitialPlayer())
    
    // Reset game state
    set(isPlayer1TurnAtom, true)
    set(gameLogAtom, [])
    set(winnerAtom, null)
  }
)

export const handleMoveAtom = atom(
  null,
  (get, set, moveName: string) => {
    const winner = get(winnerAtom)
    if (winner) return

    const damage = Math.floor(Math.random() * 50) + 10
    const isPlayer1Turn = get(isPlayer1TurnAtom)
    const currentPlayer = isPlayer1Turn ? 'Player 1' : 'Player 2'
    
    const targetAtom = isPlayer1Turn ? player2Atom : player1Atom
    const targetPlayer = get(targetAtom)

    const newHP = Math.max(0, targetPlayer.hp - damage)
    
    set(targetAtom, {
      ...targetPlayer,
      hp: newHP,
    })

    set(gameLogAtom, (prev) => [...prev, `${currentPlayer} used ${moveName} for ${damage} damage!`])

    if (newHP <= 0) {
      set(winnerAtom, currentPlayer)
      set(gameLogAtom, (prev) => [...prev, `${currentPlayer} wins the battle!`])
    } else {
      set(isPlayer1TurnAtom, !isPlayer1Turn)
    }
  }
)

// Action to update Pokemon data when loaded
export const updatePokemonAtom = atom(
  null,
  (get, set, { player, pokemon }: { player: 'player1' | 'player2', pokemon: Pokemon }) => {
    const playerAtom = player === 'player1' ? player1Atom : player2Atom
    const currentPlayer = get(playerAtom)
    
  
      set(playerAtom, {
        ...currentPlayer,
        pokemon,
        hp: pokemon.stats[0].base_stat
      })
    
  }
) 