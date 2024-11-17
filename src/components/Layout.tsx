import { UserButton } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Experience Explorer</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}