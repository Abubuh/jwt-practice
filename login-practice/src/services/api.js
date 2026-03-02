import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});
//Un interceptor es algo que se ejecuta:
//Justo antes de que se envíe cualquier request.
api.interceptors.request.use((config) => {
  //Busca el JWT que guardaste después del login.
  const token = localStorage.getItem('token');
  if (token) {
    //Eso es lo que tu backend espera para validar al usuario.
    config.headers.Authorization = `Bearer ${token}`;
  } //El interceptor debe devolver el config, porque ese objeto es el que axios usará para enviar la request real.
  //Si no lo retornas → la request no sale.
  return config;
});

//Interceptor de RESPONSE (maneja 401 automáticamente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      alert('Session expired, login!');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
