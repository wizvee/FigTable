import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.563rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.2rem;
  }
  @media (max-width: 426px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
`;

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

export default Section;
