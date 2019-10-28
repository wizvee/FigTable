import client from './client';

// 레스토랑 번호로 해당 레스토랑에 해당하는 리뷰 얻기
export const getByResNo = resNo => client.get(`/figtable/api/reviews/${resNo}`);
