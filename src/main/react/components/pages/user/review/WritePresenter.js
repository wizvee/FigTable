import React from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';

const Container = styled(Responsive)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled.div`
  width: 100%;
  background: red;
`;

const WritePresenter = () => {
  return (
    <Container>
      <Title>
        <div className="resInfo">
          <span className="name">오스틴</span>
          <span>에 대한 솔직한 리뷰를 써주세요.</span>
        </div>
        <div className="rating">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
      </Title>
    </Container>
  );
};

export default WritePresenter;
