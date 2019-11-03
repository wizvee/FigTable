import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import SearchTemplate from './SearchTemplate';
import OwnersList from './OwnersList';
import './TableStyle.css';

const TitleWrapper = styled.div`
  margin-top: 1rem;
  height: 3rem;
  text-align: center;
`;

const BodyHeight = styled.div`
  height: 503px;
`;

const Search = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const TableWrapper = styled.div`
  margin-bottom: 1rem;
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
];

const ApplyOwnerContainer = () => {
  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <TitleWrapper>
          <h3>사장님 신청 내역</h3>
        </TitleWrapper>
        <Search>
          <SearchTemplate owners={owners} />
        </Search>
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
              <OwnersList owners={owners} />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default ApplyOwnerContainer;
