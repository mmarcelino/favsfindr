import React from 'react';
import { AngleHeart } from './UI/AngleHeart';

interface LandingOverlayProps {
  onExplore: () => void;
}

export function LandingOverlay({ onExplore }: LandingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center text-center px-4">
      <div className="animate-fade-in">
        <div className="flex justify-center mb-4">
          <AngleHeart className="w-16 h-16 text-brand" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          favsFindr
        </h1>
        <h2 className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl mx-auto">
          A couple's opinionated list of top spots in Portugal
        </h2>
        <button
          onClick={onExplore}
          className="bg-brand text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-brand-light transition-colors"
        >
          Explore
        </button>
      </div>
    </div>
  );
}