import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart, AiFillSmile } from 'react-icons/ai';
import styled from 'styled-components';
import { lovesRv, unlovesRv } from '../../../../modules/member';
import palette from '../../../../lib/styles/Palette';
import ModalLogin from '../ModalLogin';
import ModalLoversContainer from './ModalLoversContainer';

const Icon = styled.span`
  font-size: 0.95rem;
  color: ${palette.textGray};
  transition: color 0.2s linear;
  cursor: pointer;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    margin-right: 0.3rem;
    font-size: 1.2rem;
    transform: translateY(4px);
    &.loves {
      color: ${palette.primary};
    }
  }
  &.small {
    margin-left: 0.3rem;
    svg {
      font-size: 0.95rem;
      transform: translateY(7px);
    }
    &:hover {
      color: ${palette.text};
    }
  }
`;

const ReviewActionButtonLoves = ({ review }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [isModal, setIsModal] = useState(false);
  const [isLoverModal, setLoverModal] = useState(false);

  // 모달을 열고 닫는 이벤트 핸들링
  const openModal = useCallback(() => {
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

  // 좋아요 목록 보기 이벤트 핸들러
  const openLoverModal = useCallback(() => {
    setLoverModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeLoverModal = useCallback(() => {
    setLoverModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      {isModal && <ModalLogin msg="love" closeModal={closeModal} />}
      {isLoverModal && (
        <ModalLoversContainer rvNo={review.rvNo} closeModal={closeLoverModal} />
      )}
      {member && review.loved ? (
        <Icon onClick={onUnlove}>
          <AiFillHeart className="loves" />
          {review.rvLove}
        </Icon>
      ) : (
        <Icon onClick={member ? onLove : openModal}>
          <AiOutlineHeart />
          {review.rvLove}
        </Icon>
      )}
      {review.rvLove > 0 && (
        <Icon className="small" onClick={openLoverModal}>
          <AiFillSmile />
        </Icon>
      )}
    </>
  );
};

export default React.memo(ReviewActionButtonLoves);
