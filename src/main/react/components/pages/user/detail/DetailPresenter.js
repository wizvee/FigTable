import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3 } from 'react-icons/fi';
import GoogleMap from './GoogleMap';
import WaitingPresenter from './WaitingPresenter';
import RestaurantInfo from './RestaurantInfo';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 21.25rem;
  div + div {
    margin-left: 10px;
  }
`;

const ImgBlock = styled.div`
  flex: 1;
  height: 100%;
  background: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.5;
  }
`;

const InfoWrapper = styled.div`
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
  padding-left: 0.3rem;
  font-size: 1.5rem;
  color: ${palette.primary};
  transform: translateY(-5px);
`;

const Icon = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  color: ${palette.textGray};
  transform: translateY(7px);
  transition: color 0.5s linear;
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
    margin-right: 4px;
    transform: translateY(1px);
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

const DetailPresenter = ({ info, error, loading, openInsta }) => {
  if (error) {
    return null;
  }
  if (loading || !info) return null;
  const {
    resName,
    resLocationKeyword,
    resLat,
    resLong,
    resViews,
    resRating,
    resReviews,
    resLikes,
    resWaiting,
    resWaitCnt,
  } = info;
  // 리뷰의 이미지url만 따온 배열 생성
  // const images = imgReviews.flatMap(review => review.images).slice(-3);

  return (
    <>
      <ImageWrapper>
        {/* {images.map((img, index) => (
          <ImgBlock key={index} url={img} onClick={() => openInsta(img)} />
        ))} */}
      </ImageWrapper>
      <InfoWrapper>
        <InfoHeader>
          <Title>{resName}</Title>
          <Rating>{resRating.toFixed(1)}</Rating>
          <Icon>
            <FiEdit3 />
            <span>리뷰쓰기</span>
          </Icon>
          <Icon>
            <FiStar />
            <span>가고싶다</span>
          </Icon>
        </InfoHeader>
        <Location>{resLocationKeyword}</Location>
        <InfoDetail>
          <span>
            <FiEye />
            {resViews}
          </span>
          <span>
            <FiEdit3 />
            {resReviews}
          </span>
          <span>
            <FiStar />
            {resLikes}
          </span>
        </InfoDetail>
        {resWaiting && <WaitingPresenter resWaitCnt={resWaitCnt} />}
        <InfoBody>
          <RestaurantInfo info={info} />
          <GoogleMap lat={resLat} lng={resLong} />
        </InfoBody>
      </InfoWrapper>
    </>
  );
};

export default DetailPresenter;