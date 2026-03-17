import api from './api';

export const getLists = () => api.get('/api/lists');
export const getListById = (listId) => api.get(`/api/lists/${listId}`);
export const getListMembers = (listId) => api.get(`/api/lists/${listId}/members`);
export const createList = (title) => api.post('/api/lists', { title });
export const deleteList = (listId) => api.delete(`/api/lists/${listId}`);
export const updateList = (listId, data) =>
  api.patch(`/api/lists/${listId}`, data);
