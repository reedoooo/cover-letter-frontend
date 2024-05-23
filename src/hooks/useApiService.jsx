import axios from 'axios';

import constants from 'config/constants';

const { API_URL } = constants;

const useApiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default useApiService;
