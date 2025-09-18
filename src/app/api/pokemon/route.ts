import { NextRequest, NextResponse } from 'next/server';
import { pokemonAPI } from '@/lib/pokemon-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '2000');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const generation = searchParams.get('generation');
    const all = searchParams.get('all') === 'true';

    let pokemonList;

    if (search) {
      pokemonList = await pokemonAPI.searchPokemon(search);
    } else if (type) {
      pokemonList = await pokemonAPI.getPokemonByType(type);
    } else if (all) {
      const response = await pokemonAPI.getPokemonList(2000, 0);
      pokemonList = response.results;
    } else {
      const response = await pokemonAPI.getPokemonList(limit, offset);
      pokemonList = response.results;
    }

    if (generation) {
      const genNum = parseInt(generation);
      pokemonList = pokemonList.filter(pokemon => {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        const pokemonId = parseInt(id);
        return getGenerationFromId(pokemonId) === genNum;
      });
    }

    const pokemonDetails = await pokemonAPI.getPokemonDetails(pokemonList);

    return NextResponse.json({
      success: true,
      data: pokemonDetails,
      count: pokemonDetails.length,
      pagination: {
        limit,
        offset,
        hasMore: pokemonList.length === limit
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

function getGenerationFromId(id: number): number {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
}
