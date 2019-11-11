import client from './client';

export const getOwnerMain = resNo => client.get(`/figtable/api/owner/${resNo}`);
