import { useEffect, useRef } from 'react'

interface BattleLogProps {
  logs: string[]
}

export default function BattleLog({ logs }: BattleLogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div 
      ref={logContainerRef}
      className="mt-8 border p-4 rounded-lg bg-white shadow-inner h-48 overflow-y-auto scroll-smooth"
    >
      <h3 className="font-semibold mb-2 text-gray-700">Battle Log</h3>
      {logs.map((log, i) => (
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
  )
} 