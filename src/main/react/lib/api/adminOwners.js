import client, { path } from './client';

export const getByApply = () => client.get(`${path}/api/adminOwners`);
