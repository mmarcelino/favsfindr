import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';

interface FilterButtonProps {
  showFilters: boolean;
  onClick: () => void;
}

export function FilterButton({ showFilters, onClick }: FilterButtonProps) {
  const nodeRef = React.useRef(null);
  const iconNodeRef = React.useRef(null);

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center bg-brand text-white px-4 py-2.5 rounded-lg hover:bg-brand-light transition-all duration-300"
    >
      <div className={`transform transition-transform duration-300 mr-2 ${showFilters ? 'rotate-90' : ''}`}>
        {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
      </div>
      <div className="relative w-[82px] h-4 overflow-hidden">
        <CSSTransition
          in={showFilters}
          timeout={200}
          classNames="filter-content"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <span ref={nodeRef} className="absolute inset-0 whitespace-nowrap flex items-center justify-center">
            Hide filters
          </span>
        </CSSTransition>
        <CSSTransition
          in={!showFilters}
          timeout={200}
          classNames="filter-content"
          unmountOnExit
          nodeRef={iconNodeRef}
        >
          <span ref={iconNodeRef} className="absolute inset-0 whitespace-nowrap flex items-center justify-center">
            Filters
          </span>
        </CSSTransition>
      </div>
    </button>
  );
}