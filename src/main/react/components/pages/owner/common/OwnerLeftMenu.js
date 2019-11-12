import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  width: 280px;
  height: 200px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  position: relative;
  top: 433px;
  left: 30px;
  display: inline-block;

  @media (max-height: 768px) {
    top: 410px;
  }

  @media (max-width: 425px) {
    margin-left: 6%;
  }
`;
const MenuItem = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 0.5rem;
  border-bottom: 1px solid ${palette.borderGray};
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  &.selected {
    color: #f67280;
  }
`;

const OwnerLeftMenu = ({ location: { pathname }, match }) => {
  const { resNo } = match.params;

  return (
    <MenuContainer>
      <Link to={`/figtable/owner/${resNo}`}>
        <MenuItem
          className={pathname == `/figtable/owner/${resNo}` && 'selected'}
          style={{ paddingTop: '0.6rem' }}
        >
          홈
        </MenuItem>
      </Link>
      <Link to={`/figtable/owner/${resNo}/restaurant`}>
        <MenuItem
          className={
            pathname == `/figtable/owner/${resNo}/restaurant` && 'selected'
          }
        >
          가게정보 수정
        </MenuItem>
      </Link>

      <Link to={`/figtable/owner/${resNo}/waiting`}>
        <MenuItem
          className={
            pathname == `/figtable/owner/${resNo}/waiting` && 'selected'
          }
        >
          Waiting
        </MenuItem>
      </Link>
      <Link to={`/figtable/owner/${resNo}/eatdeal`}>
        <MenuItem
          className={
            pathname == `/figtable/owner/${resNo}/eatdeal` && 'selected'
          }
        >
          Eat Deal
        </MenuItem>
      </Link>
      <Link to={`/figtable/owner/${resNo}/statics`}>
        <MenuItem
          className={
            pathname == `/figtable/owner/${resNo}/statics` && 'selected'
          }
        >
          통계
        </MenuItem>
      </Link>
    </MenuContainer>
  );
};

export default withRouter(OwnerLeftMenu);
