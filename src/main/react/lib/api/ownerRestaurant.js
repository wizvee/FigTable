import client, { path } from './client';

export const getOwnerRes = resNo => client.get(`${path}/api/owner/${resNo}`);

export const updateThumb = ({ resNo, resThumb }) =>
  client.patch(`${path}/api/ownerThumb`, { resNo, resThumb });
