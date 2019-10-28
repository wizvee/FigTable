import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Section from '../../common/Section';
import Poster from '../../common/Poster';

const Container = styled(Responsive)`
  padding: 2rem 1rem;
  height: 100%;
`;

const HomePresenter = ({ restaurants, error, loading }) => {
  if (error) {
    return null;
  }
  if (loading || !restaurants) return null;
  return (
    <Container>
      <Section title="내 주변 맛집">
        {restaurants.map(r => (
          <Poster key={r.resNo} restaurant={r} />
        ))}
      </Section>
    </Container>
  );
};

export default HomePresenter;
