import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TiHeartOutline, TiHeartFullOutline, TiMessage } from 'react-icons/ti';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
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
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [lovesCount, setLovesCount] = useState(review.rvLove);
  const [isLoved, setLoved] = useState(review.loved);
  const [cmtCount, setCmtCount] = useState(review.comments.length);
  const [cmtInput, setCmtInput] = useState(false);
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
    setLoved(true);
    setLovesCount(lovesCount + 1);
    dispatch(lovesRv({ member, review }));
  }, [dispatch, isLoved, setLoved, lovesCount, setLovesCount]);
  const onUnlove = useCallback(() => {
    setLoved(false);
    setLovesCount(lovesCount - 1);
    dispatch(unlovesRv({ member, review }));
  }, [dispatch, isLoved, setLoved, lovesCount, setLovesCount]);

  // 코멘트 창 제어 이벤트 핸들러
  const onCmtToggle = useCallback(() => {
    if (cmtInput) setCmtInput(false);
    else setCmtInput(true);
  }, []);

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Container>
        {isLoved ? (
          <Icon onClick={onUnlove}>
            <TiHeartFullOutline className="loves" />
            좋아요 {lovesCount}개
          </Icon>
        ) : (
          <Icon onClick={member ? onLove : () => openModal('love')}>
            <TiHeartOutline />
            좋아요 {lovesCount}개
          </Icon>
        )}
        {member ? (
          <Icon onClick={onCmtToggle}>
            <TiMessage />
            댓글 {cmtCount}개
          </Icon>
        ) : (
          <Icon onClick={() => openModal('comment')}>
            <TiMessage />
            댓글 {cmtCount}개
          </Icon>
        )}
      </Container>
    </>
  );
};

export default React.memo(ReviewActionButtons);
