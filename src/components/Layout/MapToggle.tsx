import React from 'react';
import { Map, List } from 'lucide-react';

interface MapToggleProps {
  showMap: boolean;
  onToggle: () => void;
}

export function MapToggle({ showMap, onToggle }: MapToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed left-1/2 -translate-x-1/2 bottom-4 md:hidden z-50 bg-brand text-white px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap hover:bg-brand-light transition-opacity"
    >
      {showMap ? (
        <>
          <List className="w-4 h-4" />
          Show Places
        </>
      ) : (
        <>
          <Map className="w-4 h-4" />
          Show Map
        </>
      )}
    </button>
  );
}