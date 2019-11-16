import client, { path } from './client';

// 지역으로 레스토랑 정보 얻기
export const getByLocal = local =>
  client.get(`${path}/api/restaurants/?local=${local}`);

// 검색 키워드로 레스토랑 정보 얻기
export const getByKeyword = keyword =>
  client.get(`${path}/api/restaurantsk/?keyword=${keyword}`);

// 레스토랑 번호로 레스토랑 정보 얻기
export const getById = resNo => client.get(`${path}/api/restaurants/${resNo}`);
