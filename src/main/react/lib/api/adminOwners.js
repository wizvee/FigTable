import client, { path } from './client';

export const getByApply = () => client.get(`${path}/api/adminOwners`);

export const applyOwner = ({ ownNo, resNo }) =>
  client.post(`${path}/api/adminApplyOwner/apply`, { ownNo, resNo });
