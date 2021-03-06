import client, { path } from './client';

//매장 등록
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

//로그인
export const login = ({ adminEmail, adminPassword }) =>
  client.post(`${path}/api/adminLogin`, { adminEmail, adminPassword });
