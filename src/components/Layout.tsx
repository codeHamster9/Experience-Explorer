import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'

const LayoutContainer = styled.div`
  min-height: ${({ theme }) => theme.layout.minHeight};
  background-color: ${({ theme }) => theme.colors.gray[50]};
`

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
`

export default function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  )
}