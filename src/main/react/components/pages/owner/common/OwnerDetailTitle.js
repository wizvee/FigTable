import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import palette from '../../../../lib/styles/Palette';

const Title = styled.div`
  width: 100%;
  background: white;
  height: 50px;
  margin-top: 8px;
  padding-top: 13px;

  padding-left: 15px;
  font-size: 23px;
  font-weight: 900;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);

  &.waiting {
    margin: 0 auto;
    width: 90%;
  }
  &.restaurant {
    margin: 0 auto;
    width: 90%;
    padding-top: 8px;

    @media (max-width: 1024px) {
      width: 100%;
    }
  }
`;

const MenuButton = styled.div`
  width: 40px;
  height: 40px;
  float: right;
  margin-right: 8px;
  border-radius: 50px;
  padding: 5px;
  position: relative;
  top: -7px;
  font-size: 28px;
  &:hover {
    cursor: pointer;
  }

  &.restaurant {
    top: -2px;
  }
`;

const DropDownMenu = styled.div`
  width: auto;
  height: 50px;
  font-weight: 500;
  font-size: 18px;
  background: white;
  z-index: 1;
  position: relative;
  float: right;
  top: -0.8rem;

  &.restaurant {
    top: -0.5rem;
  }
`;

const MenuItem = styled.div`
  vertical-align: top;
  width: 90px;
  height: 100%;
  display: inline-block;
  text-align: center;
  padding-top: 10px;
  cursor: pointer;
  &.selected {
    color: #f67280;
  }
`;

const OwnerDetailTitle = ({
  title,
  location: { pathname },
  match,
  topMenu,
}) => {
  const path = process.env.PATH;
  const [visible, setVisible] = useState(false);
  const { resNo } = match.params;
  const showMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Title
        className={
          pathname == `${path}/owner/${resNo}/waiting`
            ? 'waiting'
            : pathname == `${path}/owner/${resNo}/statics`
            ? 'statics'
            : pathname == `${path}/owner/${resNo}/restaurant`
            ? 'restaurant'
            : ''
        }
      >
        {title}
        {pathname == `${path}/owner/${resNo}/waiting` ||
        pathname == `${path}/owner/${resNo}/restaurant` ||
        (pathname == `${path}/owner/${resNo}/statics` && topMenu == true) ? (
          <MenuButton
            className={
              pathname == `${path}/owner/${resNo}/restaurant` && 'restaurant'
            }
            onClick={showMenu}
          >
            {visible ? <MdClose /> : <FiMenu />}
          </MenuButton>
        ) : (
          ''
        )}
        {visible ? (
          <DropDownMenu
            className={
              pathname == `${path}/owner/${resNo}/restaurant` && 'restaurant'
            }
          >
            <Link to={`${path}/owner/${resNo}`}>
              <MenuItem
                className={pathname == `${path}/owner/${resNo}` && 'selected'}
                style={{ paddingTop: '14px', width: '80px' }}
              >
                홈
              </MenuItem>
            </Link>
            <Link to={`${path}/owner/${resNo}/restaurant`}>
              <MenuItem
                className={
                  pathname == `${path}/owner/${resNo}/restaurant` && 'selected'
                }
                style={{ paddingTop: '5px', fontSize: '17px' }}
              >
                가게정보
                <br />
                수정
              </MenuItem>
            </Link>
            <Link to={`${path}/owner/${resNo}/eatdeal`}>
              <MenuItem
                className={
                  pathname == `${path}/owner/${resNo}/eatdeal` && 'selected'
                }
                style={{ paddingTop: '12px' }}
              >
                Eat Deal
              </MenuItem>
            </Link>
            <Link to={`${path}/owner/${resNo}/waiting`}>
              <MenuItem
                className={
                  pathname == `${path}/owner/${resNo}/waiting` && 'selected'
                }
                style={{ paddingTop: '6px', fontSize: '17px' }}
              >
                Waiting
                <br />
                (사장)
              </MenuItem>
            </Link>

            <Link to={`${path}/owner/${resNo}/public`}>
              <MenuItem
                className={
                  pathname == `${path}/owner/${resNo}/statics` && 'selected'
                }
                style={{ paddingTop: '6px', fontSize: '17px' }}
              >
                Waiting
                <br />
                (매장)
              </MenuItem>
            </Link>
          </DropDownMenu>
        ) : (
          ''
        )}
      </Title>
    </>
  );
};

export default withRouter(OwnerDetailTitle);
