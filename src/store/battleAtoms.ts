import { atom } from 'jotai'


interface PokemonIds {
  player1: number;
  player2: number;
}

// Atoms for game state
export const pokemonIdsAtom = atom<PokemonIds>({
  player1: Math.floor(Math.random() * 151) + 1,
  player2: Math.floor(Math.random() * 151) + 1,
})

export const player1HPAtom = atom<number>(0)
export const player2HPAtom = atom<number>(0)
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
  (get, set, { player1HP, player2HP }: { player1HP: number; player2HP: number }) => {
    const newPlayer1Id = Math.floor(Math.random() * 151) + 1
    const newPlayer2Id = Math.floor(Math.random() * 151) + 1
    
    set(pokemonIdsAtom, {
      player1: newPlayer1Id,
      player2: newPlayer2Id
    })
    set(player1HPAtom, player1HP)
    set(player2HPAtom, player2HP)
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
    const currentHP = isPlayer1Turn ? get(player2HPAtom) : get(player1HPAtom)

    const newHP = Math.max(0, currentHP - damage)
    
    if (isPlayer1Turn) {
      set(player2HPAtom, newHP)
    } else {
      set(player1HPAtom, newHP)
    }

    set(gameLogAtom, (prev) => [...prev, `${currentPlayer} used ${moveName} for ${damage} damage!`])

    if (newHP <= 0) {
      set(winnerAtom, currentPlayer)
      set(gameLogAtom, (prev) => [...prev, `${currentPlayer} wins the battle!`])
    } else {
      set(isPlayer1TurnAtom, !isPlayer1Turn)
    }
  }
) 