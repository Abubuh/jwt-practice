import api from './api';

export const addMember = (listId, data) =>
  api.post(`/api/lists/${listId}/members`, data);

export const removeMember = (listId, memberId) =>
  api.delete(`/api/lists/${listId}/members/${memberId}`);

export const changeMemberRole = (listId, memberId, role) =>
  api.patch(`/api/lists/${listId}/members/${memberId}/role`, { role });
