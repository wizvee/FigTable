import client from './client';

// 레스토랑 번호로 레스토랑 정보 얻기
export const getById = resNo => client.get(`/figtable/api/restaurant/${resNo}`);
