import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';
import { lovesRv, unlovesRv } from '../../../modules/member';
import ModalLogin from '../user/ModalLogin';

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

const ReviewActionButtons = ({ review }) => {
  const dispatch = useDispatch();
  const { member, loves } = useSelector(({ member }) => ({
    member: member.member,
    loves: member.loves,
  }));

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
  const onLove = useCallback(() => dispatch(lovesRv({ member, review })), [
    dispatch,
  ]);
  const onUnlove = useCallback(() => dispatch(unlovesRv({ member, review })), [
    dispatch,
  ]);

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Container>
        {loves.includes(review.rvNo) ? (
          undefined
        ) : (
          <Icon onClick={member ? onLove : () => openModal('like')}>
            <FiHeart />
            {review.rvLove}
          </Icon>
        )}
        <Icon>
          <FiMessageSquare />
          댓글
        </Icon>
      </Container>
    </>
  );
};

export default React.memo(ReviewActionButtons);
