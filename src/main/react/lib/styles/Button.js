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
  font-family: 'NanumSquareRound', sans-serif;
  color: white;
  opacity: 0.8;
  outline: none;
  transition: opacity 0.2s linear;
  cursor: pointer;
  &:hover {
    /* background: #ff8787; */
    opacity: 1;
  }
  ${props =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
  ${props =>
    props.outline &&
    css`
      background: #fff;
      border: 1px solid ${palette.borderGray};
      color: ${palette.text};
    `}
  ${props =>
    props.bgColor &&
    css`
      background: ${props.bgColor};
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
  text-align: center;
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} fullwidth={props.fullwidth ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
