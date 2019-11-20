import React, { useState } from 'react';
import ResModal from './ResModal';
import styled from 'styled-components';
import '../TableStyle.css';

const TableWrapper = styled.div`
  margin-top: 5rem;
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

const RestaurantApplyList = ({ restaurants, loading, error, keyword }) => {
  //에러 발생시
  if (error) {
    return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
  }

  if (restaurants == null || restaurants == '') {
    return <NoneData>신청내역이 존재하지 않습니다.</NoneData>;
  }

  const restaurant =
    keyword != ''
      ? restaurants.filter(s => s.resName.includes(keyword))
      : restaurants;

  const [modal, setIsModal] = useState(false);
  const [res, setRes] = useState(null);

  //모달 키는 function
  const onClickOpenModal = res => {
    setRes(res);
    setIsModal(true);
  };

  //모달 닫는 function
  const onClickCloseModal = () => {
    setIsModal(false);
  };

  const onClcikChangePage = () => {
    setIsModal(false);
  };

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
              <ResModal
                restaurant={res}
                closeModal={onClickCloseModal}
                changePage={onClcikChangePage}
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
                    <td key={`${index}+tel`}>{row.resTel}</td>
                    <td key={`${index}+own`}>{row.resLocationKeyword}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default RestaurantApplyList;
