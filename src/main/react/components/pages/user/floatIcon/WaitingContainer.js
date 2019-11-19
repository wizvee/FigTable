import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { AiFillBulb } from 'react-icons/ai';
import palette from '../../../../lib/styles/Palette';
import WaitingPresenter from './WaitingPresenter';
import client, { path } from '../../../../lib/api/client';
import Loader from '../../../common/Loader';
import { unWaiting } from '../../../../modules/member';

const LightBul = keyframes`
  0% {
    color: #fff;
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    color: #F1C40F;
    transform: scale(1.15);
  }
`;

const Icon = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${palette.primary};
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  box-shadow: 3px 3px 0 ${palette.borderGray};
  ${props =>
    props.active &&
    css`
      svg {
        animation: ${LightBul} 0.7s infinite linear alternate;
      }
    `}
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
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 400px;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const WaitingContainer = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [waitInfo, setWaitInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const onStatus = useCallback(() => {
    if (status) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setStatus(!status);
  }, [status]);

  const getWaitInfo = useCallback(async () => {
    await client
      .get(`${path}/api/member/waiting`)
      .then(({ data }) => setWaitInfo(data));
    setLoading(false);
  }, []);

  const onCancle = useCallback(() => {
    document.body.style.overflow = 'unset';
    dispatch(unWaiting());
  }, []);

  useEffect(() => {
    getWaitInfo();
  }, []);

  return status ? (
    <>
      <Overlay onClick={onStatus} />
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <WaitingPresenter waitInfo={waitInfo} onCancle={onCancle} />
        )}
      </Container>
    </>
  ) : (
    <Icon active onClick={onStatus}>
      <AiFillBulb />
    </Icon>
  );
};

export default React.memo(WaitingContainer);
