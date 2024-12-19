import React from 'react';
import { LocationType } from '../../constants/locations';

interface LocationTagProps {
  location: LocationType;
  className?: string;
}

export function LocationTag({ location, className = '' }: LocationTagProps) {
  return (
    <span className={`inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full ${className}`}>
      {location.charAt(0).toUpperCase() + location.slice(1)}
    </span>
  );
}