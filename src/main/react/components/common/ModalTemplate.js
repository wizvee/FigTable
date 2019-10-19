import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from './Responsive';

// 모달 창 레이아웃 컴포넌트

// 모달 배경
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalTemplateBlock = styled.div`
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
      position: absolute;
      top: 4rem;
      right: 0.9rem;
      width: 320px;
      border-radius: 1px;
      @media (max-width: 768px) {
        width: 100%;
        right: 0;
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

const NomalWrapper = styled.div`
  padding: 0.5rem 0;
`;

const ModalTemplate = ({ isModal, closeModal, children, ...rest }) => {
  return !isModal ? null : (
    <>
      <Overlay onClick={closeModal} />
      <ModalTemplateBlock {...rest}>
        {rest.fullwidth ? (
          <ResponsiveWrapper>{children}</ResponsiveWrapper>
        ) : (
          <NomalWrapper>{children}</NomalWrapper>
        )}
      </ModalTemplateBlock>
    </>
  );
};

export default ModalTemplate;
