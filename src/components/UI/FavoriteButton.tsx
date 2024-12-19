import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

export function FavoriteButton({ isFavorite, onClick, className = '' }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          isFavorite ? 'fill-brand stroke-brand scale-110' : 'stroke-gray-600'
        }`}
      />
    </button>
  );
}