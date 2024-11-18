import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokemonService'
import PokemonCard from '../components/PokemonCard'
import BattleLog from '../components/BattleLog'

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[4]};
`

const WinnerBanner = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.indigo[500]},
    ${({ theme }) => theme.colors.purple[500]}
  );
  color: ${({ theme }) => theme.colors.background.white};
  text-align: center;
`

const WinnerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`

const PlayAgainButton = styled.button`
  background: ${({ theme }) => theme.colors.background.white};
  color: ${({ theme }) => theme.colors.purple[600]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.purple[50]};
  }
`

const TurnIndicator = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[700]};
`

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

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
    <MainContainer>
      {winner && (
        <WinnerBanner>
          <WinnerTitle>{winner} Wins!</WinnerTitle>
          <PlayAgainButton onClick={initGame}>
            Play Again
          </PlayAgainButton>
        </WinnerBanner>
      )}

      {!winner && (
        <TurnIndicator>
          Current Turn: {isPlayer1Turn ? 'Player 1' : 'Player 2'}
        </TurnIndicator>
      )}

      <PokemonGrid>
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
      </PokemonGrid>

      <BattleLog logs={gameLog} />
    </MainContainer>
  )
} 