import React from 'react';
import { Place } from '../../types/place';
import { PlaceCard } from '../PlaceCard';
import { MapView } from '../Map/MapView';

interface ContentLayoutProps {
  places: Place[];
  showMap: boolean;
  showFilters: boolean;
  onPlaceSelect: (place: Place) => void;
  selectedLocation: string;
  onShowAuth: () => void;
  className?: string;
}

export function ContentLayout({ 
  places, 
  showMap,
  showFilters,
  onPlaceSelect, 
  selectedLocation,
  onShowAuth,
  className = '' 
}: ContentLayoutProps) {
  return (
    <div className={`
      relative flex h-[calc(100vh-72px)] pt-6
      ${className}
    `}>
      {/* Places list */}
      <div className={`
        flex-1 overflow-y-auto px-6
        ${showMap ? 'hidden md:block' : 'block'}
      `}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
          {places.map((place) => (
            <PlaceCard 
              key={place.id} 
              place={place} 
              onClick={onPlaceSelect}
              onShowAuth={onShowAuth}
            />
          ))}
        </div>

        {places.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No places found with the selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Map */}
      <div className={`
        fixed inset-0 z-30
        md:relative md:z-auto md:inset-auto
        md:w-[33.333333%]
        ${showMap ? 'block' : 'hidden md:block'}
      `}>
        <div className="sticky top-0 h-full">
          <MapView
            places={places}
            onPlaceSelect={onPlaceSelect}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>
    </div>
  );
}