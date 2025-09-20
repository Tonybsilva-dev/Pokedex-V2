import { useCallback, useRef } from 'react';
import { detectBrowserLanguage } from '@/lib/utils';

interface UseTextToSpeechOptions {
  enabled?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  autoDetectLocale?: boolean;
}

export const useTextToSpeech = (options: UseTextToSpeechOptions = {}) => {
  const {
    enabled = true,
    rate = 1.3,  // Mais rápida
    pitch = 1.4, // Mais fina/aguda
    volume = 0.9,
    lang,
    autoDetectLocale = true
  } = options;

  const getDetectedLocale = useCallback(() => {
    if (!autoDetectLocale && lang) return lang;

    if (typeof window !== 'undefined') {
      const detectedLanguage = detectBrowserLanguage();

      const localeMap: Record<string, string> = {
        'pt-BR': 'en-US',
        'en': 'en-US',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'zh-Hans': 'zh-CN',
        'zh-Hant': 'zh-TW',
        'ru': 'en-US'
      };

      return localeMap[detectedLanguage] || 'en-US';
    }

    return lang || 'en-US';
  }, [autoDetectLocale, lang]);

  const detectedLang = getDetectedLocale();

  const processPokemonText = useCallback((text: string) => {
    return text.trim();
  }, []);

  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  if (typeof window !== 'undefined' && !speechSynthesis.current) {
    speechSynthesis.current = window.speechSynthesis;
  }

  const speak = useCallback((text: string | string[]) => {
    if (!enabled || !speechSynthesis.current) {
      return;
    }

    const texts = Array.isArray(text) ? text.filter(t => t && t.trim()) : [text];
    if (texts.length === 0) {
      return;
    }

    if (currentUtterance.current) {
      speechSynthesis.current.cancel();
    }

    const doSpeak = () => {
      const voices = speechSynthesis.current?.getVoices() || [];

      const getVoicePreferences = (lang: string) => {
        const langCode = lang.split('-')[0];

        switch (langCode) {
          case 'pt':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('pt-BR') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('pt-BR') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('pt-BR'))
            };
          case 'en':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('en') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced') ||
                  voice.name.toLowerCase().includes('alex') ||
                  voice.name.toLowerCase().includes('cortana'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('en') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system') ||
                  voice.name.toLowerCase().includes('desktop'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('en'))
            };
          case 'es':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('es') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('es') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('es'))
            };
          case 'fr':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('fr') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('fr') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('fr'))
            };
          case 'de':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('de') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('de') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('de'))
            };
          case 'ja':
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith('ja') &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith('ja') &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith('ja'))
            };
          default:
            return {
              primary: voices.find(voice =>
                voice.lang.startsWith(langCode) &&
                (voice.name.toLowerCase().includes('synthetic') ||
                  voice.name.toLowerCase().includes('robotic') ||
                  voice.name.toLowerCase().includes('neural') ||
                  voice.name.toLowerCase().includes('enhanced'))
              ),
              secondary: voices.find(voice =>
                voice.lang.startsWith(langCode) &&
                (voice.name.toLowerCase().includes('google') ||
                  voice.name.toLowerCase().includes('microsoft') ||
                  voice.name.toLowerCase().includes('amazon') ||
                  voice.name.toLowerCase().includes('system'))
              ),
              fallback: voices.find(voice => voice.lang.startsWith(langCode))
            };
        }
      };

      const preferences = getVoicePreferences(detectedLang);
      const selectedVoice = preferences.primary || preferences.secondary || preferences.fallback;

      let currentIndex = 0;

      const speakNext = () => {
        if (currentIndex >= texts.length) {
          currentUtterance.current = null;
          return;
        }

        const pokemonText = processPokemonText(texts[currentIndex]);
        const utterance = new SpeechSynthesisUtterance(pokemonText);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        utterance.lang = detectedLang;

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        currentUtterance.current = utterance;

        utterance.onend = () => {
          currentIndex++;
          speakNext();
        };

        utterance.onerror = () => {
          currentIndex++;
          speakNext();
        };

        speechSynthesis.current?.speak(utterance);
      };

      speakNext();
    };

    if (speechSynthesis.current?.getVoices().length === 0) {
      speechSynthesis.current.addEventListener('voiceschanged', doSpeak, { once: true });
    } else {
      doSpeak();
    }
  }, [enabled, rate, pitch, volume, detectedLang, processPokemonText]);

  const stop = useCallback(() => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      currentUtterance.current = null;
    }
  }, []);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  return {
    speak,
    stop,
    isSupported,
    isSpeaking: currentUtterance.current !== null
  };
};
