'use client';

import { Pokemon, getTypeColor } from "@/types/pokemon";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PokedexScreenProps {
  pokemon: Pokemon | null;
  isNavigating: boolean;
}

export const PokedexScreen = ({ pokemon, isNavigating }: PokedexScreenProps) => {
  if (!pokemon) {
    return (
      <div className="w-full h-64 bg-pokedex-screen rounded-lg border-4 border-gray-800 relative overflow-hidden" role="img" aria-label="Pokémon Display - No Data">
        <div className="absolute inset-2 bg-black rounded flex items-center justify-center">
          <p className="text-green-400 font-mono text-sm">NO DATA</p>
        </div>
        <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-label="Status Indicator"></div>
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);

  return (
    <article className="relative" role="img" aria-label={`Pokémon Display - ${pokemon.name}`}>
      <div
        className="w-full h-64 rounded-lg border-4 border-gray-800 relative overflow-hidden transition-all duration-300"
        style={{
          background: "var(--pokedex-screen-gradient)",
          boxShadow: "var(--pokedex-inset)"
        }}
      >

        <div className="absolute inset-2 bg-black rounded overflow-hidden">

          <div className="h-full flex flex-col relative bg-gray-100">

            <div className="absolute top-2 left-2 flex gap-1 z-10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>


            <div className="flex-1 flex items-center justify-center relative p-4">
              {isNavigating && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20">
                  <div className="text-gray-800 font-mono text-xs">LOADING...</div>
                </div>
              )}

              <div
                className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: `hsl(var(--${primaryColor}) / 0.1)`,
                  border: `2px solid hsl(var(--${primaryColor}) / 0.3)`,
                  transform: isNavigating ? 'scale(0.9)' : 'scale(1)'
                }}
              >
                <Image
                  width={96}
                  height={96}
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="object-contain pixel-art"
                  style={{
                    imageRendering: 'pixelated',
                    filter: isNavigating ? 'brightness(0.7)' : 'brightness(1)'
                  }}
                />
              </div>
            </div>


            <div className="h-16 bg-gray-800 text-green-400 p-2 font-mono text-xs">
              <div className="flex justify-between items-center h-full">
                <div>
                  <div className="text-white font-bold">#{pokemon.id.toString().padStart(3, '0')}</div>
                  <div className="uppercase">{pokemon.name}</div>
                </div>
                <div className="flex gap-1">
                  {pokemon.types.map((type) => (
                    <Badge
                      key={type?.type?.name || 'unknown'}
                      className="text-xs h-4 px-1"
                      style={{
                        backgroundColor: `hsl(var(--${getTypeColor(type?.type?.name || 'normal')}))`,
                        color: 'white',
                        fontSize: '8px'
                      }}
                    >
                      {type?.type?.name?.substring(0, 3).toUpperCase() || 'UNK'}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="absolute inset-2 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded pointer-events-none"></div>
      </div>


      <div className="flex justify-between mt-2">
        <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </article>
  );
};
