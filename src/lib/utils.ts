import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

export function getPokemonIdFromUrl(url: string): number {
  const urlParts = url.split('/');
  return parseInt(urlParts[urlParts.length - 2]);
}

export function getPokemonImageUrl(id: number, shiny = false): string {
  const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  const variant = shiny ? 'shiny' : 'other/official-artwork';
  return `${baseUrl}/${variant}/${id}.png`;
}


export function getGenerationFromId(id: number): number {
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
