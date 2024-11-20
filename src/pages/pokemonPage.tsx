import { useAtom, useAtomValue } from 'jotai'
import { usePokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'
import BattleLog from '../components/BattleLog'
import {
  player1Atom,
  player2Atom,
  isPlayer1TurnAtom,
  gameLogAtom,
  winnerAtom,
  handleMoveAtom,
  initGameAtom,
  currentTurnAtom,
  updatePokemonAtom
} from '../store/battleAtoms'

export default function PokemonPage() {
  // Read-only atoms
  const [player1] = useAtom(player1Atom)
  const [player2] = useAtom(player2Atom)
  const isPlayer1Turn = useAtomValue(isPlayer1TurnAtom)
  const gameLog = useAtomValue(gameLogAtom)
  const winner = useAtomValue(winnerAtom)
  const currentTurn = useAtomValue(currentTurnAtom)

  // Action atoms
  const [, initGame] = useAtom(initGameAtom)
  const [, handleMove] = useAtom(handleMoveAtom)
  const [, updatePokemon] = useAtom(updatePokemonAtom)

  // Fetch Pokemon data using React Query
  const { data: player1Pokemon, isLoading: isLoading1 } = usePokemon(player1.id)
  const { data: player2Pokemon, isLoading: isLoading2 } = usePokemon(player2.id)

  // Update Pokemon data when loaded
  if (player1Pokemon && !player1.pokemon) {
    updatePokemon({ player: 'player1', pokemon: player1Pokemon })
  }
  if (player2Pokemon && !player2.pokemon) {
    updatePokemon({ player: 'player2', pokemon: player2Pokemon })
  }

  if (isLoading1 || isLoading2 || !player1.pokemon || !player2.pokemon) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  return (
    <main className="container mx-auto p-4">
      {winner && (
        <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">{winner} Wins!</h2>
          <button
            onClick={initGame}
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
          pokemon={player1.pokemon}
          hp={player1.hp}
          isPlayerTurn={isPlayer1Turn && !winner}
          onMoveSelect={handleMove}
        />
        <PokemonCard
          pokemon={player2.pokemon}
          hp={player2.hp}
          isPlayerTurn={!isPlayer1Turn && !winner}
          onMoveSelect={handleMove}
        />
      </div>

      <BattleLog logs={gameLog} />
    </main>
  )
} 