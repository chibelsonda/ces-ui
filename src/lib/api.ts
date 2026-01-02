import axios from 'axios';
import { notify } from '../utils/notification';

export const api = axios.create({
  baseURL: 'https://localhost:7060/api',
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      'Something went wrong';

    notify('error', message);

    return Promise.reject(error);
  }
);
