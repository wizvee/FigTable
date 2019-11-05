import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const Container = styled.div`
  height: 100vmax;
`;

const Left = styled(Responsive)`
  float: left;
  width: 50%;
  height: 100%;
  background: url(https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)
    no-repeat 0 -30%;
  background-size: 50vmax 100vmax;
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
`;

document.body.style.overflow = 'hidden';
const WaitingPublicContainer = () => {
  return (
    <Container>
      <Left>
        <Back>
          <Content>
            휴대폰 번호를 입력하시면
            <br /> 카톡으로 알려드립니다
          </Content>
        </Back>
      </Left>
    </Container>
  );
};

export default WaitingPublicContainer;
