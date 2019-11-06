import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import palette from '../../lib/styles/Palette';
import ModalLogin from '../pages/user/ModalLogin';
import { likesRes, unlikesRes } from '../../modules/member';

const Icon = styled.span`
  font-size: 1.8rem;
  color: ${palette.textGray};
  cursor: pointer;
  &.include {
    color: ${palette.primary};
  }
`;

const LikeButton = ({ restaurant }) => {
  const disaptch = useDispatch();
  const { member, likes } = useSelector(({ member }) => ({
    member: member.member,
    likes: member.likes,
  }));

  const [isModal, setIsModal] = useState(false);

  // 모달을 열고 닫는 이벤트 핸들링
  const openModal = useCallback(() => {
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  // 가고 싶다 제어 이벤트 핸들러
  const onLike = useCallback(() => disaptch(likesRes({ member, restaurant })), [
    disaptch,
  ]);
  const onUnlike = useCallback(
    () => disaptch(unlikesRes({ member, restaurant })),
    [disaptch],
  );

  return (
    <>
      {isModal && <ModalLogin msg="like" closeModal={closeModal} />}
      {likes.some(r => r.resNo == restaurant.resNo) ? (
        <Icon className="include" onClick={onUnlike}>
          <TiStarFullOutline />
        </Icon>
      ) : (
        <Icon onClick={member ? onLike : openModal}>
          <TiStarOutline />
        </Icon>
      )}
    </>
  );
};

export default React.memo(LikeButton);
