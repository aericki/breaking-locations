import axios from "axios";

export const getCityCoordinates = async (city: string) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1
      }
    });

    if ( response.data && response.data.legth > 0) {
      const {lat, lon} =  response.data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      }
    }

    throw new Error('Cidade não encontrada');

  } catch (error) {
    console.error('Erro ao buscar coordenadas da cidade:', error);
    return null;
  }
}