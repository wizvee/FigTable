import client, { path } from './client';

// register
export const register = ({ memEmail, memPassword, memPhone, memName }) =>
  client.post(`${path}/api/auth/register`, {
    memEmail,
    memPassword,
    memPhone,
    memName,
  });

// login
export const login = ({ memEmail, memPassword }) =>
  client.post(`${path}/api/auth/login`, {
    memEmail,
    memPassword,
  });
