import { useAtom } from 'jotai'
import { usePokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'
import BattleLog from '../components/BattleLog'
import {
  handleMoveAtom,
  updatePokemonAtom,
  getRandomPokemonId
} from '../store/battleAtoms'
import { useMemo } from 'react'
import { PlayersBanner } from '../components/PlayersBanner'

export default function PokemonPage() {
  // Read-only atoms

  const [, handleMove] = useAtom(handleMoveAtom)
  const [, updatePokemon] = useAtom(updatePokemonAtom)

  const player1Id = useMemo(() => getRandomPokemonId(), [])
  const player2Id =  useMemo(() => getRandomPokemonId(), [])

  // Fetch Pokemon data using React Query
  const { data: pokemon1Data, isLoading: isLoading1 } = usePokemon(player1Id)
  const { data: pokemon2Data, isLoading: isLoading2 } = usePokemon(player2Id)

  // Update Pokemon data when loaded
  if (pokemon1Data) {
    updatePokemon({  pokemon: pokemon1Data })
  }
  if (pokemon2Data) {
    updatePokemon({ pokemon: pokemon2Data })
  }

  if (isLoading1 || isLoading2) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  return (
    <main className="container mx-auto p-4">
      <PlayersBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PokemonCard
          pokemonId={player1Id}
    
          onMoveSelect={(moveName) => handleMove(moveName, player2Id)}
        />
        <PokemonCard
          pokemonId={player2Id}
          onMoveSelect={(moveName) => handleMove(moveName, player1Id)}
        />
      </div>

      <BattleLog  />
    </main>
  )
} 