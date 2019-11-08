import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { TiHeartOutline, TiHeartFullOutline, TiMessage } from 'react-icons/ti';
import { lovesRv, unlovesRv } from '../../../modules/member';
import ModalLogin from '../user/ModalLogin';

const Container = styled.div`
  padding-top: 0.8rem;
  width: 100%;
  color: ${palette.textGray};
`;

const Icon = styled.span`
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s linear;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    margin-right: 0.2rem;
    font-size: 1.2rem;
    transform: translateY(4px);
    &.loves {
      color: ${palette.primary};
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

const ReviewActionButtons = ({ review }) => {
  const dispatch = useDispatch();
  const { member, loves } = useSelector(({ member }) => ({
    member: member.member,
    loves: member.loves,
  }));

  const [lovesCount, setLovesCount] = useState(review.rvLove);
  const [isModal, setIsModal] = useState(false);
  const [msg, setMsg] = useState('review'); // login modal용 msg 설정 state

  // 모달을 열고 닫는 이벤트 핸들링
  const openModal = useCallback(type => {
    setMsg(type);
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  // 좋아요 제어 이벤트 핸들러
  const onLove = useCallback(() => {
    setLovesCount(lovesCount + 1);
    dispatch(lovesRv({ member, review }));
  }, [dispatch, lovesCount, setLovesCount]);
  const onUnlove = useCallback(() => {
    setLovesCount(lovesCount - 1);
    dispatch(unlovesRv({ member, review }));
  }, [dispatch, lovesCount, setLovesCount]);

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Container>
        {loves.includes(review.rvNo) ? (
          <Icon onClick={onUnlove}>
            <TiHeartFullOutline className="loves" />
            {lovesCount}
          </Icon>
        ) : (
          <Icon onClick={member ? onLove : () => openModal('like')}>
            <TiHeartOutline />
            {lovesCount}
          </Icon>
        )}
        <Icon>
          <TiMessage />
          댓글
        </Icon>
      </Container>
    </>
  );
};

export default React.memo(ReviewActionButtons);
