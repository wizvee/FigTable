import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';
import { MdPerson } from 'react-icons/md';

const HeaderBlock = styled.div`
  width: 100%;

  ${props =>
    !props.isHome &&
    css`
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `}
`;

/* Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 Header 컴포넌트 생성 */
const HeaderWrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;

  .logo,
  .right {
    color: ${props => (props.isHome ? 'white' : palette.primary)};
  }

  .logoMain {
    font-size: 1.4rem;
    font-weight: 900;
    font-family: 'Patua One', cursive;
    letter-spacing: 4px;
    float: left;
    justify-content: center;
  }
  .logoAdmin {
    margin-top: 3px;
    margin-left: 10px;
    float: right;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
  }
  .rightName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: white;
  }
  .rightName b {
    margin-right: 5px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`;

const AdminHeader = () => {
  const [isUserModal, setIsUserModal] = useState(false);
  // 가고싶다, 로그인 모달 열고 닫는 이벤트
  function openUserModal() {
    setIsUserModal(true);
    document.body.style.overflow = 'hidden';
  }
  function closeUserModal() {
    setIsUserModal(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <>
      <HeaderBlock>
        <HeaderWrapper>
          <div className="logo">
            <div className="logoMain">
              <Link to="/figtable">FIGTABLE</Link>
            </div>
            <div className="logoAdmin"> 관리자</div>
          </div>

          <div className="right">
            <div className="rightName">
              <b>어드민</b>관리자님
            </div>
            <IconWrapper onClick={openUserModal}>
              <MdPerson />
            </IconWrapper>
          </div>
        </HeaderWrapper>
      </HeaderBlock>
    </>
  );
};

export default AdminHeader;
