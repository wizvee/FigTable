import client, { path } from './client';

export const searchRes = keyword =>
  client.get(`${path}/api/ownerEnroll/seach/?keyword=${keyword}`);
