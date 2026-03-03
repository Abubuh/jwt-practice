import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000',
});
//Un interceptor es algo que se ejecuta:
//Justo antes de que se envíe cualquier request.

//Interceptor de RESPONSE (maneja 401 automáticamente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
