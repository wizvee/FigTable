import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiFillMessage } from 'react-icons/ai';
import QuestionPresenter from './QuestionPresenter';
import ModalLogin from '../ModalLogin';
import palette from '../../../../lib/styles/Palette';

const Icon = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #14cbb2;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  box-shadow: 3px 3px 0 ${palette.borderGray};
`;

const Overlay = styled.div`
  z-index: 55;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 60;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 416px;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
`;

const QuestionContainer = () => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  const [status, setStatus] = useState(false);
  const [isLoginPop, setLoginPop] = useState(false);

  const onStatus = useCallback(() => {
    if (status) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setStatus(!status);
  }, [status]);

  const onLoginPop = useCallback(() => {
    if (isLoginPop) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setLoginPop(!isLoginPop);
  }, [isLoginPop]);

  return (
    <>
      {isLoginPop && <ModalLogin msg="question" closeModal={onLoginPop} />}
      {status ? (
        <>
          <Overlay onClick={onStatus} />
          <Container>
            <QuestionPresenter memNo={member.memNo} />
          </Container>
        </>
      ) : (
        <Icon onClick={member ? onStatus : onLoginPop}>
          <AiFillMessage />
        </Icon>
      )}
    </>
  );
};

export default React.memo(QuestionContainer);
