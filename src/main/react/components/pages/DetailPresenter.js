import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3, FiMapPin, FiPhone } from 'react-icons/fi';
import Review from './Review';

const Container = styled(Responsive)`
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  background: blue;
  width: 100%;
  height: 21.25rem;
`;

const InfoWrapper = styled.div`
  /* background: red; */
  padding: 0 0.5rem;
  width: 100%;
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const Title = styled.div`
  font-size: 1.7rem;
`;

const Rating = styled.span`
  flex: 1;
  align-self: flex-end;
  padding-left: 0.7rem;
  font-size: 1.5rem;
  color: ${palette.primary};
`;

const Icon = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  color: ${palette.textGray};
  transform: translateY(7px);
  cursor: pointer;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    font-size: 1.8rem;
  }
  span {
    font-size: 0.8rem;
  }
`;

const Location = styled.span`
  color: ${palette.textGray};
`;

const InfoDetail = styled.div`
  color: ${palette.textGray};
  font-size: 0.9rem;
  svg {
    margin-right: 5px;
  }
  span + span {
    margin-left: 0.85rem;
  }
`;

const InfoBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 1rem;
  margin: 1.5rem 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoData = styled.div`
  padding: 1rem 0;
  border-top: 1px solid ${palette.borderGray};
  border-bottom: 1px solid ${palette.borderGray};
  div {
    display: flex;
    align-items: center;
    height: 1.9rem;
    font-size: 0.95rem;
    svg {
      margin-right: 5px;
      transform: translateY(1px);
    }
  }
`;

const InfoMap = styled.div`
  width: 400px;
  height: 300px;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
  }
  div {
    width: 400px !important;
    height: 300px !important;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ReviewsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0;
`;

const ReviewTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const CtgItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.selected {
    color: ${palette.primary};
  }
`;

const Divider = styled.span`
  margin: 8px;
  /* width: 100%; */
`;

const sample = [
  {
    id: 1,
    title: '달콩카페',
    location: '성균관대역 118m',
    addr: '경기 수원시 장안구 서부로2181번길 9',
    tel: '031-271-2880',
    category: '카페',
    views: 5449,
    rating: 4.3,
    likes: 1900,
    reviews: [
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
    ],
  },
];

const DetailPresenter = () => {
  // DB구현 전 sample
  const {
    title,
    rating,
    location,
    views,
    reviews,
    likes,
    addr,
    tel,
  } = sample[0];

  const [selectCtg, setSelectCtg] = useState(null);

  const goodReviews = reviews.filter(r => r.rating === 'good');
  const nomalReviews = reviews.filter(r => r.rating === 'nomal');
  const badReviews = reviews.filter(r => r.rating === 'bad');

  return (
    <Container>
      <ImageWrapper>이미지</ImageWrapper>
      <InfoWrapper>
        <InfoHeader>
          <Title>{title}</Title>
          <Rating>{rating}</Rating>
          <Icon>
            <FiEdit3 />
            <span>리뷰쓰기</span>
          </Icon>
          <Icon>
            <FiStar />
            <span>가고싶다</span>
          </Icon>
        </InfoHeader>
        <Location>{location}</Location>
        <InfoDetail>
          <span>
            <FiEye />
            {views}
          </span>
          <span>
            <FiEdit3 />
            {reviews.length}
          </span>
          <span>
            <FiStar />
            {likes}
          </span>
        </InfoDetail>
        <InfoBody>
          <InfoData>
            <div>
              <FiMapPin />
              {addr}
            </div>
            <div>
              <FiPhone />
              {tel}
            </div>
            <div>메뉴</div>
          </InfoData>
          <InfoMap>
            <div id=""/>
          </InfoMap>
        </InfoBody>
        <ReviewsWrapper>
          <ReviewTitle>리뷰({reviews.length})</ReviewTitle>
          <CtgItem
            className={selectCtg === null && 'selected'}
            onClick={() => setSelectCtg(null)}
          >
            전체({reviews.length})
          </CtgItem>
          <Divider>|</Divider>
          <CtgItem
            className={selectCtg === 'good' && 'selected'}
            onClick={() => setSelectCtg('good')}
          >
            맛있({goodReviews.length})
          </CtgItem>
          <Divider>|</Divider>
          <CtgItem
            className={selectCtg === 'nomal' && 'selected'}
            onClick={() => setSelectCtg('nomal')}
          >
            괜찮({nomalReviews.length})
          </CtgItem>
          <Divider>|</Divider>
          <CtgItem
            className={selectCtg === 'bad' && 'selected'}
            onClick={() => setSelectCtg('bad')}
          >
            별로({badReviews.length})
          </CtgItem>
        </ReviewsWrapper>
        {selectCtg === null &&
          reviews.map(r => <Review key={r.userId} review={r} />)}
        {selectCtg === 'good' &&
          goodReviews.map(r => <Review key={r.userId} review={r} />)}
        {selectCtg === 'nomal' &&
          nomalReviews.map(r => <Review key={r.userId} review={r} />)}
        {selectCtg === 'bad' &&
          badReviews.map(r => <Review key={r.userId} review={r} />)}
      </InfoWrapper>
    </Container>
  );
};

export default DetailPresenter;
