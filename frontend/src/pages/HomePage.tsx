// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 space-y-4">
      <div className="w-full max-w-lg">
        <SearchBar onSearch={handleSearch} />
      </div>

      
      <div className="w-full max-w-4xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 h-96 bg-white rounded shadow p-4">
          <LocationMap locations={locations} />
        </div>
        <div className="flex-1 bg-white rounded shadow p-4">
          <LocationList locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
