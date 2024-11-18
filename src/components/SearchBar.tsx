import React from 'react'
import { Search } from 'lucide-react'
import styled from 'styled-components'

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  height: 20px;
  width: 20px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #3B82F6;
  }
`

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <SearchWrapper>
      <SearchIcon data-testid="search" />
      <SearchInput
        type="text"
        placeholder="Search experiences..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchWrapper>
  )
}