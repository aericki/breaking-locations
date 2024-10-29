/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import SearchBar from '../components/SearchBar';
import LocationMap from '../components/LocationMap';
import LocationList from '../components/LocationList';
import { fetchLocations } from '../api/locationApi';
import { getCityCoordinates } from '@/api/geocodingApi';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/types';

const HomePage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [mapCenter, setMapCenter] = useState({ latitude: -23.94, longitude: -46.31 });
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter({ latitude, longitude });
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSearch = async (city: string) => {
    // Busca locais da cidade no banco
    const data = await fetchLocations(city);
    setFilteredLocations(data); // Atualiza filteredLocations com os locais retornados
    console.log('Locais da cidade:', data);

    // Define o primeiro local encontrado como o selecionado para abrir o popup
    if (data.length > 0) {
      setSelectedLocation(data[0]);
    } else {
      setSelectedLocation(null);
    }

    // Busca as coordenadas da cidade para centralizar o mapa
    const coordinates = await getCityCoordinates(city);
    if (coordinates) {
      setMapCenter(coordinates);
    } else {
      alert('Cidade não encontrada');
    }
  };

  const handleResetLocation = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setSelectedLocation(null);
    } else {
      alert('Localização atual não disponível');
    }
  };

  useEffect(() => {
    const loadLocations = async () => {
      const data = await fetchLocations('');
      setLocations(data);
      setFilteredLocations(data); // Exibe todos os locais ao iniciar
    };
    loadLocations();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100">
      <div className="p-4 flex items-center gap-4">
        <SearchBar onSearch={handleSearch} />
        <Button onClick={handleResetLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
          Voltar para minha Localização
        </Button>
      </div>

      <div className="flex flex-1 w-full h-full gap-4 px-4">
        <div className="flex-1 h-full bg-white rounded shadow p-4" style={{ width: '80%' }}>
          <LocationMap locations={filteredLocations} center={mapCenter} selectedLocation={selectedLocation} />
        </div>

        <div className="w-1/5 h-full bg-white rounded shadow p-4 overflow-y-auto">
          <LocationList locations={filteredLocations} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
