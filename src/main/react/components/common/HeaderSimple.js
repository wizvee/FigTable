import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from './Responsive';
import palette from '../../lib/styles/Palette';

const Container = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Responsive 컴포넌트
const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  .logo {
    color: ${palette.primary};
    font-size: 1.4rem;
    font-weight: 900;
    font-family: 'Patua One', cursive;
    letter-spacing: 4px;
  }
`;

const HeaderSimple = () => {
  return (
    <Container>
      <Wrapper>
        <div className="logo">
          <Link to={process.env.PATH}>FIGTABLE</Link>
        </div>
      </Wrapper>
    </Container>
  );
};

export default HeaderSimple;
