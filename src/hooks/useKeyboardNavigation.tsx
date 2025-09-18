import { useEffect, useState } from 'react';
import { Pokemon } from '@/types/pokemon';

interface UseKeyboardNavigationProps {
  pokemonList: Pokemon[];
  onPokemonChange: (pokemon: Pokemon) => void;
}

export const useKeyboardNavigation = ({ pokemonList, onPokemonChange }: UseKeyboardNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (pokemonList.length > 0) {
      onPokemonChange(pokemonList[currentIndex]);
    }
  }, [currentIndex, pokemonList, onPokemonChange]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (pokemonList.length === 0) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(prev => prev > 0 ? prev - 1 : pokemonList.length - 1);
          setTimeout(() => setIsNavigating(false), 200);
          break;

        case 'ArrowDown':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(prev => prev < pokemonList.length - 1 ? prev + 1 : 0);
          setTimeout(() => setIsNavigating(false), 200);
          break;

        case 'ArrowLeft':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(prev => {
            const newIndex = prev - 10;
            return newIndex >= 0 ? newIndex : 0;
          });
          setTimeout(() => setIsNavigating(false), 200);
          break;

        case 'ArrowRight':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(prev => {
            const newIndex = prev + 10;
            return newIndex < pokemonList.length ? newIndex : pokemonList.length - 1;
          });
          setTimeout(() => setIsNavigating(false), 200);
          break;

        case 'Home':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(0);
          setTimeout(() => setIsNavigating(false), 200);
          break;

        case 'End':
          event.preventDefault();
          setIsNavigating(true);
          setCurrentIndex(pokemonList.length - 1);
          setTimeout(() => setIsNavigating(false), 200);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pokemonList.length]);

  const goToPokemon = (index: number) => {
    if (index >= 0 && index < pokemonList.length) {
      setCurrentIndex(index);
    }
  };

  const nextPokemon = () => {
    setCurrentIndex(prev => prev < pokemonList.length - 1 ? prev + 1 : 0);
  };

  const previousPokemon = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : pokemonList.length - 1);
  };

  return {
    currentIndex,
    currentPokemon: pokemonList[currentIndex],
    isNavigating,
    goToPokemon,
    nextPokemon,
    previousPokemon,
    totalPokemon: pokemonList.length
  };
};