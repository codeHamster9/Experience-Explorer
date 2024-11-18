import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import FilterableList from './components/FilterableList'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import PokemonPage from './pages/pokemonPage'
import { theme } from './theme/theme'

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const SignInContainer = styled.div`
  min-height: ${({ theme }) => theme.layout.minHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.background.gradient.from},
    ${({ theme }) => theme.colors.background.gradient.to}
  );
`

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
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
                        <SignInContainer>
                          <SignIn redirectUrl="/" />
                        </SignInContainer>
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
  )
}

export default App
