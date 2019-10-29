import React from 'react';
import styled, { css } from 'styled-components';
import AdminHeader from './AdminHeader';
import InsertRestaurant from './InsertRestaurant';
import { MdLocalDining, MdEdit, MdFace, MdSpeakerNotes } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = styled.div`
  height: 20rem;
  background: url(${process.env.PATH}/images/adminTitle.jpg);
  background-size: cover;
  background-position: center center;
  margin-top: -66px;
`;

const Section = styled.section`
  height: 11.6rem;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: 5rem;

  ul: after {
    right: -21px;
  }

  .ulList {
    align-items: center;
    display: table;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0;
  }

  li {
    display: table-cell;
    width: 11%;
    vertical-align: top;
    text-align: center;
  }
  li + li {
    border-left: 1px solid #ddd;
  }
  .menu {
    padding-top: 90px;
    background: center 100px no-repeat;
  }
  .menu:hover {
    border-bottom: 3px solid #f67280;
    color: #f67280;
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3rem;
`;

const AdminContainer = () => {
  return (
    <>
      <AdminHeader />
      <Header />
      <Section>
        <div>
          <p></p>
        </div>

        <MenuList>
          <ul className="ulList">
            <li className="li">
              <Link className="menu" to="/figtable/admin/insertRestaurant">
                <IconWrapper>
                  <MdLocalDining />
                </IconWrapper>
                식당 신규 등록
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to="/figtable/admin/Restaurant">
                <IconWrapper>
                  <MdEdit />
                </IconWrapper>
                식당 정보 수정
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to="/figtable/admin/member">
                <IconWrapper>
                  <MdFace />
                </IconWrapper>
                회원 관리
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to="/figtable/admin/review">
                <IconWrapper>
                  <MdSpeakerNotes />
                </IconWrapper>
                리뷰 관리
              </Link>
            </li>
          </ul>
        </MenuList>
      </Section>
    </>
  );
};

export default AdminContainer;
