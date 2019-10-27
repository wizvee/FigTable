import client from './client';

// register
export const register = ({
  memEmail,
  memPassword,
  memPhone,
  memName,
  memCode,
}) =>
  client.post('/api/auth/register', {
    memEmail,
    memPassword,
    memPhone,
    memName,
    memCode,
  });

// login
export const login = ({ memEmail, memPassword }) =>
  client.post('/api/auth/login', { memEmail, memPassword });

// login check
export const login = () => client.get('/api/auth/check');