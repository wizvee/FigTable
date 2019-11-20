import React, { useCallback, useState } from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import InsertRestaurant from './restaurant/InsertRestaurant';
import ResCategories from './restaurant/ResCategories';
import CloseResContainer from './restaurant/CloseResContainer';
import ApplyResContainer from './restaurant/ApplyResContainer';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 260px;
`;

const Categories = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const ResContainer = () => {
  const [category, setCategory] = useState('insertRes');
  const onSelect = useCallback(category => setCategory(category), []);
  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi subTitle="매장 관리" />
        <Categories>
          <ResCategories category={category} onSelect={onSelect} />
        </Categories>
        {/* 카테고리별로 컴포넌트 불러오기 */}
        {category === 'insertRes' && <InsertRestaurant />}
        {category === 'applyRes' && <ApplyResContainer />}
        {category === 'closeRes' && <CloseResContainer />}
      </BodyHeight>
    </>
  );
};

export default ResContainer;
