import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import PokemonPage from './pages/pokemonPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext'

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <>
                        <SignedIn>
                          <HomePage />
                        </SignedIn>
                        <SignedOut>
                          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
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
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
