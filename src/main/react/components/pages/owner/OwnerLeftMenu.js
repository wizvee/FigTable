import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  width: 280px;
  height: 200px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  position: relative;
  top: 405px;
  left: 30px;
`;
const MenuItem = styled.div`
  width: 100%;
  height: 40px;
  padding-top: 0.5rem;
  border-bottom: 1px solid ${palette.borderGray};
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  &:nth-child(${props => props.select}) {
    color: #f67280;
  }
`;
() => {};
const OwnerLeftMenu = ({ select }) => {
  return (
    <MenuContainer>
      <MenuItem select={select} style={{ paddingTop: '0.6rem' }}>
        <Link to="/figtable/owner">홈</Link>
      </MenuItem>
      <MenuItem select={select}>가게정보 수정</MenuItem>
      <MenuItem select={select}>예약 관리</MenuItem>
      <MenuItem select={select}>Waiting</MenuItem>
      <MenuItem select={select}>Eat Deal</MenuItem>
    </MenuContainer>
  );
};

export default OwnerLeftMenu;
