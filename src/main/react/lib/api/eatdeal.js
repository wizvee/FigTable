import client, { path } from './client';

// 개수만큼 eatdeal 리스트 모두 조회하기
export const getEatdeals = () =>
client.get(`${path}//api/eatdeals`);

//잇딜 상세페이지 가져오기
export const getByEatNo = eatNo =>
client.get(`${path}/api/eatdeals/${eatNo}`);

//결제페이지 포인트 가져오기
export const getMemberPoint= memNo =>
  client.get(`${path}/api/payment/point/?memNo=${memNo}`);

//owner페이지에 eatdeal가져오기
export const getByResNo= resNo =>
  client.get(`${path}/api/owner/eatdeal/?resNo=${resNo}`);

//owner eatdeal 구매한 사람 조회
export const getBuy= resNo =>
client.get(`${path}/api/owner/eatdeal/buy/?resNo=${resNo}`);

//owner잇딜 삭제
export const deleteEat= eatNo =>
client.patch(`${path}/api/owner/eatdeal/delete`, eatNo);

//잇딜날짜수정
export const extendEat = ({ eatNo, resNo, eatStartDate, eatEndDate })=>
client.patch(`${path}/api/owner/eatdeal/extend`, {
  eatNo,
  resNo,
	eatStartDate,
	eatEndDate,
});

//owner잇딜 사용확인
export const confirmEat= payNo =>
client.patch(`${path}/api/owner/eatdeal/confirm`, payNo);
