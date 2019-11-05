import React, { useState, useRef } from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import './TableStyle.css';
import RestaurantList from './RestaurantList';

const BodyHeight = styled.div`
  height: ${props => (props.bodyHeight > 6 ? 'auto' : '500px')};
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
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
    resName: '바버32',
    resAddr: '인천시 연수구 송도동 22-22',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 6,
    resName: '이치류',
    resAddr: '서울시 마포구 서교동 395-124',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 7,
    resName: '뭄알로이',
    resAddr: '서울시 마포구 상수동 313-6',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 8,
    resName: '폴콘',
    resAddr: '경기도 파주시 월롱면 위전리 435-8',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 9,
    resName: '카페람베리',
    resAddr: '서울시 서초구 방배동 751-1',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 10,
    resName: '야마토텐동',
    resAddr: '서울시 성북구 안암동5가 93-15',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 11,
    resName: '돈까스살롱',
    resAddr: '서울시 종로구 통인동 153',
    resTel: '02-790-6788',
    ownName: '',
  },
  {
    resNo: 12,
    resName: '더티드링크',
    resAddr: '경기도 파주시 문발동 75-6',
    resTel: '031-000-0000',
    ownName: '',
  },
  {
    resNo: 13,
    resName: '레스쁘아뒤이브',
    resAddr: '서울시 강남구 청담동 90-25',
    resTel: '02-517-6034',
    ownName: '',
  },
  {
    resNo: 14,
    resName: '고운님',
    resAddr: '서울시 강남구 대치동 894-5',
    resTel: '02-562-0000',
    ownName: '',
  },
  {
    resNo: 15,
    resName: '정인면옥',
    resAddr: '서울시 영등포구 여의도동 13-1',
    resTel: '02-000-0000',
    ownName: '',
  },
  {
    resNo: 16,
    resName: '붓처스컷',
    resAddr: '서울시 중구 태평로1가 84',
    resTel: '02-318-0000',
    ownName: '',
  },
];

const UpdateRestaurant = () => {
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

  const bodyHeight = restaurants.length;
  return (
    <>
      <AdminHeader />
      <BodyHeight bodyHeight={bodyHeight}>
        <MenuNavi
          subTitle="매장 신청 내역"
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
                <th>전화번호</th>
                <th>대표자</th>
              </tr>
            </thead>
            <tbody>
              <RestaurantList
                keyword={searchKeyword}
                restaurants={restaurants}
              />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default UpdateRestaurant;
