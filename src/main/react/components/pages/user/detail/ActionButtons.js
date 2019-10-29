import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { FiStar, FiEdit3 } from 'react-icons/fi';
import ModalLogin from '../ModalLogin';

const StyledIcon = css`
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

const IconLk = styled(Link)`
  ${StyledIcon}
`;

const IconSn = styled.span`
  ${StyledIcon}
`;

const ActionButtons = () => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [isModal, setIsModal] = useState(false);
  const [msg, setMsg] = useState('review');

  function openModal(type) {
    setMsg(type);
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }

  if (!member) {
    return (
      <>
        {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
        <IconSn onClick={() => openModal('review')}>
          <FiEdit3 />
          <span>리뷰쓰기</span>
        </IconSn>
        <IconSn onClick={() => openModal('like')}>
          <FiStar />
          <span>가고싶다</span>
        </IconSn>
      </>
    );
  }
};

export default ActionButtons;
