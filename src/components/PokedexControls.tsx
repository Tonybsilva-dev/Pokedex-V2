'use client';

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PokedexControlsProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  currentIndex: number;
  totalPokemon: number;
}

export const PokedexControls = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  currentIndex,
  totalPokemon
}: PokedexControlsProps) => {
  return (
    <div className="space-y-4" role="group" aria-label="Pokémon Navigation Controls">
      <div className="relative w-24 h-24 mx-auto" role="group" aria-label="Directional Pad">

        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-20 bg-gray-800 rounded"></div>

        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-20 h-8 bg-gray-800 rounded"></div>


        <Button
          variant="ghost"
          size="sm"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 p-0 bg-zinc-600 hover:bg-zinc-600 border border-gray-600"
          onClick={onUp}
        >
          <ChevronUp className="w-4 h-4 text-white" />
        </Button>


        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 p-0 bg-zinc-600 hover:bg-zinc-600 border border-gray-600"
          onClick={onDown}
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </Button>


        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 p-0 bg-zinc-600 hover:bg-zinc-600 border border-gray-600"
          onClick={onLeft}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </Button>


        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 p-0 bg-zinc-600 hover:bg-zinc-600 border border-gray-600"
          onClick={onRight}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </Button>


        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border border-gray-600"></div>
      </div>


      <div className="flex justify-center gap-2">
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-600 bg-green-500"
        ></div>
        <div
          className="w-6 h-6 rounded-full border-2 border-gray-600 bg-yellow-500"
        ></div>
      </div>


      <div className="text-center">
        <div className="bg-gray-800 text-green-400 font-mono text-xs px-2 py-1 rounded inline-block">
          {(currentIndex + 1).toString().padStart(3, '0')}/{totalPokemon.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  );
};
