import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  width: 100%;
  background: white;
  height: 50px;
  margin-top: 8px;
  padding-top: 8px;
  padding-left: 15px;
  font-size: 23px;
  font-weight: 900;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const OwnerDetailTitle = () => {
  return <Title>가게정보 수정</Title>;
};

export default OwnerDetailTitle;
