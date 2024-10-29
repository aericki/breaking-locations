/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import para corrigir renderização do mapa Leaflet
import SearchBar from '../components/SearchBar';
import LocationMap from '../components/LocationMap';
import LocationList from '../components/LocationList';
import { fetchLocations } from '../api/locationApi';
import { getCityCoordinates } from '@/api/geocodingApi';

const HomePage: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({ latitude: -23.94, longitude: -46.31 }); // Posição inicial

  const handleSearch = async (city: string) => {

    // 1. Busca os locais de treino da cidade
    const data = await fetchLocations(city);
    setFilteredLocations(data); // Filtra os locais para exibir na lista

    // 2. Busca as coordenadas da cidade e centraliza o mapa
    const coordinates = await getCityCoordinates(city);
    if (coordinates) {
      setMapCenter(coordinates);
    } else {
      alert('Cidade não encontrada');
    }
  };

  useEffect(() => {
    // Carrega todos os locais ao iniciar
    const loadLocations = async () => {
      const data = await fetchLocations('');
      setLocations(data);
      setFilteredLocations(data); // Exibe todos os locais inicialmente
    };
    loadLocations();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100">
      {/* Barra de Pesquisa */}
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Área do Mapa e Lista de Locais */}
      <div className="flex flex-1 w-full h-full gap-4 px-4">
        {/* Mapa - ocupa 80% da largura */}
        <div className="flex-1 h-full bg-white rounded shadow p-4" style={{ width: '80%' }}>
          <LocationMap locations={filteredLocations} center={mapCenter} />
        </div>

        {/* Lista de Locais - ocupa 20% da largura */}
        <div className="w-1/5 h-full bg-white rounded shadow p-4 overflow-y-auto">
          <LocationList locations={filteredLocations} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
