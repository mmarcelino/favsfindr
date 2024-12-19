import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export function FilterToggle({ isOpen, onClick }: FilterToggleProps) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      {isOpen ? (
        <>
          <X className="w-4 h-4" />
          <span>Close Filters</span>
        </>
      ) : (
        <>
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </>
      )}
    </button>
  );
}