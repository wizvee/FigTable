import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import { FiEdit3 } from 'react-icons/fi';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import ModalLogin from '../ModalLogin';
import { setRes } from '../../../../modules/review';
import { likesRes, unlikesRes } from '../../../../modules/member';

const Icon = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  color: ${palette.textGray};
  transform: translateY(7px);
  transition: color 0.5s linear;
  cursor: pointer;
  &:hover {
    color: ${palette.primary};
  }
  &.include {
    color: ${palette.primary};
  }
  svg {
    font-size: 1.8rem;
  }
  span {
    font-size: 0.8rem;
  }
`;

const ActionButtons = ({ history }) => {
  const disaptch = useDispatch();
  const { member, likes, restaurant } = useSelector(
    ({ member, restaurant }) => ({
      member: member.member,
      likes: member.likes,
      restaurant: restaurant.restaurant,
    }),
  );

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

  // 리뷰 쓰기 이벤트 핸들러
  const onWrite = useCallback(() => {
    disaptch(setRes({ restaurant, member }));
    history.push('/figtable/review');
  }, [disaptch]);

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
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Icon onClick={member ? onWrite : () => openModal('review')}>
        <FiEdit3 />
        <span>리뷰쓰기</span>
      </Icon>
      {likes.some(r => r.resNo == restaurant.resNo) ? (
        <Icon className="include" onClick={onUnlike}>
          <TiStarFullOutline />
          <span>가고싶다</span>
        </Icon>
      ) : (
        <Icon onClick={member ? onLike : () => openModal('like')}>
          <TiStarOutline />
          <span>가고싶다</span>
        </Icon>
      )}
    </>
  );
};

export default withRouter(ActionButtons);
