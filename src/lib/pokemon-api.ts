import axios from 'axios';
import { Pokemon, PokemonListResponse, PokemonListItem } from '@/types/pokemon';
import { getPokemonIdFromUrl, getPokemonImageUrl } from './utils';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonAPI {
  private static instance: PokemonAPI;
  private cache = new Map<string, any>();

  static getInstance(): PokemonAPI {
    if (!PokemonAPI.instance) {
      PokemonAPI.instance = new PokemonAPI();
    }
    return PokemonAPI.instance;
  }

  private async fetchWithCache<T>(url: string): Promise<T> {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const response = await axios.get<T>(url);
      this.cache.set(url, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  async getPokemonList(limit = 151, offset = 0): Promise<PokemonListResponse> {
    const url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    return this.fetchWithCache<PokemonListResponse>(url);
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const url = `${POKEAPI_BASE_URL}/pokemon/${id}`;
    return this.fetchWithCache<Pokemon>(url);
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    const url = `${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`;
    return this.fetchWithCache<Pokemon>(url);
  }

  async getPokemonByUrl(url: string): Promise<Pokemon> {
    return this.fetchWithCache<Pokemon>(url);
  }

  async searchPokemon(query: string): Promise<PokemonListItem[]> {
    const allPokemon = await this.getPokemonList(1000, 0);
    return allPokemon.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getPokemonTypes(): Promise<{ name: string; url: string }[]> {
    const url = `${POKEAPI_BASE_URL}/type`;
    const response = await this.fetchWithCache<{ results: { name: string; url: string }[] }>(url);
    return response.results;
  }

  async getPokemonByType(type: string): Promise<PokemonListItem[]> {
    const url = `${POKEAPI_BASE_URL}/type/${type}`;
    const response = await this.fetchWithCache<{ pokemon: { pokemon: PokemonListItem }[] }>(url);
    return response.pokemon.map(item => item.pokemon);
  }

  async getPokemonDetails(pokemonList: PokemonListItem[]): Promise<Pokemon[]> {
    const promises = pokemonList.map(async (pokemonItem) => {
      try {
        const pokemon = await this.getPokemonByUrl(pokemonItem.url);
        return {
          ...pokemon,
          imageUrl: getPokemonImageUrl(pokemon.id),
        };
      } catch (error) {
        console.error(`Error fetching details for ${pokemonItem.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  }
}

export const pokemonAPI = PokemonAPI.getInstance();
