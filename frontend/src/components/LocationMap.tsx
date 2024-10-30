/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/LocationMap.tsx
import L from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Location, LocationMapProps } from '@/types/types';

const MapCenterUpdater: React.FC<{ center: { latitude: number; longitude: number }; selectedLocation?: Location | null }> = ({ center, selectedLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      // Centraliza o mapa no local selecionado e abre o popup
      map.setView([selectedLocation.latitude, selectedLocation.longitude], 12);

      const popup = L.popup()
        .setLatLng([selectedLocation.latitude, selectedLocation.longitude])
        .setContent(
          `<div>
            <strong>${selectedLocation.name}</strong><br />
            ${selectedLocation.address}
          </div>`
        );

      popup.openOn(map);
    }
  }, [selectedLocation, map]);

  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({ locations, center, selectedLocation }) => {
  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={12}
      scrollWheelZoom={false}
      style={{
        width: '100%',
        height: '85vh',
        margin: '0 auto',
      }}
      
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapCenterUpdater center={center} selectedLocation={selectedLocation} />
      
      {locations.map((location) => (
        <Marker key={location.id} position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
