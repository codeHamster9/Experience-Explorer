import { useState } from 'react'
import { usePokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'
import BattleLog from '../components/BattleLog'

export default function Home() {
  const [pokemonIds, setPokemonIds] = useState({
    player1: Math.floor(Math.random() * 151) + 1,
    player2: Math.floor(Math.random() * 151) + 1
  })
  const [player1HP, setPlayer1HP] = useState(0)
  const [player2HP, setPlayer2HP] = useState(0)
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true)
  const [gameLog, setGameLog] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)

  // Fetch Pokemon data using React Query
  const { data: player1Pokemon, isLoading: isLoading1 } = usePokemon(pokemonIds.player1)
  const { data: player2Pokemon, isLoading: isLoading2 } = usePokemon(pokemonIds.player2)

  // Set initial HP when Pokemon data is loaded
  if (player1Pokemon && player2Pokemon && player1HP === 0 && player2HP === 0) {
    setPlayer1HP(player1Pokemon.stats[0].base_stat)
    setPlayer2HP(player2Pokemon.stats[0].base_stat)
  }

  const initGame = () => {
    const newPlayer1Id = Math.floor(Math.random() * 151) + 1
    const newPlayer2Id = Math.floor(Math.random() * 151) + 1
    
    setPokemonIds({
      player1: newPlayer1Id,
      player2: newPlayer2Id
    })
    setPlayer1HP(0) // Will be set when new Pokemon data loads
    setPlayer2HP(0)
    setIsPlayer1Turn(true)
    setGameLog([])
    setWinner(null)
  }

  const handleMove = (moveName: string) => {
    if (winner) return // Prevent moves after game is over

    const damage = Math.floor(Math.random() * 50) + 10
    const currentPlayer = isPlayer1Turn ? 'Player 1' : 'Player 2'
    const targetHP = isPlayer1Turn ? setPlayer2HP : setPlayer1HP
    const currentHP = isPlayer1Turn ? player2HP : player1HP

    const newHP = Math.max(0, currentHP - damage)
    targetHP(newHP)
    setGameLog(prev => [...prev, `${currentPlayer} used ${moveName} for ${damage} damage!`])

    // Check for winner
    if (newHP <= 0) {
      setWinner(currentPlayer)
      setGameLog(prev => [...prev, `${currentPlayer} wins the battle!`])
    } else {
      setIsPlayer1Turn(!isPlayer1Turn)
    }
  }

  if (isLoading1 || isLoading2 || !player1Pokemon || !player2Pokemon) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  return (
    <main className="container mx-auto p-4">
      {/* Battle Status Banner */}
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

      {/* Current Turn Indicator */}
      {!winner && (
        <div className="mb-8 text-center text-xl font-semibold text-gray-700">
          Current Turn: {isPlayer1Turn ? 'Player 1' : 'Player 2'}
        </div>
      )}

      {/* Pokemon Cards */}
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

      {/* Battle Log Component */}
      <BattleLog logs={gameLog} />
    </main>
  )
} 