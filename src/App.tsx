import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { places } from './data/places';
import { PlaceModal } from './components/PlaceModal';
import { ContentLayout } from './components/Layout/ContentLayout';
import { MapToggle } from './components/Layout/MapToggle';
import { LandingOverlay } from './components/LandingOverlay';
import { Header } from './components/Layout/Header';
import { ContributePage } from './pages/ContributePage';
import { AboutPage } from './pages/AboutPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AuthModal } from './components/Auth/AuthModal';
import { ConnectionError } from './components/UI/ConnectionError';
import { useAuth } from './hooks/useAuth';
import { useSupabaseConnection } from './hooks/useSupabaseConnection';
import { supabase } from './lib/supabase';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user } = useAuth();
  const { isConnected, isLoading, error } = useSupabaseConnection();

  const handleAuthClick = async () => {
    if (user) {
      await supabase.auth.signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  const filteredPlaces = places.filter((place) => {
    const locationMatch = selectedLocation === 'all' || place.location === selectedLocation;
    const categoryMatch = selectedCategory === 'all' || place.category === selectedCategory;
    return locationMatch && categoryMatch;
  });

  if (!isConnected && !isLoading) {
    return (
      <ConnectionError 
        message={error?.message || 'Unable to connect to the service'} 
      />
    );
  }

  return (
    <>
      {showLanding && (
        <LandingOverlay onExplore={() => setShowLanding(false)} />
      )}
      <div className="min-h-screen bg-gray-100">
        <Header 
          isMenuOpen={isMenuOpen} 
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          showFilters={showFilters}
          onFilterToggle={() => setShowFilters(!showFilters)}
          selectedLocation={selectedLocation}
          selectedCategory={selectedCategory}
          onLocationChange={setSelectedLocation}
          onCategoryChange={setSelectedCategory}
          onAuthClick={handleAuthClick}
          user={user}
        />
        
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/" element={
            <main className="max-w-[100rem] mx-auto">
              <ContentLayout
                places={filteredPlaces}
                showMap={showMap}
                showFilters={showFilters}
                onPlaceSelect={setSelectedPlace}
                selectedLocation={selectedLocation}
                onShowAuth={() => setShowAuthModal(true)}
              />

              <MapToggle
                showMap={showMap}
                onToggle={() => setShowMap(!showMap)}
              />

              {selectedPlace && (
                <PlaceModal
                  place={selectedPlace}
                  isOpen={true}
                  onClose={() => setSelectedPlace(null)}
                />
              )}
            </main>
          } />
        </Routes>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}