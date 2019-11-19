import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import { closeRes } from '../../../../modules/adminInsertRes';
import ResModal from './ResModal';
import ConfirmModal from './confirmModal';
import styled from 'styled-components';
import '../TableStyle.css';

const TableWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ErrorBlock = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: red;
  font-size: 1.3rem;
`;

const NoneData = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: #868e96;
  font-size: 1.3em;
`;

const CloseRestaurantList = ({ restaurants, loading, error, keyword }) => {
  const dispatch = useDispatch();

  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  const restaurant =
    keyword != ''
      ? restaurants.filter(s => s.resName.includes(keyword))
      : restaurants;

  const [modal, setIsModal] = useState(false);
  const [res, setRes] = useState(null);
  const [target, setTarget] = useState('');
  const [confirm, setConfirm] = useState(false);

  //모달 키는 function
  const onClickOpenModal = res => {
    setRes(res);
    setTarget(res.resNo);
    setIsModal(true);
  };

  //모달 닫는 function
  const onSubmit = useCallback(async () => {
    setIsModal(false);
    setConfirm(true);
    await client
      .post(`${path}/api/adminCloseRes/${target}`)
      .then(() => dispatch(closeRes(target)));
  }, [target]);

  const onCancel = () => {
    setIsModal(false);
  };

  const onCloseModal = () => {
    setConfirm(false);
  };

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>매장명</th>
              <th>매장주소</th>
              <th>음식키워드</th>
              <th>지역키워드</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {modal && (
              <ResModal
                restaurant={res}
                onCancel={onCancel}
                onSubmit={onSubmit}
              />
            )}
            {!loading &&
              restaurants &&
              restaurant.map((row, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => onClickOpenModal(row)}
                    className="resTr"
                  >
                    <td key={`${index}+name`}>{row.resName}</td>
                    <td key={`${index}+addr`}>{row.resAddress}</td>
                    <td key={`${index}+locationKey`}>{row.resFoodKeyword}</td>
                    <td key={`${index}+foodKey`}>{row.resLocationKeyword}</td>
                    <td key={`${index}+tel`}>{row.resTel}</td>
                  </tr>
                );
              })}
            {confirm && (
              <ConfirmModal
                msg="정상적으로 처리되었습니다."
                onCloseModal={onCloseModal}
              />
            )}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default CloseRestaurantList;
