import client from './client';

// 지역으로 레스토랑 정보 얻기
export const getByLocal = local =>
  client.get(`/figtable/api/restaurants/?local=${local}`);

// 레스토랑 리스트를 최신 데이터로 업데이트하기
export const getByList = resList =>
  client.post('/figtable/api/restaurant-list', resList);

// 레스토랑 번호로 레스토랑 정보 얻기
export const getById = resNo =>
  client.get(`/figtable/api/restaurants/${resNo}`);
