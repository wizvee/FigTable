import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

const HeaderWrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;

  ${props =>
    !props.isAdmin &&
    css`
      background: white;
    `}

  .logo,
  .right {
    color: ${palette.primary};
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
    color: ${props => (props.isAdmin ? 'white' : '#474747')};
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
    color: ${props => (props.isAdmin ? 'white' : '#474747')};
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

const AdminHeader = ({ location: { pathname } }) => {
  const isAdmin =
    pathname === '/figtable/admin' || pathname === '/figtable/admin/';
  return (
    <>
      <HeaderBlock>
        <HeaderWrapper isAdmin={isAdmin}>
          <div className="logo">
            <Link to="/figtable/admin">
              <div className="logoMain">FIGTABLE</div>
              <div className="logoAdmin">
                <b>관리자</b>
              </div>
            </Link>
          </div>

          <div className="right">
            <div className="rightName">관리자님</div>
            <IconWrapper>
              <MdPerson />
            </IconWrapper>
          </div>
        </HeaderWrapper>
      </HeaderBlock>
    </>
  );
};

export default withRouter(AdminHeader);
