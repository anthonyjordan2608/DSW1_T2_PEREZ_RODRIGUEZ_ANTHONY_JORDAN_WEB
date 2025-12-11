import axios from 'axios';

// Usa variable de entorno O valor por defecto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5086';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para debug
api.interceptors.request.use(config => {
  console.log('API Request:', config.baseURL, config.url);
  return config;
});

export default api;