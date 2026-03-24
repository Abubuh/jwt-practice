import axios from 'axios';
const api = axios.create({
  baseURL: 'https://jwt-practice-production.up.railway.app/',
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
