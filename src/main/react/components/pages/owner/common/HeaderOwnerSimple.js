import React from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';

const Header = styled.div`
  width: 100%;
  background: white;
  position: absolute;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Responsive)`
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  .logoMain,
  .logoSide {
    display: inline-block;
  }
  .logoMain {
    color: ${palette.primary};
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 4px;
    font-family: 'Patua One', cursive;
  }
  .logoSide {
    color: ${palette.textGray};
    position: relative;
    top: -1px;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: 'NanumSquareRound';
  }
`;

const HeaderOwnerSimple = () => {
  return (
    <Header>
      <Wrapper>
        <div className="logo">
          <div className="logoMain">FIGTABLE</div>
          &nbsp;&nbsp;
          <div className="logoSide">
            <b>파트너</b>
          </div>
        </div>
      </Wrapper>
    </Header>
  );
};

export default HeaderOwnerSimple;
