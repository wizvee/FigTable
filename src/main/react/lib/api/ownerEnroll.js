import client, { path } from './client';

export const searchRes = keyword =>
  client.get(`${path}/api/ownerEnroll/seach/?keyword=${keyword}`);

export const selectRes = resNo =>
  client.get(`${path}/api/ownerEnroll/select/?resNo=${resNo}`);

export const enrollOwn = ({
  ownEmail,
  ownName,
  ownPassword,
  ownPhone,
  ownStatics,
  resNo,
  resName,
  resAddress,
  resTel,
  resLat,
  resLong,
  resLocationKeyword,
  resFoodKeyword,
  resThumb,
  authFile,
}) =>
  client.post(`${path}/api/ownerEnroll/enrollOwn`, {
    ownEmail,
    ownName,
    ownPassword,
    ownPhone,
    ownStatics,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  });

export const login = ({ ownEmail, ownPassword }) =>
  client.post(`${path}/api/ownerLogin`, { ownEmail, ownPassword });

export const addShop = ({
  ownNo,
  resNo,
  resName,
  resAddress,
  resTel,
  resLat,
  resLong,
  resLocationKeyword,
  resFoodKeyword,
  resThumb,
  authFile,
}) =>
  client.post(`${path}/api/owner/addShop`, {
    ownNo,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  });
