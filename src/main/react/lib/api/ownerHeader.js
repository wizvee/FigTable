import client from './client';

export const getOwnerHeader = ownNo =>
  client.get(`/figtable/api/ownerInfo/${ownNo}`);
