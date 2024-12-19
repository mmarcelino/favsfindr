import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Place } from '../../types/place';
import { CATEGORIES } from '../../constants/categories';

interface MapMarkerProps {
  place: Place;
  onClick: () => void;
}

export function MapMarker({ place, onClick }: MapMarkerProps) {
  const category = CATEGORIES[place.category];
  
  const icon = new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 32s16-10.667 16-18.667C32 6 26 0 16 0S0 6 0 13.333C0 21.333 16 32 16 32z" fill="${category.color}"/>
        <circle cx="16" cy="13" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    tooltipAnchor: [0, -36],
  });

  return (
    <Marker
      position={place.coordinates}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Tooltip direction="top" offset={[0, -20]} permanent={false}>
        <div className="text-center">
          <div className="font-medium">{place.name}</div>
          <div className="text-sm text-gray-600">{category.label}</div>
        </div>
      </Tooltip>
    </Marker>
  );
}