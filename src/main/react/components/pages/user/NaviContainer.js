import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import { setPosition } from '../../../modules/guest';
import client from '../../../lib/api/client';
import palette from '../../../lib/styles/Palette';

const Container = styled(Responsive)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  span {
    display: inline-block;
    padding: 0.3rem 0.5rem;
    border-radius: 30px;
    background: ${palette.borderLightGray};
    font-size: 0.9rem;
  }
`;

const NaviContainer = () => {
  const dispatch = useDispatch();
  const { position } = useSelector(({ guest }) => ({
    position: guest.position,
  }));

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
    getPosition();
  }, []);

  return (
    <Container>
      {position ? (
        <span>
          🧭 현재 위치는 <b>{position.name}</b>
        </span>
      ) : (
        <span>위치 정보가 없어요 😢</span>
      )}
    </Container>
  );
};

export default React.memo(NaviContainer);
