import client, { path } from './client';

// check member info
export const check = memNo => client.post(`${path}/api/member/${memNo}`);

// get likes-list
export const getLikes = memNo =>
  client.get(`${path}/api/member/likes/?memNo=${memNo}`);

// likes restaurant
export const likesRes = ({ memNo, resNo }) =>
  client.post(`${path}/api/member/like`, {
    memNo,
    resNo,
  });

// unlikes restaurant
export const unlikesRes = ({ memNo, resNo }) =>
  client.patch(`${path}/api/member/like`, {
    memNo,
    resNo,
  });

// get loves-list
export const getLoves = memNo =>
  client.get(`${path}/api/member/loves/?memNo=${memNo}`);

// loves review
export const lovesRv = ({ memNo, rvNo }) =>
  client.post(`${path}/api/member/love`, { memNo, rvNo });

// unloves review
export const unlovesRv = ({ memNo, rvNo }) =>
  client.patch(`${path}/api/member/love`, { memNo, rvNo });

// waiting 줄서기
export const waiting = ({ memNo, memName, memPhone, resNo, people }) =>
  client.post(`${path}/api/member/waiting`, {
    memNo,
    memName,
    memPhone,
    resNo,
    people,
  });

// waiting 줄서기 취소
export const unWaiting = () => client.delete(`${path}/api/member/waiting`);
