import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import WaitingForm from './WaitingForm';
import { Link, withRouter } from 'react-router-dom';

const Container = styled.div`
  height: 100vmax;
`;

const Left = styled(Responsive)`
  float: left;
  width: 50%;
  height: 100%;
  background: url(https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)
    no-repeat;
  top: 0;
  padding: 0;
  background-size: 50vmax;
  &.back {
    width: 100%;
    height: 100%;
    color: black;
    opacity: 0.5;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    background-size: 50vmax 100vmax;
  }
`;
const Right = styled(Responsive)`
  float: right;
  width: 50%;
  height: 100%;
`;

const Back = styled(Responsive)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const Content = styled.div`
  z-index: 3;
  font-size: 2rem;
  color: white;
  padding-top: 4rem;
  padding-left: 3rem;
`;

const Count = styled.div`
  background: rgba(206, 212, 218, 0.8);
  text-align: center;
  width: 60%;
  height: 250px;
  position: relative;
  top: 17rem;
  left: 4rem;
  border-radius: 5px;
  font-size: 57px;
  font-weight: 900;
  padding-top: 3.2rem;
  letter-spacing: 15px;
`;

const Logo = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  padding-top: 6%;
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

const WaitingPublicContainer = ({ match }) => {
  const { resNo } = match.params;
  const [pNumber, setPNumber] = useState();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });
  return (
    <>
      <Container>
        <Left>
          <Back>
            <Content>
              휴대폰 번호를 입력하시면
              <br /> 카톡으로 알려드립니다
            </Content>
            <Count>
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: '500',
                  paddingBottom: '2.5rem',
                }}
              >
                현재 웨이팅
              </div>
              2팀
            </Count>
          </Back>
        </Left>
        <Right>
          <Link to={`/figtable/owner/${resNo}`}>
            <Logo>
              <div className="logoMain">FIGTABLE</div>
              &nbsp;&nbsp;
              <div className="logoSide">
                <b>파트너</b>
              </div>
            </Logo>
          </Link>
          <WaitingForm />
        </Right>
      </Container>
    </>
  );
};

export default withRouter(WaitingPublicContainer);
