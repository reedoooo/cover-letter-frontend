import axios from 'axios';
import constants from 'config/constants';

const { API_URL } = constants;

const service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let token = null;
let expiresIn = null;

export const setAuthToken = (newToken, newExpiresIn) => {
  token = newToken;
  expiresIn = newExpiresIn;
};

service.interceptors.request.use(
  config => {
    token = localStorage.getItem('userToken');
    if (expiresIn && expiresIn < Date.now() / 1000) {
      // Clear token if expired
      token = null;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

service.interceptors.response.use(
  response => {
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      return response;
    }

    throw new Error(response.status.toString());
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
