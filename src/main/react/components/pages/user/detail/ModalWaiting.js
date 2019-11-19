import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import client from '../../../../lib/api/client';
import { setPosition } from '../../../../modules/guest';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1.5rem;
  width: 310px;
  height: 270px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  h3 {
    margin: 0;
  }
  small {
    color: ${palette.textGray};
    margin-bottom: 1.7rem;
  }
  .waited {
    font-size: 0.9rem;
    text-align: right;
    margin-right: 0.5rem;
  }
`;

const SetPeople = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  width: 100%;
  svg {
    margin: 0 0.4rem;
    color: ${palette.textGray};
    transform: translateY(3px);
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: auto;
  padding: 0.5rem;
`;

const ErrorMsg = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const AlertBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fa5252;
`;

const ModalWaiting = ({ onModal }) => {
  const dispatch = useDispatch();
  const { position, member, restaurant } = useSelector(
    ({ guest, member, restaurant }) => ({
      position: guest.position,
      member: member.member,
      restaurant: restaurant.restaurant,
    }),
  );

  const [people, setPeople] = useState(0);
  const [error, setError] = useState('');

  const onIncrease = useCallback(() => {
    setPeople(people + 1);
    if (error) setError('');
  }, [people, error]);
  const onDecrease = useCallback(() => {
    setPeople(people - 1);
    if (error) setError('');
  }, [people, error]);

  const onSubmit = useCallback(async () => {
    if (people == 0) {
      setError('0명은 줄을 설 수 없어요! 😥');
      return;
    }
    if (
      calDistance(
        position.lat,
        position.lon,
        restaurant.resLat,
        restaurant.resLong,
      ) > 3
    ) {
      setError('너무 먼 맛집이에요! 😱');
      return;
    }
  });

  function calDistance(lat1, lon1, lat2, lon2) {
    const theta = lon1 - lon2;
    let dist =
      Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);

    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // 단위 mile 에서 km 변환.

    return Math.floor(dist);
  }

  // 주어진 도(degree) 값을 라디언으로 변환
  function deg2rad(deg) {
    return (deg * Math.PI) / 180;
  }

  // 주어진 라디언(radian) 값을 도(degree) 값으로 변환
  function rad2deg(rad) {
    return (rad * 180) / Math.PI;
  }

  const API = 'https://maps.googleapis.com/maps/api/geocode/json';
  const KEY = process.env.GOOGLE_APIKEY;
  const getPosition = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          await client
            .get(`${API}?latlng=${latitude},${longitude}&key=${KEY}`)
            .then(
              ({
                data: {
                  results: [
                    {
                      address_components: [
                        ,
                        ,
                        { long_name: name },
                        { long_name: searchKey },
                      ],
                    },
                  ],
                },
              }) => {
                dispatch(
                  setPosition({
                    lat: latitude,
                    lon: longitude,
                    name,
                    searchKey,
                  }),
                );
              },
            );
        },
      );
    }
  }, []);

  useEffect(() => {
    if (!position) getPosition();
  }, []);

  return (
    <>
      <Overlay onClick={onModal} />
      <Container>
        <h3>원격 줄서기</h3>
        <small>3km 이내에 있는 매장만 대기가 가능합니다.</small>
        <div className="waited">현재 0팀 대기</div>
        {position ? (
          <>
            <SetPeople>
              <span>인원 👨‍👩‍👧‍👦</span>
              <div>
                <MdRemoveCircleOutline onClick={onDecrease} />
                <span>{people}</span>
                <MdAddCircleOutline onClick={onIncrease} />
              </div>
            </SetPeople>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <ButtonWithMarginTop onClick={onSubmit} fullwidth>
              줄서기
            </ButtonWithMarginTop>
          </>
        ) : (
          <>
            <AlertBlock>
              위치 정보가 없어 원격 줄서기를 할 수 없어요! 😱
            </AlertBlock>
            <ButtonWithMarginTop onClick={onModal} fullwidth>
              닫기
            </ButtonWithMarginTop>
          </>
        )}
      </Container>
    </>
  );
};

export default React.memo(ModalWaiting);
