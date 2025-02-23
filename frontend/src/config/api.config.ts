const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:8000/api'
    : 'http://ваш-локальный-ip:8000/api'  // или домен вашего сервера
};