import client, { path } from './client';

export const getReview = () => client.get(`${path}/api/adminReviews`);

//리뷰 삭제, 복구
export const updateReview = rvNo =>
  client.patch(`${path}/api/adminReview`, { rvNo });
