import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Section from '../../common/Section';
import Poster from '../../common/Poster';

const Container = styled(Responsive)`
  padding-top: 2rem;
  height: 1000px;
`;

const HomePresenter = ({ popular, error, loading }) => {
  return loading ? null : (
    <Container>
      <Section title="내 주변 맛집">
        {popular.map(p => (
          <Poster key={p.id} restaurant={p} />
        ))}
      </Section>
    </Container>
  );
};

export default HomePresenter;
