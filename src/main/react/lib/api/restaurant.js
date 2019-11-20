import client, { path } from './client';

// 지역으로 레스토랑 정보 얻기
export const getByLocal = position =>
  client.post(`${path}/api/restaurants`, position);

// 검색 키워드로 레스토랑 정보 얻기
export const getByKeyword = keyword =>
  client.post(`${path}/api/restaurantsk/`, keyword);

// 레스토랑 번호로 레스토랑 정보 얻기
export const getById = resNo => client.get(`${path}/api/restaurants/${resNo}`);
