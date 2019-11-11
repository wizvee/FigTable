import client from './client';

// 개수만큼 eatdeal 리스트 모두 조회하기
export const getEatdeals = () =>
client.get(`/figtable/api/eatdeals`);

export const getByEatNo = eatNo =>
client.get(`/figtable/api/eatdeals/${eatNo}`);