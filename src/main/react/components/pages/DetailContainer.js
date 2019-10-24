import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import DetailPresenter from './DetailPresenter';
import ReviewPresenter from './ReviewPresenter';
import InstaViewer from './InstaViewer';

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
    id: 1,
    userId: 'user1',
    nickname: 'aluetn',
    profile: 'default.png',
    rvCnt: 3,
    flCnt: 1,
    rating: 'good',
    date: '2019-10-06',
    comment: '고풍스러운 인테리어, 넓은 공간, 맛있는 앙버터!',
    images: [
      'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190623074633_photo1_a8KtahP0JSRT.jpg',
    ],
  },
  {
    id: 2,
    userId: 'user2',
    nickname: '도레미파',
    profile: 'default.png',
    rvCnt: 1,
    flCnt: 0,
    rating: 'nomal',
    date: '2019-10-16',
    comment: '고풍스러운 인테리어, 넓은 공간, 맛있는 앙버터!',
    images: [
      'https://mp-seoul-image-production-s3.mangoplate.com/28773_1567228847394998.jpg',
      'https://mp-seoul-image-production-s3.mangoplate.com/28773_1567228915631640.jpg',
      'https://mp-seoul-image-production-s3.mangoplate.com/28773_1567228916795993.jpg',
      'https://mp-seoul-image-production-s3.mangoplate.com/28773_1567228917602325.jpg',
    ],
  },
];

const Container = styled(Responsive)`
  margin-bottom: 2rem;
`;

const DetailContainer = () => {
  // 이미지 있는 리뷰 필터
  const imgReviews = restaurantReviews.filter(review => review.images);

  // 리뷰 인스타모드로 보기 state
  const [viewInsta, setViewInsta] = useState({
    selectImage: null,
    isView: false,
  });

  // 인스타모드 열고 닫기
  function openInsta(selectImage) {
    setViewInsta({ selectImage, isView: true });
  }
  function closeInsta() {
    setViewInsta({ ...viewInsta, isView: false });
  }

  return (
    <>
      <InstaViewer
        title={restaurantInfo.title}
        reviews={imgReviews}
        viewInsta={viewInsta}
        openInsta={openInsta}
        closeInsta={closeInsta}
      />
      <Container>
        <DetailPresenter
          info={restaurantInfo}
          imgReviews={imgReviews}
          totalReviews={restaurantReviews.length}
          openInsta={openInsta}
        />
        <ReviewPresenter reviews={restaurantReviews} openInsta={openInsta} />
      </Container>
    </>
  );
};

export default DetailContainer;
