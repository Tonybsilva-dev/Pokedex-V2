import { NextResponse } from 'next/server';
import { pokemonAPI } from '@/lib/pokemon-api';

export async function GET() {
  try {
    const types = await pokemonAPI.getPokemonTypes();
    
    return NextResponse.json({
      success: true,
      data: types
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
