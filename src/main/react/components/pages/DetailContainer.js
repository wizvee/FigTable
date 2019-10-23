import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import DetailPresenter from './DetailPresenter';
import ReviewPresenter from './ReviewPresenter';

const restaurantInfo = {
  id: 1,
  title: '달콩카페',
  location: '성균관대역 118m',
  addr: '경기 수원시 장안구 서부로2181번길 9',
  tel: '031-271-2880',
  category: '카페',
  views: 5449,
  rating: 4.3,
  likes: 1900,
  mapData: { lat: 37.302869, lng: 126.972336 },
};

const restaurantReviews = [
  {
    userId: 'user1',
    nickname: 'aluetn',
    profile: 'default.png',
    rvCnt: 3,
    flCnt: 1,
    rating: 'good',
    date: '2019-10-06',
    comment: '고풍스러운 인테리어, 넓은 공간, 맛있는 앙버터!',
  },
  {
    userId: 'user2',
    nickname: '도레미파',
    profile: 'default.png',
    rvCnt: 1,
    flCnt: 0,
    rating: 'nomal',
    date: '2019-10-16',
    comment: '고풍스러운 인테리어, 넓은 공간, 맛있는 앙버터!',
  },
];

const Container = styled(Responsive)`
  margin-bottom: 2rem;
`;

const DetailContainer = () => {
  return (
    <Container>
      <DetailPresenter
        info={restaurantInfo}
        reviewCnt={restaurantReviews.length}
      />
      <ReviewPresenter reviews={restaurantReviews} />
    </Container>
  );
};

export default DetailContainer;
