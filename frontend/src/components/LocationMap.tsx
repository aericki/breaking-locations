// src/components/LocationMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationMapProps {
  locations: Location[];
}

const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  return (
    <MapContainer
      center={[-23.94, -46.31]}
      zoom={12}
      scrollWheelZoom={false} // Desativa zoom pelo scroll
      dragging={false}         // Desativa o arrasto do mapa
      style={{
        width: '100%',
        height: '400px', // Define altura fixa para o mapa
        maxWidth: '600px', // Define largura máxima para manter o layout organizado
        borderRadius: '0.5rem',
      }}
      className="border border-gray-200 shadow-lg mx-auto"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
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
