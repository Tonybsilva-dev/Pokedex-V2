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

const POKEAPI_LANGUAGE_MAP: Record<string, string> = {
  'pt-BR': 'en',
  'pt': 'en',
  'en-US': 'en',
  'en': 'en',
  'en-GB': 'en',
  'es-ES': 'es',
  'es': 'es',
  'es-MX': 'es',
  'fr-FR': 'fr',
  'fr': 'fr',
  'de-DE': 'de',
  'de': 'de',
  'it-IT': 'it',
  'it': 'it',
  'ja-JP': 'ja',
  'ja': 'ja',
  'ko-KR': 'ko',
  'ko': 'ko',
  'zh-CN': 'zh-Hans',
  'zh': 'zh-Hans',
  'zh-TW': 'zh-Hant',
  'ru-RU': 'en',
  'ru': 'en'
};

export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language || navigator.languages?.[0] || 'en-US';

  if (POKEAPI_LANGUAGE_MAP[browserLang]) {
    return POKEAPI_LANGUAGE_MAP[browserLang];
  }

  const langCode = browserLang.split('-')[0];
  if (POKEAPI_LANGUAGE_MAP[langCode]) {
    return POKEAPI_LANGUAGE_MAP[langCode];
  }

  return 'en';
}

export function getLanguageDisplayName(langCode: string): string {
  const displayNames: Record<string, string> = {
    'pt-BR': 'Português (Brasil)',
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'ja': '日本語',
    'ko': '한국어',
    'zh-Hans': '中文 (简体)',
    'zh-Hant': '中文 (繁體)',
    'ru': 'Русский'
  };

  return displayNames[langCode] || 'English';
}
