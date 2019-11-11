import client from './client';

export const getOwnerRes = resNo => client.get(`/figtable/api/owner/${resNo}`);
