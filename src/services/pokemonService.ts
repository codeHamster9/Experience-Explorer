import axios from 'axios'
import { Pokemon, Move } from '../types/pokemon'

const API_BASE = 'https://pokeapi.co/api/v2'

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await axios.get(`${API_BASE}/pokemon/${id}`)
  return response.data
}

export const getMove = async (url: string): Promise<Move> => {
  const response = await axios.get(url)
  return response.data
} 