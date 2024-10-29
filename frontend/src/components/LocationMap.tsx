// src/components/LocationMap.tsx
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
}

// Componente para atualizar o centro do mapa
const MapCenterUpdater: React.FC<{ center: { latitude: number; longitude: number } }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([center.latitude, center.longitude], 12);
  }, [center, map]);

  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({ locations, center }) => {
  return (
    <MapContainer
      
      style={{ 
        height: '85vh', 
        width: '100%',
        margin: '0 auto',
      }}
      center={[center.latitude, center.longitude]}
      zoom={12}
      scrollWheelZoom={false} // Desativa zoom pelo scroll
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenterUpdater center={center} />
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
