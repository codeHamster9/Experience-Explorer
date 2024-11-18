import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FilterableList from './components/FilterableList'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import PokemonPage from './pages/pokemonPage'

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <>
                    <SignedIn>
                      <FilterableList />
                    </SignedIn>
                    <SignedOut>
                      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <SignIn redirectUrl="/" />
                      </div>
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/pokemon-battle"
                element={
                  <SignedIn>
                    <PokemonPage />
                  </SignedIn>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </ErrorBoundary>
  )
}

export default App
