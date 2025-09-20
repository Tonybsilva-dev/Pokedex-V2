'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Mic, MicOff, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectBrowserLanguage, getLanguageDisplayName } from '@/lib/utils';

interface AudioControllerProps {
  isLoaded: boolean;
  isNarrationEnabled?: boolean;
  onNarrationToggle?: (enabled: boolean) => void;
}

export const AudioController = ({ isLoaded, isNarrationEnabled = true, onNarrationToggle }: AudioControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const detectedLanguage = detectBrowserLanguage();
  const languageDisplayName = getLanguageDisplayName(detectedLanguage);

  const actualLanguage = detectedLanguage === 'pt-BR' ? 'en' : detectedLanguage;
  const actualLanguageDisplayName = getLanguageDisplayName(actualLanguage);

  useEffect(() => {
    if (isLoaded && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [isLoaded, volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <aside className="w-full max-w-6xl mx-auto mb-4 px-4 flex justify-end" aria-label="Audio Controls">
      <div
        className="rounded-lg p-3 border-2 border-gray-600 flex items-center gap-3"
        style={{
          background: "var(--pokedex-red-gradient)",
          boxShadow: "var(--pokedex-shadow)"
        }}
        role="group"
        aria-label="Audio Control Panel"
      >

        <audio
          ref={audioRef}
          loop
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/pokemon-theme.mp3" type="audio/mpeg" />
        </audio>


        <div className="text-white font-mono text-xs font-bold">
          {isPlaying ? 'AUDIO' : 'CLICK TO PLAY'}
        </div>

        <div className="flex items-center gap-1 text-green-400 font-mono text-xs">
          <Globe className="w-3 h-3" aria-hidden="true" />
          <span title={`Detected: ${languageDisplayName} | Using: ${actualLanguageDisplayName}`}>
            {actualLanguage.toUpperCase()}
          </span>
        </div>


        <button
          onClick={togglePlayPause}
          className={`w-6 h-6 p-0 border border-gray-600 rounded flex items-center justify-center transition-all ${isPlaying
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-green-600 hover:bg-green-500'
            }`}
          style={{
            backgroundColor: isPlaying
              ? "hsl(var(--pokedex-dark))"
              : "hsl(var(--pokedex-green))"
          }}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          title={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 text-white" aria-hidden="true" />
          ) : (
            <Play className="w-3 h-3 text-white" aria-hidden="true" />
          )}
        </button>


        <button
          onClick={toggleMute}
          className="w-6 h-6 p-0 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--pokedex-dark))" }}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            <VolumeX className="w-3 h-3 text-green-400" aria-hidden="true" />
          ) : (
            <Volume2 className="w-3 h-3 text-green-400" aria-hidden="true" />
          )}
        </button>


        <div className="flex items-center gap-2">
          <label htmlFor="volume-slider" className="text-green-400 font-mono text-xs">VOL</label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
            aria-label={`Volume control: ${Math.round(volume * 100)}%`}
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>


        {onNarrationToggle && (
          <button
            onClick={() => onNarrationToggle(!isNarrationEnabled)}
            className={`w-6 h-6 p-0 border border-gray-600 rounded flex items-center justify-center transition-all ${isNarrationEnabled
              ? 'bg-green-600 hover:bg-green-500'
              : 'bg-gray-800 hover:bg-gray-700'
              }`}
            style={{
              backgroundColor: isNarrationEnabled
                ? "hsl(var(--pokedex-green))"
                : "hsl(var(--pokedex-dark))"
            }}
            aria-label={isNarrationEnabled ? 'Disable narration' : 'Enable narration'}
            title={isNarrationEnabled ? 'Disable narration' : 'Enable narration'}
          >
            {isNarrationEnabled ? (
              <Mic className="w-3 h-3 text-white" aria-hidden="true" />
            ) : (
              <MicOff className="w-3 h-3 text-white" aria-hidden="true" />
            )}
          </button>
        )}

        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isPlaying ? "hsl(var(--pokedex-green))" : "hsl(var(--pokedex-dark))"
          }}
          aria-label={isPlaying ? 'Audio is playing' : 'Audio is stopped'}
          title={isPlaying ? 'Audio is playing' : 'Audio is stopped'}
        ></div>
      </div>
    </aside>
  );
};
