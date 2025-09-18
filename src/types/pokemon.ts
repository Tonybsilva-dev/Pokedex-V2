export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  description: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonFilter {
  type?: string;
  search?: string;
  generation?: number;
}

export const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    normal: '--pokedex-normal',
    fire: '--pokedex-fire',
    water: '--pokedex-water',
    electric: '--pokedex-electric',
    grass: '--pokedex-grass',
    ice: '--pokedex-ice',
    fighting: '--pokedex-fighting',
    poison: '--pokedex-poison',
    ground: '--pokedex-ground',
    flying: '--pokedex-flying',
    psychic: '--pokedex-psychic',
    bug: '--pokedex-bug',
    rock: '--pokedex-rock',
    ghost: '--pokedex-ghost',
    dragon: '--pokedex-dragon',
    dark: '--pokedex-dark',
    steel: '--pokedex-steel',
    fairy: '--pokedex-fairy'
  };

  return typeColors[type.toLowerCase()] || '--pokedex-normal';
};
