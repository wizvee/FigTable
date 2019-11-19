import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import { applyRes } from '../../../../modules/adminInsertRes';
import ApplyResModal from './ApplyResModal';
import ConfirmModal from './confirmModal';
import styled from 'styled-components';
import '../TableStyle.css';

const TableWrapper = styled.div`
  margin-top: 2.7rem;
  margin-bottom: 2rem;
  min-height: 490px;
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

const ApplyRestaurantList = ({ restaurants, loading, error }) => {
  const dispatch = useDispatch();

  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  if (restaurants == null || restaurants == '') {
    return <NoneData>신청내역이 존재하지 않습니다.</NoneData>;
  }

  const [modal, setIsModal] = useState(false);
  const [res, setRes] = useState(null);
  const [target, setTarget] = useState('');
  const [confirm, setConfirm] = useState(false);

  //모달 키는 function
  const onOpenModal = res => {
    setRes(res);
    setTarget(res.resNo);
    setIsModal(true);
  };

  const onCloseModal = () => {
    setConfirm(false);
  };

  //모달 닫는 function
  const onCancel = () => {
    setIsModal(false);
  };

  const onSubmit = useCallback(async () => {
    setIsModal(false);
    setConfirm(true);
    await client
      .post(`${path}/api/adminApplyRes/${target}`)
      .then(() => dispatch(applyRes(target)));
  }, [target]);

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>매장명</th>
              <th>매장주소</th>
              <th>전화번호</th>
              <th>대표자</th>
            </tr>
          </thead>
          <tbody>
            {modal && (
              <ApplyResModal
                restaurant={res}
                onCancel={onCancel}
                onSubmit={onSubmit}
              />
            )}
            {!loading &&
              restaurants &&
              restaurants.map((row, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => onOpenModal(row)}
                    className="resTr"
                  >
                    <td key={`${index}+name`}>{row.resName}</td>
                    <td key={`${index}+addr`}>{row.resAddress}</td>
                    <td key={`${index}+tel`}>{row.resTel}</td>
                    <td key={`${index}+own`}>{row.resLocationKeyword}</td>
                  </tr>
                );
              })}
            {confirm && (
              <ConfirmModal msg="승인되었습니다." onCloseModal={onCloseModal} />
            )}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default ApplyRestaurantList;
