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

// review 삭제
export const deleteReview = ({ rvNo, memNo }) =>
  client.patch(`${path}/api/review`, { rvNo, memNo });

// 코멘트 등록
export const writeComment = ({ rvNoRef, memNo, rvcContent }) =>
  client.post(`${path}/api/comment`, { rvNoRef, memNo, rvcContent });

// 코멘트 삭제
export const deleteComment = ({ rvNo, rvcNo }) =>
  client.patch(`${path}/api/comment`, { rvNo, rvcNo });

// 내가 쓴 리뷰 얻기
export const getMyReviews = () => client.post(`${path}/api/member/reviews`);

// 피드 얻기
export const getMyFeed = () => client.post(`${path}/api/member/feed`);
