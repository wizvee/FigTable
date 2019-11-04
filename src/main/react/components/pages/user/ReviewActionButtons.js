import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';

const Container = styled.div`
  padding-top: 0.8rem;
  width: 100%;
  color: ${palette.textGray};
`;

const Icon = styled.span`
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    margin-right: 0.3rem;
    transform: translateY(2px);
  }
  & + & {
    margin-left: 1rem;
  }
`;

const ReviewActionButtons = () => {
  return (
    <Container>
      <Icon>
        <FiHeart />
        공감
      </Icon>
      <Icon>
        <FiMessageSquare />
        댓글
      </Icon>
    </Container>
  );
};

export default React.memo(ReviewActionButtons);
