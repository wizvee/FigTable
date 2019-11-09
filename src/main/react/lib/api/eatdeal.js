import client from './client';

// eatdeal 리스트 모두 조회하기 
export const getEatdeals = () =>
  client.get(`/figtable/api/eatdeals`);
