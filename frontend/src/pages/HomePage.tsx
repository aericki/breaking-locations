// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'; // Import para corrigir renderização do mapa Leaflet
import SearchBar from '../components/SearchBar';
import LocationMap from '../components/LocationMap';
import LocationList from '../components/LocationList';
import { fetchLocations } from '../api/locationApi';

const HomePage: React.FC = () => {
  const [locations, setLocations] = useState([]);

  const handleSearch = async (city: string) => {
    const data = await fetchLocations(city);
    setLocations(data);
  };

  useEffect(() => {
    handleSearch(''); // Carrega todos os locais ao iniciar
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
          <LocationMap locations={locations} />
        </div>

        {/* Lista de Locais - ocupa 20% da largura */}
        <div className="w-1/5 h-full bg-white rounded shadow p-4 overflow-y-auto">
          <LocationList locations={locations} />
          <h1>OK</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
