import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Place } from '../../types/place';
import { MapMarker } from './MapMarker';
import { LOCATIONS } from '../../constants/locations';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER: [number, number] = [39.5, -8.0]; // Adjusted center
const DEFAULT_ZOOM = 7; // Increased zoom level

function MapController({ selectedLocation }: { selectedLocation: string }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation === 'all') {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    } else {
      const location = LOCATIONS[selectedLocation as keyof typeof LOCATIONS];
      if (location) {
        map.setView(location.center, 13);
      }
    }
  }, [selectedLocation, map]);

  return null;
}

interface MapViewProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedLocation: string;
}

export function MapView({ places, onPlaceSelect, selectedLocation }: MapViewProps) {
  const mapRef = useRef(null);

  return (
    <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        ref={mapRef}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-[calc(100vh-8rem)] md:h-full w-full"
        scrollWheelZoom={false}
        minZoom={6}
        maxBounds={[
          [35.0, -10.0],
          [43.0, -6.0]
        ]}
      >
        <MapController selectedLocation={selectedLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <MapMarker
            key={place.id}
            place={place}
            onClick={() => onPlaceSelect(place)}
          />
        ))}
      </MapContainer>
    </div>
  );
}