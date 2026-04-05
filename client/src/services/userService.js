import api from './api';

export const searchUsers = (username) =>
  api.get(`/users/search?username=${username}`);
