import client from './client';

// register
export const register = ({ memEmail, memPassword, memPhone, memName }) =>
  client.post('/figtable/api/auth/register', {
    memEmail,
    memPassword,
    memPhone,
    memName,
  });

// login
export const login = ({ memEmail, memPassword }) =>
  client.post('/figtable/api/auth/login', {
    memEmail,
    memPassword,
  });

// login check
export const check = () => client.get('/figtable/api/auth/check');
