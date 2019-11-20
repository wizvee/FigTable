import client, { path } from './client';
import adminOwners from '../../modules/adminOwners';

export const getByApply = () => client.get(`${path}/api/adminOwners`);

//사장님 승인
export const applyOwner = adminOwner =>
  client.post(`${path}/api/adminOwner/apply`, adminOwner);

//사장님 반려
export const returnOwner = returnOwner =>
  client.post(`${path}/api/adminOwner/return`, returnOwner);
