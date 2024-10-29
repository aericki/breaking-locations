// src/components/LocationList.tsx
import React from 'react';
import {LocationListProps} from '@/types/types';

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <ul>
      {locations.map((location) => (
        <li key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.address}, {location.city}</p>
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
