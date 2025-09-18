import { Pokemon } from '@/types/pokemon';
import { pokemonAPI } from './pokemon-api';

export class PokemonService {
  private static instance: PokemonService;

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const pokemon = await pokemonAPI.getPokemonById(id);
    return await this.transformPokemonData(pokemon);
  }

  async getPokemonList(limit = 1000, offset = 0): Promise<Pokemon[]> {
    try {
      const response = await pokemonAPI.getPokemonList(limit, offset);

      const pokemonDetails = await pokemonAPI.getPokemonDetails(response.results);

      return await Promise.all(pokemonDetails.map(pokemon => this.transformPokemonData(pokemon)));
    } catch (error) {
      console.error('Error loading pokemon list:', error);
      throw error;
    }
  }

  async getAllPokemon(): Promise<Pokemon[]> {
    try {
      console.log('Carregando todos os Pokémon...');
      const response = await pokemonAPI.getPokemonList(1010, 0);
      console.log('Lista de Pokémon obtida:', response.results.length);

      const pokemonDetails = await pokemonAPI.getPokemonDetails(response.results);
      console.log('Detalhes dos Pokémon obtidos:', pokemonDetails.length);

      return await Promise.all(pokemonDetails.map(pokemon => this.transformPokemonData(pokemon)));
    } catch (error) {
      console.error('Error loading all pokemon:', error);
      throw error;
    }
  }

  async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      const searchResults = await pokemonAPI.searchPokemon(query);
      const pokemonDetails = await pokemonAPI.getPokemonDetails(searchResults);

      return await Promise.all(pokemonDetails.map(pokemon => this.transformPokemonData(pokemon)));
    } catch (error) {
      console.error('Error searching pokemon:', error);
      throw error;
    }
  }

  private async transformPokemonData(data: any): Promise<Pokemon> {
    const description = await this.getPokemonDescription(data.id);

    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
      imageUrl: data.sprites.other['official-artwork']?.front_default ||
        data.sprites.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      types: data.types,
      stats: data.stats,
      abilities: data.abilities,
      sprites: data.sprites,
      description: description,
    };
  }

  private async getPokemonDescription(id: number): Promise<string> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
      const speciesData = await response.json();

      const englishDescription = speciesData.flavor_text_entries?.find(
        (entry: any) => entry.language.name === 'en'
      );

      if (englishDescription) {
        return englishDescription.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
      }

      return "A mysterious Pokémon with unique characteristics and abilities.";
    } catch (error) {
      console.error(`Error fetching description for Pokémon ${id}:`, error);
      return "A mysterious Pokémon with unique characteristics and abilities.";
    }
  }
}

export const pokemonService = PokemonService.getInstance();
