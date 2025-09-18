import { NextRequest, NextResponse } from 'next/server';
import { pokemonAPI } from '@/lib/pokemon-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do Pokémon é obrigatório' },
        { status: 400 }
      );
    }

    const pokemon = await pokemonAPI.getPokemonById(parseInt(id));

    return NextResponse.json({
      success: true,
      data: pokemon
    });
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pokémon não encontrado'
        },
        { status: 404 }
      );
    }

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
