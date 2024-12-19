import React from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FilterBar } from '../FilterBar';
import { FilterButton } from '../UI/FilterButton';
import { AngleHeart } from '../UI/AngleHeart';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  showFilters: boolean;
  onFilterToggle: () => void;
  selectedLocation: string;
  selectedCategory: string;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
  onAuthClick: () => void;
  user: User | null;
}

export function Header({ 
  isMenuOpen, 
  onMenuToggle, 
  showFilters, 
  onFilterToggle,
  selectedLocation,
  selectedCategory,
  onLocationChange,
  onCategoryChange,
  onAuthClick,
  user
}: HeaderProps) {
  const location = useLocation();
  const showFilterButton = location.pathname === '/';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <AngleHeart className="w-8 h-8 text-brand" />
            <h1 className="text-3xl font-bold text-gray-900">favsFindr</h1>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contribute"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contribute
            </Link>
            {user && (
              <Link 
                to="/favorites"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Favorites
              </Link>
            )}
            <button
              onClick={onAuthClick}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {user ? 'Sign Out' : 'Sign In'}
            </button>
            {showFilterButton && (
              <FilterButton showFilters={showFilters} onClick={onFilterToggle} />
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={onMenuToggle}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 mt-4">
            <div className="space-y-4">
              <Link 
                to="/about"
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={onMenuToggle}
              >
                About
              </Link>
              <Link 
                to="/contribute"
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={onMenuToggle}
              >
                Contribute
              </Link>
              {user && (
                <Link 
                  to="/favorites"
                  className="block text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
                  onClick={onMenuToggle}
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </Link>
              )}
              <button
                onClick={() => {
                  onAuthClick();
                  onMenuToggle();
                }}
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {user ? 'Sign Out' : 'Sign In'}
              </button>
              {showFilterButton && (
                <div className="pt-2">
                  <FilterButton showFilters={showFilters} onClick={onFilterToggle} />
                </div>
              )}
            </div>
          </nav>
        )}
      </div>

      {/* Filter Section */}
      {showFilterButton && showFilters && (
        <div className="bg-white border-t border-gray-200 shadow-sm">
          <div className="max-w-[100rem] mx-auto px-6 py-4">
            <FilterBar
              selectedLocation={selectedLocation}
              selectedCategory={selectedCategory}
              onLocationChange={onLocationChange}
              onCategoryChange={onCategoryChange}
            />
          </div>
        </div>
      )}
    </header>
  );
}