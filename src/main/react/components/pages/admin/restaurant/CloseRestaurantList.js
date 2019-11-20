import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { closeRes } from '../../../../modules/adminRestaurants';
import ResModal from './ResModal';
import ConfirmModal from './confirmModal';
import styled from 'styled-components';
import '../TableStyle.css';
import Loader from '../../../common/Loader';

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
  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  const dispatch = useDispatch();

  const [modal, setIsModal] = useState(false);
  const [res, setRes] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [target, setTarget] = useState('');

  const restaurant =
    keyword != ''
      ? restaurants.filter(s => s.resName.includes(keyword))
      : restaurants;

  //모달 키는 function
  const onOpenModal = item => {
    setRes(item);
    setTarget(item.resNo);
    setIsModal(true);
  };

  const onSubmit = () => {
    setIsModal(false);
    setConfirm(true);
    dispatch(closeRes({ resNo: res.resNo }));
  };

  //useCallback(() => {
  //   setIsModal(false);
  //   setConfirm(true);
  //   dispatch(closeRes({ resNo: target }));
  // }, []);

  const onCancel = () => {
    console.log(target);
    setIsModal(false);
  };

  const onCloseModal = () => {
    setConfirm(false);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
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
                restaurant.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => onOpenModal(item)}
                      className="resTr"
                    >
                      <td key={`${index}+name`}>{item.resName}</td>
                      <td key={`${index}+addr`}>{item.resAddress}</td>
                      <td key={`${index}+locationKey`}>
                        {item.resFoodKeyword}
                      </td>
                      <td key={`${index}+foodKey`}>
                        {item.resLocationKeyword}
                      </td>
                      <td key={`${index}+tel`}>{item.resTel}</td>
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
      )}
    </>
  );
};

export default CloseRestaurantList;
