import client from './client';

// get likes-list
export const getLikes = memNo =>
  client.get(`/figtable/api/member/likes/?memNo=${memNo}`);

// likes restaurant
export const likesRes = ({ memNo, resNo }) =>
  client.post('/figtable/api/member/like', {
    memNo,
    resNo,
  });

// unlikes restaurant
export const unlikesRes = ({ memNo, resNo }) =>
  client.patch('/figtable/api/member/like', {
    memNo,
    resNo,
  });
