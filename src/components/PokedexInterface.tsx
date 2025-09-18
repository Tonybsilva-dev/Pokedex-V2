'use client';

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Pokemon, getTypeColor } from "@/types/pokemon";
import { pokemonService } from "@/lib/pokemon-service";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AudioController } from "./AudioController";
import { PokedexControls } from "./PokedexControls";
import { PokedexScreen } from "./PokedexScreen";

const PokedexInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setLoadingProgress(10);
        console.log('Iniciando carregamento dos Pokémon...');

        setLoadingProgress(30);
        const pokemon = await pokemonService.getAllPokemon();

        setLoadingProgress(80);
        console.log('Pokémon carregados:', pokemon.length);
        console.log('Primeiros 10 Pokémon:', pokemon.slice(0, 10).map(p => `${p.id} - ${p.name}`));
        console.log('Pikachu encontrado:', pokemon.find(p => p.name.toLowerCase() === 'pikachu'));
        setPokemonList(pokemon);

        setLoadingProgress(100);
        setIsLoaded(true);
        console.log('Pokédex carregada com sucesso!');
      } catch (err) {
        console.error('Erro ao carregar Pokémon:', err);
        setError('Erro ao carregar Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonList;
    const searchLower = searchTerm.toLowerCase().trim();

    const filtered = pokemonList.filter(pokemon => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchLower);

      // Busca exata por ID (remove zeros à esquerda)
      const searchId = parseInt(searchLower.replace(/^0+/, '')) || 0;
      const idExactMatch = pokemon.id === searchId;
      const idPartialMatch = pokemon.id.toString().includes(searchLower);

      const typeMatch = pokemon.types.some(type => type.type.name.toLowerCase().includes(searchLower));

      return nameMatch || idExactMatch || idPartialMatch || typeMatch;
    });

    console.log(`Buscando por "${searchTerm}": ${filtered.length} resultados encontrados`);
    console.log('Pokémon encontrados:', filtered.map(p => `${p.id} - ${p.name}`));

    if (searchLower === 'pikachu' || searchLower === '025' || searchLower === '25') {
      console.log('Pikachu encontrado:', pokemonList.find(p => p.id === 25));
    }

    return filtered;
  }, [pokemonList, searchTerm]);

  const {
    currentIndex,
    isNavigating,
    nextPokemon,
    previousPokemon,
    goToPokemon,
    totalPokemon
  } = useKeyboardNavigation({
    pokemonList: filteredPokemon,
    onPokemonChange: setCurrentPokemon
  });

  const handleJumpLeft = () => {
    const newIndex = Math.max(0, currentIndex - 10);
    goToPokemon(newIndex);
  };

  const handleJumpRight = () => {
    const newIndex = Math.min(totalPokemon - 1, currentIndex + 10);
    goToPokemon(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(var(--background))" }}>
        <div className="text-center">
          <div className="text-green-400 font-mono text-lg mb-2">CARREGANDO POKÉDEX...</div>
          <div className="w-64 bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-green-400 font-mono text-sm mt-2">{loadingProgress}%</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(var(--background))" }}>
        <div className="text-center">
          <div className="text-red-400 font-mono text-lg mb-4">ERRO AO CARREGAR POKÉDEX</div>
          <div className="text-gray-400 font-mono text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "hsl(var(--background))" }}>
      <AudioController isLoaded={isLoaded} />
      <section
        className="w-full max-w-6xl h-[600px] rounded-3xl relative overflow-hidden"
        style={{
          background: "var(--pokedex-red-gradient)",
          boxShadow: "var(--pokedex-shadow)"
        }}
        aria-label="Pokédex Interface"
      >

        <div className="absolute left-1/2 top-0 w-8 h-full bg-red-800 transform -translate-x-1/2 z-10" aria-hidden="true"></div>

        <aside className="absolute left-0 top-0 w-1/2 h-full p-6 pr-10" aria-label="Pokémon Display and Controls">

          <header className="flex items-center justify-between mb-4">
            <div
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--pokedex-blue))" }}
              aria-label="Pokédex Logo"
            >
              <div className="w-8 h-8 rounded-full bg-white opacity-80"></div>
            </div>

            <div className="flex gap-2" aria-label="Status Indicators">
              <div className="w-3 h-3 bg-red-600 rounded-full" aria-label="Power Indicator"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full" aria-label="Battery Indicator"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full" aria-label="Signal Indicator"></div>
            </div>
          </header>


          <section className="mb-6" aria-label="Pokémon Display">
            <PokedexScreen pokemon={currentPokemon} isNavigating={isNavigating} />
          </section>


          <div className="relative mb-4">
            <label htmlFor="pokemon-search" className="sr-only">Search Pokémon</label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" aria-hidden="true" />
            <Input
              id="pokemon-search"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 border-2 border-gray-400 text-black"
              aria-label="Search for Pokémon by name, ID, or type"
            />
          </div>

          <nav aria-label="Pokémon Navigation Controls">
            <PokedexControls
              onUp={previousPokemon}
              onDown={nextPokemon}
              onLeft={handleJumpLeft}
              onRight={handleJumpRight}
              currentIndex={currentIndex}
              totalPokemon={totalPokemon}
            />
          </nav>
        </aside>

        <aside className="absolute right-0 top-0 w-1/2 h-full p-6 pl-10" aria-label="Pokémon Information Panel">
          <header className="h-12 bg-gray-900 rounded-t-lg border-4 border-gray-600 mb-0 flex items-center justify-center">
            <h2 className="text-green-400 font-mono text-sm font-bold">POKÉMON DATA</h2>
          </header>

          <main
            className="h-80 bg-gray-900 rounded-b-lg border-4 border-gray-600 border-t-0 p-4 overflow-y-auto"
            role="region"
            aria-label="Pokémon Details"
          >
            {currentPokemon ? (
              <article className="text-green-400 font-mono text-sm space-y-4">
                <header className="border-b border-green-400/30 pb-2">
                  <h3 className="text-lg font-bold text-white">
                    {currentPokemon.name.toUpperCase()}
                  </h3>
                  <p className="text-xs opacity-70">
                    NO. {currentPokemon.id.toString().padStart(3, '0')}
                  </p>
                </header>


                <section>
                  <h4 className="text-xs opacity-70 mb-1">TYPE</h4>
                  <div className="flex gap-1" role="list" aria-label="Pokémon Types">
                    {currentPokemon.types.map((type) => (
                      <Badge
                        key={type?.type?.name || 'unknown'}
                        className="text-xs"
                        style={{
                          backgroundColor: `hsl(var(--${getTypeColor(type?.type?.name || 'normal')}))`,
                          color: 'white'
                        }}
                        role="listitem"
                      >
                        {type?.type?.name?.toUpperCase() || 'UNKNOWN'}
                      </Badge>
                    ))}
                  </div>
                </section>


                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs opacity-70">HEIGHT</h4>
                    <p>{(currentPokemon.height / 10).toFixed(1)}M</p>
                  </div>
                  <div>
                    <h4 className="text-xs opacity-70">WEIGHT</h4>
                    <p>{(currentPokemon.weight / 10).toFixed(1)}KG</p>
                  </div>
                </section>


                <section>
                  <h4 className="text-xs opacity-70 mb-2">BASE STATS</h4>
                  <div className="space-y-2" role="list" aria-label="Pokémon Base Stats">
                    {currentPokemon.stats.map((stat) => (
                      <div key={stat.stat.name} role="listitem">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{stat.stat.name.toUpperCase()}</span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1" role="progressbar" aria-valuenow={stat.base_stat} aria-valuemin={0} aria-valuemax={150} aria-label={`${stat.stat.name}: ${stat.base_stat}`}>
                          <div
                            className="h-1 rounded-full transition-all duration-300 bg-green-500"
                            style={{
                              width: `${(stat.base_stat / 150) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>


                <section>
                  <h4 className="text-xs opacity-70 mb-1">DESCRIPTION</h4>
                  <p className="text-xs leading-relaxed text-gray-300">
                    {currentPokemon.description}
                  </p>
                </section>
              </article>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-green-400 font-mono text-sm">
                  NO DATA AVAILABLE
                </p>
              </div>
            )}
          </main>


          <footer className="mt-4 space-y-2" aria-label="Pokédex Controls">
            <div className="grid grid-cols-4 gap-2" role="list" aria-label="Control Buttons">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="h-8 rounded border-2 border-gray-600 bg-blue-400"
                  role="listitem"
                  aria-label={`Control Button ${i}`}
                ></div>
              ))}
            </div>

            <div className="flex gap-2 ">
              <div
                className="flex-1 h-6 rounded border-2 border-gray-600 bg-white"
                aria-label="Input Field"
              ></div>
              <div
                className="w-12 h-6 rounded-full border-2 border-gray-600 bg-yellow-500"
                aria-label="Action Button"
              ></div>
            </div>
          </footer>


          <div className="mt-4 text-xs text-white/70 font-mono">
            <p>↑↓ NEXT/PREV • ←→ JUMP • HOME/END</p>
          </div>
        </aside>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-red-900 rounded-lg z-20" aria-hidden="true"></div>
      </section>
    </main>
  );
};

export default PokedexInterface;
