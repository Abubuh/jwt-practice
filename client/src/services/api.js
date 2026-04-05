import axios from 'axios';

const defaultProdApi =
  'https://jwt-practice-production.up.railway.app';

const baseURL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? defaultProdApi : 'http://localhost:3000');

const api = axios.create({
  baseURL,
});
//Un interceptor es algo que se ejecuta:
//Justo antes de que se envíe cualquier request.

//Interceptor de RESPONSE (maneja 401 automáticamente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      error.isAuthError = true;
    }
    return Promise.reject(error);
  }
);

export default api;
