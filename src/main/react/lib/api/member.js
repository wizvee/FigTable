import client from './client';

// check member info
export const check = memNo => client.post(`/figtable/api/member/${memNo}`);

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

// get loves-list
export const getLoves = memNo =>
  client.get(`/figtable/api/member/loves/?memNo=${memNo}`);

// loves review
export const lovesRv = ({ memNo, rvNo }) =>
  client.post('/figtable/api/member/love', { memNo, rvNo });

// unloves review
export const unlovesRv = ({ memNo, rvNo }) =>
  client.patch('/figtable/api/member/love', { memNo, rvNo });
