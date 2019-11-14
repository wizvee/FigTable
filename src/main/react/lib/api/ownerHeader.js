import client, { path } from './client';

export const getOwnerHeader = ownNo =>
  client.get(`${path}/api/ownerInfo/${ownNo}`);
