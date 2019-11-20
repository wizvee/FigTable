import client, { path } from './client';

export const register = ({ wtName, resNo, wtPeople, wtPhone }) =>
  client.post(`${path}/api/owner/wtRegister`, {
    wtName,
    resNo,
    wtPeople,
    wtPhone,
  });
