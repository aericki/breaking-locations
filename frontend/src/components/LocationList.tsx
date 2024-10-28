import React from 'react';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  whatsapp?: string;
}

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <ul>
      {locations.map((location) => (
        <li key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.address}, {location.city}</p>
          <p>Telefone: {location.phone}</p>
          {location.whatsapp && <p>WhatsApp: {location.whatsapp}</p>}
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
