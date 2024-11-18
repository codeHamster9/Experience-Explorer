import { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface BattleLogProps {
  logs: string[]
}

const LogContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.white};
  box-shadow: ${({ theme }) => theme.shadows.inner};
  height: 12rem;
  overflow-y: auto;
  scroll-behavior: smooth;
`

const LogTitle = styled.h3`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[700]};
`

const LogEntry = styled.p<{ isWinMessage: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[1]} 0`};
  color: ${({ theme, isWinMessage }) =>
    isWinMessage ? theme.colors.text.success : theme.colors.gray[600]};
  font-weight: ${({ isWinMessage }) => (isWinMessage ? 600 : 400)};
`

export default function BattleLog({ logs }: BattleLogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <LogContainer ref={logContainerRef}>
      <LogTitle>Battle Log</LogTitle>
      {logs.map((log, i) => (
        <LogEntry key={i} isWinMessage={log.includes('wins')}>
          {log}
        </LogEntry>
      ))}
    </LogContainer>
  )
} 