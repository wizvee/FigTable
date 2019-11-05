import React, { useState, useRef } from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import OwnersList from './owner/OwnersList';
import './TableStyle.css';

const BodyHeight = styled.div`
  height: ${props => (props.bodyHeight > 8 ? 'auto' : '500px')};
  margin: auto;
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 420px;
`;

const owners = [
  {
    ownNo: 1,
    ownName: '김사장',
    ownEmail: 'kim@naver.com',
    ownPassword: '1234',
    ownResName: '스타벅스',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 2,
    ownName: '이사장',
    ownEmail: 'lee@naver.com',
    ownPassword: '1234',
    ownResName: '투썸플레이스',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 3,
    ownName: '박사장',
    ownEmail: 'park@naver.com',
    ownPassword: '1234',
    ownResName: '한방통닭',
    ownResAddress: '서울시 용산구 한남동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 4,
    ownName: '오리',
    ownEmail: 'ooo@naver.com',
    ownPassword: '1234',
    ownResName: '효도치킨',
    ownResAddress: '서울시 강남구 논현동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 5,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '투썸플레이스',
    ownResAddress: '서울시 강남구 논현동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 6,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 7,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 8,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 9,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 10,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
  {
    ownNo: 11,
    ownName: '홍길동',
    ownEmail: 'hong@naver.com',
    ownPassword: '1234',
    ownResName: '역삼갈비',
    ownResAddress: '서울시 강남구 역삼동',
    ownResTel: '02-0000-0000',
  },
];

const ApplyOwnerContainer = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const input = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    setSearchKeyword(input.current.value);
  };

  const onReset = e => {
    e.preventDefault();
    setSearchKeyword('');
    input.current.value = '';
  };

  const [bodyHeight, setBodyHeight] = useState(owners.length);

  return (
    <>
      <AdminHeader />
      <BodyHeight bodyHeight={bodyHeight}>
        <MenuNavi
          subTitle="사장님 신청 내역"
          onSubmit={onSubmit}
          input={input}
          onReset={onReset}
        />

        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>매장명</th>
                <th>매장주소</th>
                <th>대표자</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              <OwnersList
                owners={owners}
                keyword={searchKeyword}
                setBodyHeight={setBodyHeight}
              />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default ApplyOwnerContainer;
