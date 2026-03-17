import api from './api';

export const getTodos = (listId) => api.get(`/api/lists/${listId}/todos`);
export const createTodo = (listId, data) =>
  api.post(`/api/lists/${listId}/todos`, data);
export const deleteTodo = (listId, todoId) =>
  api.delete(`/api/lists/${listId}/todos/${todoId}`);
export const updateTodo = (listId, todoId, data) =>
  api.patch(`/api/lists/${listId}/todos/${todoId}`, data);
