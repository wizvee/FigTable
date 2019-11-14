import client, { path } from './client';

export const insertRes = ({
  resName,
  resAddress,
  resTel,
  ownName,
  resLocationKeyword,
  resFoodKeyword,
  resOpenDay,
  resCloseTime,
  resThumb,
}) =>
  client.post(`${path}/api/insertRes`, {
    resName,
    resAddress,
    resTel,
    ownName,
    resLocationKeyword,
    resFoodKeyword,
    resOpenDay,
    resCloseTime,
    resThumb,
  });