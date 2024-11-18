import React from 'react'
import styled from 'styled-components'
import { Filter } from 'lucide-react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onChange: (category: string) => void
}

const FilterContainer = styled.div`
  position: relative;
`

const FilterIcon = styled(Filter)`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[400]};
  height: 1.25rem;
  width: 1.25rem;
`

const Select = styled.select`
  padding-left: ${({ theme }) => theme.spacing[10]};
  padding-right: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  appearance: none;
  background-color: ${({ theme }) => theme.colors.background.white};
  cursor: pointer;
  outline: none;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    ring: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`

export default function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <FilterContainer>
      <FilterIcon data-testid="filter" />
      <Select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </FilterContainer>
  )
}
