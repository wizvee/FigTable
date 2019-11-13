import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { TiStarFullOutline } from 'react-icons/ti';
import { MdRemoveRedEye, MdCreate } from 'react-icons/md';
import GoogleMap from './GoogleMap';
import WaitingPresenter from './WaitingPresenter';
import RestaurantInfo from './RestaurantInfo';
import ActionButtons from './ActionButtons';
import Loader from '../../../common/Loader';

const FullHeight = styled.div`
  width: 100%;
  height: calc(100vh - 12rem);
`;

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
  padding-left: 0.5rem;
  font-size: 1.5rem;
  color: ${palette.primary};
  transform: translateY(-5px);
`;

const Location = styled.span`
  color: ${palette.textGray};
`;

const InfoDetail = styled.div`
  margin-top: 0.3rem;
  color: ${palette.textGray};
  font-size: 0.9rem;
  svg {
    margin-right: 2px;
    transform: translateY(2px);
  }
  span + span {
    margin-left: 0.4rem;
  }
`;

const InfoBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 1rem;
  margin: 1.3rem 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailPresenter = ({ info, error, loading, imgReviews, openInsta }) => {
  if (error) return null;
  if (loading || !info || !imgReviews)
    return (
      <FullHeight>
        <Loader />
      </FullHeight>
    );

  const {
    resNo,
    resThumb,
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
  const [likesCount, setLikesCount] = useState(resLikes);
  // 리뷰의 이미지url만 따온 배열 생성
  const images = imgReviews.flatMap(review => review.rvImages).slice(-3);

  return (
    <>
      <ImageWrapper>
        {images.length == 0 ? (
          <ImgBlock url={resThumb} />
        ) : (
          images.map((img, index) => (
            <ImgBlock key={index} url={img} onClick={() => openInsta(img)} />
          ))
        )}
      </ImageWrapper>
      <InfoWrapper>
        <InfoHeader>
          <Title>{resName}</Title>
          <Rating>
            {isNaN(resRating / resReviews)
              ? '0.0'
              : (resRating / resReviews).toFixed(1)}
          </Rating>
          <ActionButtons
            resNo={resNo}
            likesCount={likesCount}
            setLikesCount={setLikesCount}
          />
        </InfoHeader>
        <Location>{resLocationKeyword}</Location>
        <InfoDetail>
          <span>
            <MdRemoveRedEye />
            {resViews}
          </span>
          <span>
            <MdCreate />
            {resReviews}
          </span>
          <span>
            <TiStarFullOutline />
            {likesCount}
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

export default React.memo(DetailPresenter);
