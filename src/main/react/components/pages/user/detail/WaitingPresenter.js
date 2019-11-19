import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import ModalWaiting from './ModalWaiting';
import ModalLogin from '../ModalLogin';
import ModalAlert from '../../../common/ModalAlert';

const Wating = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  strong {
    color: ${palette.primary};
  }
  div {
    padding-bottom: 0.5rem;
  }
  button + button {
    margin-left: 5px;
  }
`;

const WaitingPresenter = ({ resWaitCnt }) => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  const [isModal, setModal] = useState(false);
  const [isLoginModal, setLoginModal] = useState(false);
  const [isAlready, setAleary] = useState(false);

  const onModal = useCallback(() => {
    if (isModal) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setModal(!isModal);
  }, [isModal]);

  const onLoginModal = useCallback(() => {
    if (isLoginModal) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setLoginModal(!isLoginModal);
  }, [isLoginModal]);

  const onAlready = useCallback(() => {
    if (isAlready) document.body.style.overflow = 'unset';
    else document.body.style.overflow = 'hidden';
    setAleary(!isAlready);
  }, [isAlready]);

  return (
    <>
      {isAlready && (
        <ModalAlert title="원격 줄서기" msg="이미 줄을 선 맛집이 있어요. 🙋‍♀️" closeModal={onAlready} />
      )}
      {isLoginModal && <ModalLogin msg="waiting" closeModal={onLoginModal} />}
      {isModal && <ModalWaiting onModal={onModal} />}
      <Wating>
        <div>
          최근 일주일간 대기 <strong>{resWaitCnt}</strong>건이 있습니다.
        </div>
        <Button
          onClick={
            member ? (member.waiting ? onAlready : onModal) : onLoginModal
          }
        >
          줄서기
        </Button>
      </Wating>
    </>
  );
};

export default React.memo(WaitingPresenter);
