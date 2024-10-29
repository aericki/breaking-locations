
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SearchBarProps } from '@/types/types';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  }

  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Digite uma cidade" value={city} onChange={(e) => setCity(e.target.value)} className='w-full' />
      <Button  onClick={handleSearch}>Pesquisar</Button>
    </div>
  )

}

export default SearchBar