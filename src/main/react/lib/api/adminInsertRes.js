import client from './client';

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
  client.post('/figtable/api/insertRes', {
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
