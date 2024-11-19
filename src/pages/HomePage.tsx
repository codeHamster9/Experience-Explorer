import React from 'react'
import { items } from '../data/items'
import SearchSection from '../components/SearchSection'
import { useRenderCount } from '@uidotdev/usehooks'

export default function HomePage() {
  const renderCount = useRenderCount()
  console.info('renderCount home:', renderCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Discover Experiences
          </h1>
          <SearchSection items={items} />
        </div>
      </div>
    </div>
  )
}
