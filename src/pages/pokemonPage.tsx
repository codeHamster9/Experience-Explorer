import { useAtom, useAtomValue } from 'jotai'
import { usePokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'
import BattleLog from '../components/BattleLog'
import {
  pokemonIdsAtom,
  player1HPAtom,
  player2HPAtom,
  isPlayer1TurnAtom,
  gameLogAtom,
  winnerAtom,
  handleMoveAtom,
  initGameAtom,
  currentTurnAtom
} from '../store/battleAtoms'
import { useEffect } from 'react'

export default function PokemonPage() {
  // Read-only atoms
  const pokemonIds = useAtomValue(pokemonIdsAtom)
  const player1HP = useAtomValue(player1HPAtom)
  const player2HP = useAtomValue(player2HPAtom)
  const isPlayer1Turn = useAtomValue(isPlayer1TurnAtom)
  const gameLog = useAtomValue(gameLogAtom)
  const winner = useAtomValue(winnerAtom)
  const currentTurn = useAtomValue(currentTurnAtom)

  // Action atoms
  const [, initGame] = useAtom(initGameAtom)
  const [, handleMove] = useAtom(handleMoveAtom)

  // Fetch Pokemon data using React Query
  const { data: player1Pokemon, isLoading: isLoading1 } = usePokemon(pokemonIds.player1)
  const { data: player2Pokemon, isLoading: isLoading2 } = usePokemon(pokemonIds.player2)

  // Set initial HP when Pokemon data is loaded
  useEffect(() => {
    if (player1Pokemon && player2Pokemon && player1HP === 0 && player2HP === 0) {
      initGame({ player1HP, player2HP })
    }
  }, [player1Pokemon, player2Pokemon, player1HP, player2HP, initGame])

  if (isLoading1 || isLoading2 || !player1Pokemon || !player2Pokemon) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  return (
    <main className="container mx-auto p-4">
      {winner && (
        <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{winner} Wins!</h2>
          <button
            onClick={() => initGame({ player1HP, player2HP })}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {!winner && (
        <div className="mb-8 text-center text-xl font-semibold text-gray-700">
          Current Turn: {currentTurn}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PokemonCard
          pokemon={player1Pokemon}
          hp={player1HP}
          isPlayerTurn={isPlayer1Turn && !winner}
          onMoveSelect={handleMove}
        />
        <PokemonCard
          pokemon={player2Pokemon}
          hp={player2HP}
          isPlayerTurn={!isPlayer1Turn && !winner}
          onMoveSelect={handleMove}
        />
      </div>

      <BattleLog logs={gameLog} />
    </main>
  )
} 