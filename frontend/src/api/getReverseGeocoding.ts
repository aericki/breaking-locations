import axios from 'axios'


export const api = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/reverse',
})


export const getReverseGeocoding = async (lat: number, lng: number) => {
  const response = await api.get('', {
    params: {
      format: 'json',
      lat,
      lon: lng
    }
  })
  return response.data
}

