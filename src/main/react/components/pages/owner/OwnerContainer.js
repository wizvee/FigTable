import React from 'react';
import HeaderOwner from './HeaderOwner';
import OwnerInfo from './OwnerInfo';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerMenu from './OwnerMenu';

const div = styled.div`
  height: auto;
`;
const Container = styled.div`
  padding-top: 80px;

  height: auto;
  background: #f1f3f5;
`;

const ContentWrapper = styled(Responsive)`
  height: auto;
`;

const RightContent = styled.div`
  border: 1px solid blue;
  display: block;
  padding: 1rem;
  width: 65%;
  height: 500px;
  float: right;

  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
`;

const store = {
  name: '김사장',
  shopName: '페더커피 ',
  imgUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/528686_1563717610211710.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80',
};

const OwnerContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContentWrapper>
          <OwnerInfo store={store} />
          <RightContent>
            <OwnerMenu />
          </RightContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerContainer;
