import client, { path } from './client';

// 지역으로 레스토랑 정보 얻기
export const getByLocal = local =>
  client.get(`${path}/api/restaurants/?local=${local}`);

// 레스토랑 번호로 레스토랑 정보 얻기
export const getById = resNo => client.get(`${path}/api/restaurants/${resNo}`);
