import client from './client';

// 개수만큼 eatdeal 리스트 모두 조회하기
export const getEatdeals = () =>
client.get(`/figtable/api/eatdeals`);

//잇딜 상세페이지 가져오기
export const getByEatNo = eatNo =>
client.get(`/figtable/api/eatdeals/${eatNo}`);

//결제페이지 포인트 가져오기
export const getMemberPoint= memNo =>
  client.get(`/figtable/api/payment/point/?memNo=${memNo}`);