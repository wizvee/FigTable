import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { FiEdit3 } from 'react-icons/fi';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import ModalLogin from '../ModalLogin';
import { setRes } from '../../../../modules/review';
import { getLikes, likesRes, unlikesRes } from '../../../../modules/member';

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

  const openModal = useCallback(type => {
    setMsg(type);
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  const onWrite = useCallback(() => {
    disaptch(setRes({ restaurant, member }));
    history.push('/figtable/review');
  }, [disaptch]);

  const onLike = useCallback(() => disaptch(likesRes({ member, restaurant })), [
    disaptch,
  ]);
  const onUnlike = useCallback(
    () => disaptch(unlikesRes({ member, restaurant })),
    [disaptch],
  );

  useEffect(() => {
    disaptch(getLikes(member.memNo));
  }, []);

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Icon onClick={member ? onWrite : () => openModal('review')}>
        <FiEdit3 />
        <span>리뷰쓰기</span>
      </Icon>
      {likes.includes(restaurant.resNo) ? (
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
