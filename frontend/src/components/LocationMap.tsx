// src/components/LocationMap.tsx
import L from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationMapProps {
  locations: Location[];
  center: { latitude: number; longitude: number };
  selectedLocation?: Location | null;
}

// Componente para atualizar o centro do mapa e abrir o popup
const MapCenterUpdater: React.FC<{ center: { latitude: number; longitude: number }; selectedLocation?: Location | null }> = ({ center, selectedLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.latitude, center.longitude], 12);

    // Exibe o popup do local selecionado, se houver
    if (selectedLocation) {
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
  }, [center, selectedLocation, map]);

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
