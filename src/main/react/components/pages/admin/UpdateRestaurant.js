import React from 'react';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import './TableStyle.css';
import RestaurantList from './RestaurantList';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';

const TitleWrapper = styled.div`
  margin-top: 1rem;
  height: 3rem;
  text-align: center;
`;

const Search = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  width: 30%;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  & + & {
    margin-top: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 5rem;
`;

const TableWrapper = styled.div`
  margin-bottom: 1rem;
`;

const restaurants = [
  {
    id: 1,
    resName: '달콩커피',
    resAddr: '경기도 수원시',
    resTel: '031-000-0000',
    ownName: '알콩달콩',
  },
  {
    id: 2,
    resName: '달콩커피',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '김사장',
  },
  {
    id: 3,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '이사장',
  },
  {
    id: 4,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    ownName: '박사장',
  },
];

const UpdateRestaurant = () => {
  return (
    <>
      <AdminHeader />
      <TitleWrapper>
        <h3>매장 신청 내역</h3>
      </TitleWrapper>

      <div>
        <Search>
          <StyledInput type="text" placeholder="검색어 입력" />
          <StyledButton onClick="">검색</StyledButton>
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
      </div>
    </>
  );
};

export default UpdateRestaurant;
