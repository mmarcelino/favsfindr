import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Place } from '../types/place';
import { LocationTag } from './UI/LocationTag';
import { CategoryTag } from './UI/CategoryTag';
import { FavoriteButton } from './UI/FavoriteButton';
import { Toast } from './UI/Toast';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';

interface PlaceCardProps {
  place: Place;
  onClick: (place: Place) => void;
  onShowAuth: () => void;
}

export function PlaceCard({ place, onClick, onShowAuth }: PlaceCardProps) {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites(user);
  const [showToast, setShowToast] = useState(false);
  const isFavorite = favorites.includes(place.id);

  const handleFavoriteClick = async () => {
    if (!user) {
      setShowToast(true);
      return;
    }
    await toggleFavorite(place.id);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer relative"
        onClick={() => onClick(place)}
      >
        <div className="relative">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-48 object-cover"
          />
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{place.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{place.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{place.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <LocationTag location={place.location} />
            <CategoryTag category={place.category} />
          </div>
          <p className="text-gray-500 text-xs mt-2">{place.address}</p>
        </div>
      </div>

      <Toast
        message="Please sign in to save your favorite places!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        onSignIn={() => {
          setShowToast(false);
          onShowAuth();
        }}
      />
    </>
  );
}