import React from 'react'
import styled from 'styled-components'
import { Item } from '../types'
import { highlightText } from '../utils/highlightText'

interface ItemCardProps {
  item: Item;
  searchQuery?: string;
}

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const Image = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.default};
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`

const Category = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
`

export default function ItemCard({ item, searchQuery = '' }: ItemCardProps) {
  return (
    <Card>
      <Image src={item.imageUrl} alt={item.title} />
      <Content>
        <Title
          dangerouslySetInnerHTML={{ 
            __html: highlightText(item.title, searchQuery) 
          }}
        />
        <Category>{item.category}</Category>
        <Description
          dangerouslySetInnerHTML={{ 
            __html: highlightText(item.description, searchQuery) 
          }}
        />
      </Content>
    </Card>
  )
}