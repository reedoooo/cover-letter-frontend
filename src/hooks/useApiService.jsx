import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_URL}`;

export const useApiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
