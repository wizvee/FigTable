import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { FiStar, FiEdit3 } from 'react-icons/fi';
import ModalLogin from '../ModalLogin';

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
  svg {
    font-size: 1.8rem;
  }
  span {
    font-size: 0.8rem;
  }
`;

const ActionButtons = ({ history }) => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [isModal, setIsModal] = useState(false);
  const [msg, setMsg] = useState('review'); // login modal용 msg 설정 state

  function openModal(type) {
    setMsg(type);
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }

  function onWrite() {
    history.push('/figtable/review');
  }

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Icon onClick={member ? onWrite() : () => openModal('review')}>
        <FiEdit3 />
        <span>리뷰쓰기</span>
      </Icon>
      <Icon onClick={member ? undefined : () => openModal('like')}>
        <FiStar />
        <span>가고싶다</span>
      </Icon>
    </>
  );
};

export default ActionButtons;
