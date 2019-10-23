import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3, FiMapPin, FiPhone } from 'react-icons/fi';

const ImageWrapper = styled.div`
  background: red;
  width: 100%;
  height: 21.25rem;
`;

const InfoWrapper = styled.div`
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DetailPresenter = ({ info, reviewCnt }) => {
  console.log(info);
  const { title, location, addr, tel, views, rating, likes, mapData } = info;

  // 구글 맵 참조
  const googleMapRef = useRef(null);

  // 구글 맵 생성
  function createGoogleMap() {
    return new google.maps.Map(googleMapRef.current, {
      zoom: 16,
      center: mapData,
      disableDefaultUI: true,
    });
  }

  // 맵 마커 생성
  function createMarker() {
    return new google.maps.Marker({
      position: mapData,
    });
  }

  useEffect(() => {
    const googleScript = document.createElement('script');
    googleScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCKi8T8JWKVOvFwgJGEf61hwpDcFSOBYyI';
    window.document.body.appendChild(googleScript);

    googleScript.addEventListener('load', () => {
      let map = createGoogleMap();
      let marker = createMarker();
      marker.setMap(map);
    });
  }, []);

  return (
    <>
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
            {reviewCnt}
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
          <InfoMap ref={googleMapRef} />
        </InfoBody>
      </InfoWrapper>
    </>
  );
};

export default DetailPresenter;
