import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';

const Container = styled.div`
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
  height: 100vmax;
`;
// document.body.style.overflow = 'hidden';
// document.body.style.height = '100%';

const Left = styled(Responsive)`
  float: left;
  width: 50%;
  height: 100%;
  background: url(https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)
    no-repeat;
  background-size: 100%;
  top: 0;
  padding: 0;
  &.back {
    width: 100%;
    height: 100%;
    color: black;
    opacity: 0.5;
    z-index: 10;
  }
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

const WaitingPublicContainer = () => {
  return (
    <Container>
      <Left>
        <Back>
          <Content>
            휴대폰 번호를 입력하시면
            <br /> 카톡으로 알려드립니다
          </Content>
          <Count>현재 웨이팅 {count}</Count>
        </Back>
      </Left>
    </Container>
  );
};

export default WaitingPublicContainer;
