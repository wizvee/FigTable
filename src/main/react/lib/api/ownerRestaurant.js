import client, { path } from './client';

export const getOwnerRes = resNo => client.get(`${path}/api/owner/${resNo}`);

export const updateThumb = ({ resNo, resThumb }) =>
  client.patch(`${path}/api/ownerThumb`, { resNo, resThumb });

export const updateOpen = ({ resNo, open }) =>
  client.patch(`${path}/api/shopOpen`, { resNo, open });

export const updateRes = ownRestaurant =>
  client.patch(`${path}/api/updateRes`, ownRestaurant);
