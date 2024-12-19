import React, { useEffect, useState } from 'react';
import { X, MapPin, Star, ExternalLink, Clock, Navigation } from 'lucide-react';
import type { Place } from '../types/place';
import { CategoryTag } from './UI/CategoryTag';
import { LocationTag } from './UI/LocationTag';

interface PlaceModalProps {
  place: Place;
  isOpen: boolean;
  onClose: () => void;
}

export function PlaceModal({ place, isOpen, onClose }: PlaceModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match the duration of the transition
  };

  const getGoogleMapsUrl = (place: Place) => {
    const [lat, lng] = place.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        className={`bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-300 ${
          isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        } ${!isClosing && 'animate-modal'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-gray-600">{place.rating}</span>
            </div>
          </div>

          <div className="space-y-4">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-64 object-cover rounded-lg"
            />

            <p className="text-gray-600">{place.description}</p>

            <div className="flex items-center gap-2">
              <LocationTag location={place.location} />
              <CategoryTag category={place.category} />
            </div>

            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 mt-0.5" />
              <span>{place.address}</span>
            </div>

            {place.openingHours && (
              <div className="flex items-start gap-2 text-gray-600">
                <Clock className="w-5 h-5 mt-0.5" />
                <span>{place.openingHours}</span>
              </div>
            )}

            <div className="flex justify-center gap-4 border-t border-gray-200 pt-4">
              <a
                href={getGoogleMapsUrl(place)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-white px-6 py-2.5 rounded-lg transition-colors min-w-[160px]"
              >
                <Navigation className="w-4 h-4" />
                Take me there
              </a>
              
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand text-brand hover:bg-gray-50 px-6 py-2.5 rounded-lg transition-colors min-w-[160px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}