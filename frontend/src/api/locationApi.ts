

import Axios from 'axios'

export interface Location {
  name: string
  latitude: number
  longitude: number
  address: string
  city: string
  state: string
  country: string
  whatsapp: string
}

export const api = Axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const fetchLocations = async (city: string = '') => {
  const response = await api.get('/locations', {
    params: {
      city
    }
  })
  return response.data;
}

export const createLocation = async (locationData: Location) => {

  const response = await api.post('/locations', locationData);
  return response.data
}