import React, { useState, useEffect, useCallback } from 'react';
import client, { path } from '../../../../lib/api/client';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const TableWrapper = styled.div`
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 490px;
  height: auto;
`;

const Table = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-text-align: center;
`;

const THead = styled.div`
  display: inline-flex;
  font-weight: bold;
  margin: 0.5rem;
  font-size: 1.2rem;
`;

const TheadItem = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  width: 200px;
  text-align: center;
`;

const TD = styled.div`
  border: 1px solid rgba(204, 204, 204, 0.7);
  border-radius: 30px;
  display: inline-flex;
  cursor: pointer;
  font-size: 1.2rem;
  & + & {
    margin-top: 0.5rem;
  }
  &:hover {
    background: rgba(204, 204, 204, 0.4);
  }
`;

const TDItem = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  border: 1px soild blue;
  width: 200px;
  text-align: center;
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

const RestaurantApplyList = ({ qnas, error, loading }) => {
  const dispatch = useDispatch();

  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  if (qnas == null || qnas == '') {
    return <NoneData>신청내역이 존재하지 않습니다.</NoneData>;
  }

  const [modal, setIsModal] = useState(false);
  const [qna, setQna] = useState(null);

  //모달 키는 function
  const onOpenModal = qna => {
    setQna(qna);
    console.log(qna);
    setIsModal(true);
  };

  //모달 닫는 function
  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <TableWrapper>
        <Table>
          <THead>
            <TheadItem>문의자</TheadItem>
            <TheadItem>문의일자</TheadItem>
          </THead>
          {!loading &&
            qnas &&
            qnas.map((qna, index) => {
              return (
                <TD key={index} onClick={() => onOpenModal(qna)}>
                  <TDItem key={`${index}+name`}>{qna.memName}</TDItem>
                  <TDItem key={`${index}+date`}>{qna.qnaDate}</TDItem>
                </TD>
              );
            })}
        </Table>
      </TableWrapper>
    </>
  );
};

export default RestaurantApplyList;
