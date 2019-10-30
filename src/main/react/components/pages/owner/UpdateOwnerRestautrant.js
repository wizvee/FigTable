import React from 'react';
import HeaderOwner from './HeaderOwner';
import OwnerInfo from './OwnerInfo';
import OwnerLeftMenu from './OwnerLeftMenu';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerDetailTitle from './OwnerDetailTitle';

const Container = styled.div`
  padding-top: 80px;
  height: 1300px;
  background: #f1f3f5;
`;

const ContainerWrapper = styled(Responsive)`
  height: 100%;
`;

const Right = styled.div`
  display: inline-block;
  padding: 1rem;
  width: 65%;
  height: 100%;
  /* float: right; */
  border: 1px solid red;

  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
`;

////////// 임시데이터//////////////////////////
const store = {
  name: '김사장',
  shopName: '페더커피 ',
  imgUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/528686_1563717610211710.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80',
  foodKeyword: '당근케이크,카페',
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
};
/////////////////////////////////////////////////////

const UpdateOwnerRestautrant = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContainerWrapper>
          <OwnerInfo store={store} />
          <OwnerLeftMenu select="2" />
          <Right>
            <OwnerDetailTitle title="가게정보 수정" />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default UpdateOwnerRestautrant;
