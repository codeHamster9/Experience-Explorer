import styled from 'styled-components'
import { Pokemon } from '../types/pokemon'

interface Props {
  pokemon: Pokemon;
  hp: number;
  isPlayerTurn: boolean;
  onMoveSelect: (moveName: string) => void;
}

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
`

const PokemonImage = styled.img`
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
`

const PokemonName = styled.h2`
  font-size: 1.25rem;
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  color: #1f2937;
`

const HealthBarContainer = styled.div`
  margin-top: 0.5rem;
`

const HealthBarBackground = styled.div`
  background-color: #e5e7eb;
  height: 1rem;
  border-radius: 9999px;
  overflow: hidden;
`

interface HealthBarProps {
  percentage: number;
  isLowHealth: boolean;
}

const HealthBar = styled.div<HealthBarProps>`
  height: 100%;
  border-radius: 9999px;
  transition: all 300ms;
  width: ${props => props.percentage}%;
  background-color: ${props => props.isLowHealth ? '#ef4444' : '#22c55e'};
`

const HealthText = styled.p`
  text-align: center;
  margin-top: 0.25rem;
`

const MovesGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`

const MoveButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
  transition: background-color 150ms;

  &:hover {
    background-color: #2563eb;
  }
`

export default function PokemonCard({ pokemon, hp, isPlayerTurn, onMoveSelect }: Props) {
  const healthPercentage = (hp / pokemon.stats[0].base_stat) * 100
  const isLowHealth = hp < pokemon.stats[0].base_stat * 0.2

  return (
    <Card>
      <PokemonImage 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
      />
      <PokemonName>{pokemon.name}</PokemonName>
      <HealthBarContainer>
        <HealthBarBackground>
          <HealthBar 
            percentage={healthPercentage}
            isLowHealth={isLowHealth}
          />
        </HealthBarBackground>
        <HealthText>
          HP: {hp}/{pokemon.stats[0].base_stat}
        </HealthText>
      </HealthBarContainer>
      {isPlayerTurn && (
        <MovesGrid>
          {pokemon.moves.slice(0, 4).map((move) => (
            <MoveButton
              key={move.move.name}
              onClick={() => onMoveSelect(move.move.name)}
            >
              {move.move.name}
            </MoveButton>
          ))}
        </MovesGrid>
      )}
    </Card>
  )
} 