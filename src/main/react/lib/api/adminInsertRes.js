import client, { path } from './client';

export const insertRes = ({
  resName,
  resAddress,
  resTel,
  resLocationKeyword,
  resLat,
  resLong,
  resFoodKeyword,
  resThumb,
}) =>
  client.post(`${path}/api/adminInsertRes`, {
    resName,
    resAddress,
    resTel,
    resLocationKeyword,
    resLat,
    resLong,
    resFoodKeyword,
    resThumb,
  });
