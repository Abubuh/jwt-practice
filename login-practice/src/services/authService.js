import api from './api';
export async function loginUser(credentials) {
  const result = await api.post('/login', credentials);
  return result.data;
}

export async function registerUser(credentials) {
  const result = await api.post('/register', credentials);
  return result.data;
}
