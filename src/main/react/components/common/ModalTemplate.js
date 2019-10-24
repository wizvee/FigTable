import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from './Responsive';

// 모달 배경
const Overlay = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  ${props =>
    props.tooltip &&
    css`
      z-index: 55;
    `}
`;

const Container = styled.div`
  z-index: 50;
  min-height: 4rem;
  background: white;
  ${props =>
    props.fullwidth &&
    css`
      position: fixed;
      top: 4rem;
      left: 0;
      width: 100%;
    `}
  ${props =>
    props.tooltip &&
    css`
      z-index: 60;
      position: absolute;
      top: 5rem;
      right: 0.9rem;
      width: 320px;
      border-radius: 3px;
      @media (max-width: 768px) {
        width: 100%;
        right: 0;
        border-radius: 0;
      }
      &::before {
        content: '';
        position: absolute;
        top: -0.5rem;
        right: 0.7rem;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.5rem solid white;
      }
    `}
`;

const ResponsiveWrapper = styled(Responsive)`
  padding: 1.3rem;
`;

const Wrapper = styled.div`
  padding: 0.5rem 0;
`;

const ModalTemplate = ({ isModal, closeModal, children, ...rest }) => {
  return !isModal ? null : (
    <>
      <Overlay {...rest} onClick={closeModal} />
      <Container {...rest}>
        {rest.fullwidth ? (
          <ResponsiveWrapper>{children}</ResponsiveWrapper>
        ) : (
          <Wrapper>{children}</Wrapper>
        )}
      </Container>
    </>
  );
};

export default ModalTemplate;
