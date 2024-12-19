import React from 'react';

interface FilterBarProps {
  selectedLocation: string;
  selectedCategory: string;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({
  selectedLocation,
  selectedCategory,
  onLocationChange,
  onCategoryChange,
}: FilterBarProps) {
  const locations = ['all', 'lisbon', 'porto'];
  const categories = ['all', 'bar', 'pub', 'garden', 'restaurant', 'museum', 'beach'];

  const selectClassName = `
    w-full md:w-32 
    bg-gray-50
    border border-gray-200 
    text-gray-900 
    text-sm 
    rounded-lg 
    shadow-sm
    px-4 py-2.5
    appearance-none
    cursor-pointer
    transition-colors
    hover:bg-white
    hover:border-brand/50
    focus:bg-white
    focus:ring-2 
    focus:ring-brand/20
    focus:border-brand
    focus:outline-none
    bg-[url('data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="%23666666" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>')] 
    bg-[length:20px_20px]
    bg-no-repeat
    bg-[center_right_0.75rem]
  `;

  return (
    <div className="flex flex-row gap-4 md:gap-8">
      <div className="w-1/2 md:w-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <label htmlFor="location" className="text-sm font-medium text-gray-700 md:min-w-20">
            Location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className={selectClassName}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-1/2 md:w-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 md:min-w-20">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={selectClassName}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}