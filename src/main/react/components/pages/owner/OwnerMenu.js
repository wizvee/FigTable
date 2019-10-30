import React from 'react';
import styled from 'styled-components';
import { FaStore } from 'react-icons/fa';
import { MdSchedule, MdNaturePeople, MdRestaurantMenu } from 'react-icons/md';
import palette from '../../../lib/styles/Palette';
import { Link } from 'react-router-dom';

const MenuWrapper = styled.ul`
  text-align: center;
  display: inline-block;
  width: 95%;
  padding: 0;
  margin: 0 auto;
  margin-top: 7%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.563rem;

  @media (max-height: 768px) {
    margin-top: 2%;
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    margin: 3%;
  }
  @media (max-width: 768px) {
    margin: 0;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const IconWrapper = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 40px;
  margin-top: 15px;
  margin-bottom: 18px;
  & + & {
    margin-left: 0.5rem;
  }
`;

const MenuItem = styled.li`
  height: 120px;
  background: white;
  list-style: none;
  font-size: 20px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0;
    ${IconWrapper} {
      color: ${palette.primary};
    }
  }
`;
const OwnerMenu = () => {
  return (
    <>
      <MenuWrapper>
        <MenuItem>
          <Link to="/figtable/owner/restaurant">
            <IconWrapper>
              <FaStore />
            </IconWrapper>
            가게정보 수정
          </Link>
        </MenuItem>
        <MenuItem>
          <IconWrapper>
            <MdSchedule />
          </IconWrapper>
          예약 관리
        </MenuItem>
        <MenuItem>
          <IconWrapper style={{ marginBottom: '22px' }}>
            <MdNaturePeople />
          </IconWrapper>
          Waiting
        </MenuItem>
        <MenuItem>
          <Link to="/figtable/owner/eatdeal">
            <IconWrapper>
              <MdRestaurantMenu />
            </IconWrapper>
            Eat Deal
          </Link>
        </MenuItem>
      </MenuWrapper>
    </>
  );
};

export default OwnerMenu;
