import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const DetailWrapper = styled(Responsive)`
  padding-top: 2rem;
  height: 1000px;
`;

const DetailPresenter = () => {
  return <DetailWrapper>내용</DetailWrapper>;
};

export default DetailPresenter;
