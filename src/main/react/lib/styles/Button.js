import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from './Palette';

const buttonStyle = css`
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${palette.primary};
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
  outline: none;
  cursor: pointer;
  &:hover {
    /* background: #ff8787; */
  }
  ${props =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
