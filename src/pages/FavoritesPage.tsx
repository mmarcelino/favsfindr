import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PlaceCard } from '../components/PlaceCard';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { places } from '../data/places';
import { Place } from '../types/place';
import { PlaceModal } from '../components/PlaceModal';

export function FavoritesPage() {
  const { user } = useAuth();
  const { favorites, loading } = useFavorites(user);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const favoritePlaces = places.filter(place => favorites.includes(place.id));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
      
      {favoritePlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onClick={setSelectedPlace}
              onShowAuth={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            You haven't saved any favorites yet.
          </p>
          <p className="text-gray-400">
            Browse places and click the heart icon to add them to your favorites.
          </p>
        </div>
      )}

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          isOpen={true}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}