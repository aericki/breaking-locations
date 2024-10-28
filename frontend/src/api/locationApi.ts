/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const fetchLocations = async (city: string = '') => {
  const reponse = await api.get('/locations', {
    params: {
      city
    }
  })
  return reponse.data;
}

export const createLocation = async (locationData: any) => {
  const response = await api.post('/locations', locationData);
  return response.data
}