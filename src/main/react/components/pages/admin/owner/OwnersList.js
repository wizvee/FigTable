import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import OwnerModal from './OwnerModal';
import { applyOwner } from '../../../../modules/adminOwners';
import ConfirmModal from '../restaurant/confirmModal';
import styled from 'styled-components';
import '../TableStyle.css';

const TableWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

const ErrorBlock = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: red;
  font-size: 1.3rem;
`;

const OwnersList = ({ owners, keyword, error, loading }) => {
  const dispatch = useDispatch();

  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  const owner =
    keyword != '' ? owners.filter(o => o.ownName.includes(keyword)) : owners;

  //디테일 확인 모달
  const [modal, setIsModal] = useState(false);
  const [own, setOwn] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [ownerNo, setOwnerNo] = useState('');
  const [ownerReturn, setOwnerReturn] = useState('');
  const [restNo, setRestNo] = useState('');
  const [ownerApply, setOwnerApply] = useState('');

  const { adminOwner, adminOwnerError } = useSelector(({ adminOwners }) => ({
    adminOwner: adminOwners.adminOwner,
    adminOwnerError: adminOwners.error,
  }));

  //반려사유 변경
  const onChange = useCallback(({ target }) => {
    setOwnerReturn(target.value);
  }, []);

  //모달 키는 function
  const onClickOpenModal = own => {
    setOwn(own);
    setIsModal(true);
    setRestNo(own.resNo);
    setOwnerNo(own.ownNo);
    setOwnerApply(own.ownApply);
  };

  //컨펌 모달 닫기
  const onCloseModal = () => {
    setConfirm(false);
    location.reload();
  };

  //반려 버튼 기능
  const onReturn = useCallback(
    async e => {
      e.preventDefault();
      setIsModal(false);
      setConfirm(true);
      await client.post(`${path}/api/adminOwner/return`, {
        restNo,
        ownerNo,
        ownerApply,
        ownerReturn,
      });
    },
    [restNo, ownerNo, ownerApply, ownerReturn],
  );

  const onSubmit = e => {
    e.preventDefault();
    dispatch(applyOwner(own));
    setIsModal(false);
    setConfirm(true);
  };

  //등록 성공 & 실패시
  useEffect(() => {
    if (adminOwnerError) {
      console.log('오류 : ' + error);
    }
    if (own > 0) {
      setIsModal(true);
    }
  }, [own, adminOwnerError, dispatch]);

  if (owner === '') {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="4" className="resNullTd">
            신청내역이 존재하지 않습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
    );
  }

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>매장명</th>
              <th>매장주소</th>
              <th>대표자</th>
              <th>전화번호</th>
              <th>이메일</th>
            </tr>
          </thead>
          <tbody>
            {modal && (
              <OwnerModal
                owner={own}
                onReturn={onReturn}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            )}

            {!loading &&
              owners &&
              owner.map((row, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => onClickOpenModal(row)}
                    className="resTr"
                  >
                    <td key={`${index}+ownResName`}>{row.resName}</td>
                    <td key={`${index}+ownResAddr`}>{row.resAddress}</td>
                    <td key={`${index}+ownerName`}>{row.ownName}</td>
                    <td key={`${index}+ownerPhone`}>{row.ownPhone}</td>
                    <td key={`${index}+ownerEmail`}>{row.ownEmail}</td>
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

export default withRouter(OwnersList);
