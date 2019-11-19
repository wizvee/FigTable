import React, { useEffect } from 'react';
import HeaderOwner from './common/HeaderOwner';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerInfo from './common/OwnerInfo';
import OwnerLeftMenu from './common/OwnerLeftMenu';
import OwnerDetailTitle from './common/OwnerDetailTitle';
import OwnerEatdealForm from './OwnerEatdealForm';
import { useDispatch, useSelector } from 'react-redux';
import { ownerRes } from '../../../modules/ownerRestaurant';
import { ownHeader } from '../../../modules/ownerHeader';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  padding-top: 80px;
  height: auto;
  overflow-y: hidden;
  background: #f1f3f5;

  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const ContainerWrapper = styled(Responsive)`
  height: auto;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }

  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const Right = styled.div`
  padding: 1rem;
  width: 65%;
  height: 100%;
  float: right;
  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;

////////// 임시데이터//////////////////////////
const store = {
  name: '김사장',
  shopName: '페더커피 ',
  imgUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/528686_1563717610211710.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80',
  foodKeyword: '당근케이크,카페',
  addr: '서울특별시 강동구 길동 247',
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
};
/////////////////////////////////////////////////////

const OwnerEatDealContainer = ({ match }) => {
  const { resNo } = match.params;

  const dispatch = useDispatch();
  const {
    restaurant,
    error,
    loading,
    ownerInfo,
    ownError,
    ownLoading,
  } = useSelector(({ ownerRes, ownHeader, loading }) => ({
    restaurant: ownerRes.ownRestaurant,
    error: ownerRes.error,
    loading: loading['owner/OWNER_RES'],
    ownerInfo: ownHeader.ownerInfo,
    ownError: ownHeader.error,
    loading: loading['owner/OWN_HEADER'],
  }));

  useEffect(() => {
    document.body.style.overflow = 'scroll';
    dispatch(ownerRes(resNo));
    //나중에 변경
    dispatch(ownHeader('o22'));
  }, [resNo]);

  return (
    <>
      {!loading && restaurant && (
        <>
          <HeaderOwner ownerInfo={ownerInfo} />
          <Container>
            <ContainerWrapper>
              <OwnerInfo store={restaurant} />
              <OwnerLeftMenu />
              <Right>
                <OwnerDetailTitle title="Eat Deal" />
                <OwnerEatdealForm restaurant={restaurant}/>
              </Right>
            </ContainerWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default withRouter(OwnerEatDealContainer);
