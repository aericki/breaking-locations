import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { fetchLocations } from '../../api/locationApi';
import 'leaflet/dist/leaflet.css';
import { Input } from '../ui/input';
import { Button, Container } from './styles';
import { Location } from '@/types';
import { LatLngExpression } from 'leaflet';

const LocationsMap = () => {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([-23.9278, -46.9937]);

  // Função para buscar localizações da API com base na cidade
  const handleSearch = async () => {
    try {
      const data = await fetchLocations(city);
      setLocations(data);

      // Centraliza o mapa no primeiro local retornado pela busca, se existir
      if (data.length > 0) {
        const { latitude, longitude } = data[0];
        setMapCenter([latitude, longitude]);
      }
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
    }
  };

  const FlyToLocation: React.FC<{ center: LatLngExpression }> = ({ center }) => {
    const map = useMap();
    map.flyTo(center, 13); // Ajuste o zoom para um nível desejado
    return null;
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-3 mb-4">
        <Input
          className='flex bg-gray-100 placeholder:text-gray-400 placeholder:font-light font-normal'
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSearch}>Pesquisar</Button>
      </div>
      
      <MapContainer center={mapCenter} zoom={12} style={{ height: '80vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FlyToLocation center={mapCenter} />
        
        {locations.map((location: Location) => (
          <Marker key={location.name} position={[location.latitude, location.longitude]}>
            <Popup>
              <strong>{location.name}</strong><br />
              {location.address}<br />
              {location.city}, {location.state}<br />
              <a href={`https://wa.me/${location.whatsapp}`}>WhatsApp</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default LocationsMap;
