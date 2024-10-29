// src/api/geocodingApi.ts
import axios from 'axios';

export const getCityCoordinates = async (city: string) => {
  try {
    console.log(`Buscando coordenadas para a cidade: ${city}`); // Log para verificar a cidade pesquisada
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
    });

    console.log('Resposta da API de geocodificação:', response.data); // Log da resposta da API

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    }

    throw new Error('Cidade não encontrada');
  } catch (error) {
    console.error('Erro ao buscar coordenadas da cidade:', error);
    return null;
  }
};
