import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { fetchLocations } from '../../api/locationApi';
import 'leaflet/dist/leaflet.css';
import { Input } from '../ui/input';
import { Button, Container } from './styles';
import { Location } from '@/types';
import { LatLngExpression } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Title } from './styles';

const LocationsMap = () => {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([-23.9278, -46.9937]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Função para buscar localizações da API com base na cidade
  const handleSearch = async () => {

    if (city.trim() === '') { 
      alert("Por favor, insira o nome de uma cidade para pesquisar."); 
      return; 
    }

    setIsLoading(true);
    setMessage(null);
    try {
      const data = await fetchLocations(city);
      setLocations(data);

      if (data.length === 0) {
        setMessage('Nenhuma localização encontrada para a cidade informada.');
      } else {
        const { latitude, longitude } = data[0];
        setMapCenter([latitude, longitude]);
      }
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
      setMessage('Ocorreu um erro ao buscar localizações.');
    } finally {
      setIsLoading(false);
    }
  };

  const FlyToLocation: React.FC<{ center: LatLngExpression }> = ({ center }) => {
    const map = useMap();
    map.flyTo(center, 13); // Ajuste o zoom para um nível desejado
    return null;
  };

  return (
    <Container>
        <Title>Localizações</Title>
        <form className="flex w-full items-center justify-between gap-3 mb-4 max-w-[700px]">
        <Input
          className='flex bg-gray-100 placeholder:text-gray-400 placeholder:font-light font-normal'
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Button onClick={handleSearch}>Pesquisar</Button>
        <Button style={{ 
          width: '200px',
          backgroundColor: 'black',
        }} onClick={() => navigate('/register') } >Novo local</Button>
      </form>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-full" >
          <p className="text-2xl">Buscando localizações...</p>
        </div>
      ): message ? (
        <div className="flex items-center justify-center h-full" >
          <p className="text-2xl">{message}</p>
        </div>
      ) :(<MapContainer center={mapCenter} zoom={12} style={{ height: '80vh', width: '100%' ,
        zIndex: 0
      }}>
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
      </MapContainer>)}
      
    </Container>
  );
};

export default LocationsMap;
