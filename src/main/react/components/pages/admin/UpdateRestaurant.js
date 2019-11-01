import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import './TableStyle.css';
import RestaurantList from './RestaurantList';
import SearchRes from './SearchRes';

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

const restaurants = [
  {
    resNo: 1,
    resName: '달콩커피',
    resAddr: '경기도 수원시',
    resTel: '031-000-0000',
    ownName: '알콩달콩',
  },
  {
    resNo: 2,
    resName: '달콩커피',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '김사장',
  },
  {
    resNo: 3,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '이사장',
  },
  {
    resNo: 4,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '박사장',
  },
  {
    resNo: 5,
    resName: '매니멀스모크하우스',
    resAddr: '서울시 용산구 이태원동 455-33',
    resTel: '02-790-6788',
    ownName: '',
  },
];

const UpdateRestaurant = () => {
  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <TitleWrapper>
          <h3>매장 신청 내역</h3>
        </TitleWrapper>
        <Search>
          <SearchRes restaurants={restaurants} />
        </Search>
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
              <RestaurantList restaurants={restaurants} />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default UpdateRestaurant;
