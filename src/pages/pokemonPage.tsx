import { useState, useEffect } from 'react'
import { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
  const [player1Pokemon, setPlayer1Pokemon] = useState<Pokemon | null>(null)
  const [player2Pokemon, setPlayer2Pokemon] = useState<Pokemon | null>(null)
  const [player1HP, setPlayer1HP] = useState(0)
  const [player2HP, setPlayer2HP] = useState(0)
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true)
  const [gameLog, setGameLog] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)

  const initGame = async () => {
    const p1 = await getPokemon(Math.floor(Math.random() * 151) + 1)
    const p2 = await getPokemon(Math.floor(Math.random() * 151) + 1)
    
    setPlayer1Pokemon(p1)
    setPlayer2Pokemon(p2)
    setPlayer1HP(p1.stats[0].base_stat)
    setPlayer2HP(p2.stats[0].base_stat)
    setIsPlayer1Turn(true)
    setGameLog([])
    setWinner(null)
  }

  useEffect(() => {
    initGame()
  }, [])

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

  if (!player1Pokemon || !player2Pokemon) return <div>Loading...</div>

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

      {/* Battle Log */}
      <div className="mt-8 border p-4 rounded-lg bg-white shadow-inner h-48 overflow-y-auto">
        <h3 className="font-semibold mb-2 text-gray-700">Battle Log</h3>
        {gameLog.map((log, i) => (
          <p 
            key={i} 
            className={`py-1 ${
              log.includes('wins') ? 'text-green-600 font-semibold' : 'text-gray-600'
            }`}
          >
            {log}
          </p>
        ))}
      </div>
    </main>
  )
} 