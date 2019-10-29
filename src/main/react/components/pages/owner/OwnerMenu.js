import React from 'react';
import styled from 'styled-components';
import { FaStore } from 'react-icons/fa';
import { MdSchedule, MdNaturePeople, MdRestaurantMenu } from 'react-icons/md';

const MenuWrapper = styled.ul`
  text-align: center;
  display: inline-block;
  border: 1px solid black;
  width: 80%;
  padding: 0;
  margin-left: 10%;
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.563rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const MenuItem = styled.li`
  height: 120px;
  background: white;
  list-style: none;
`;

const OwnerMenu = () => {
  return (
    <MenuWrapper>
      <MenuItem>
        <FaStore />
        가게정보 수정
      </MenuItem>
      <MenuItem>
        <MdSchedule />
        예약 관리
      </MenuItem>
      <MenuItem>
        <MdNaturePeople />
        Waiting
      </MenuItem>
      <MenuItem>
        <MdRestaurantMenu />
        Eat Deal
      </MenuItem>
    </MenuWrapper>
  );
};

export default OwnerMenu;
