import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Section from '../../common/Section';
import Poster from '../../common/Poster';
import Loader from '../../common/Loader';

const Container = styled(Responsive)`
  padding: 2rem 1rem;
  height: 100%;
  min-height: calc(100vh - 37rem);
`;

const HomePresenter = ({ restaurants, error, loading }) => {
  if (error) return null;

  const recommend =
    restaurants && restaurants.filter(restaurant => restaurant.resWaiting);

  return (
    <Container>
      {loading || !restaurants ? (
        <Loader />
      ) : (
        <>
          <Section title="내 주변 추천">
            {recommend.map(r => (
              <Poster key={r.resNo} restaurant={r} />
            ))}
          </Section>
          <Section title="내 주변 맛집">
            {restaurants.map(r => (
              <Poster key={r.resNo} restaurant={r} />
            ))}
          </Section>
        </>
      )}
    </Container>
  );
};

export default React.memo(HomePresenter);
