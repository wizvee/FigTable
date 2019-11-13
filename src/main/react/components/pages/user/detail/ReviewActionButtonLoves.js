import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart, AiFillSmile } from 'react-icons/ai';
import styled from 'styled-components';
import client from '../../../../lib/api/client';
import { lovesRv, unlovesRv } from '../../../../modules/member';
import palette from '../../../../lib/styles/Palette';
import ModalLogin from '../ModalLogin';

const Icon = styled.span`
  font-size: 0.95rem;
  color: ${palette.textGray};
  transition: color 0.2s linear;
  cursor: pointer;
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
  &.small {
    margin-left: 0.3rem;
    svg {
      font-size: 0.93rem;
      transform: translateY(3px);
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
  const [lovesCount, setLovesCount] = useState(review.rvLove);
  const [isLoved, setLoved] = useState(review.loved);
  const [loverList, setLoverList] = useState([]);

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

  // 좋아요 목록 보기 이벤트 핸들러
  const onLoverList = useCallback(async rvNo => {
    await client
      .get(`/figtable/api/review/loves/${rvNo}`)
      .then(({ data }) => console.log(data));
  });

  return (
    <>
      {isModal && <ModalLogin msg="love" closeModal={closeModal} />}
      {isLoved ? (
        <Icon onClick={onUnlove}>
          <AiFillHeart className="loves" />
          좋아요 {lovesCount}개
        </Icon>
      ) : (
        <Icon onClick={member ? onLove : openModal}>
          <AiOutlineHeart />
          좋아요 {lovesCount}개
        </Icon>
      )}
      {lovesCount > 0 && (
        <Icon className="small" onClick={() => onLoverList(review.rvNo)}>
          <AiFillSmile />
        </Icon>
      )}
    </>
  );
};

export default React.memo(ReviewActionButtonLoves);
