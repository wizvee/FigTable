import client from './client';

// getById
export const getById = resNo =>
  client.get(`/figtable/api/restaurants/${resNo}`);
