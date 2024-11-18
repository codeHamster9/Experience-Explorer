import { Link, Outlet } from 'react-router-dom'
import { UserButton, SignedIn } from '@clerk/clerk-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-gray-800">
                MyApp
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/pokemon-battle" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pokemon Battle
                </Link>
              </nav>
            </div>

            {/* User Button */}
            <div className="flex items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}