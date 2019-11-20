import client, { path } from './client';

//매장 신청 내역 가져오기
export const getByApply = () => client.get(`${path}/api/adminRestaurnats`);

//등록 완료된 매장리스트 가져오기
export const getResList = () => client.get(`${path}/api/adminResList`);

//매장 폐업
export const closeRes = resNo =>
  client.patch(`${path}/api/adminCloseRes`, resNo);
