import client, { path } from './client';

// 레스토랑 번호로 해당 레스토랑에 해당하는 리뷰 얻기
export const getByResNo = resNo => client.get(`${path}/api/reviews/${resNo}`);

// review 등록
export const writeReview = ({ memNo, resNo, rvRating, rvContent, rvImages }) =>
  client.post(`${path}/api/review`, {
    memNo,
    resNo,
    rvRating,
    rvContent,
    rvImages,
  });
