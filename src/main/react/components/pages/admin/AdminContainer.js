import React from 'react';
import styled from 'styled-components';
import AdminHeader from './AdminHeader';
import { MdLocalDining, MdFace, MdSpeakerNotes } from 'react-icons/md';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = styled.div`
  height: 20rem;
  background: url(${process.env.PATH}/resources/images/adminTitle.jpg);
  background-size: cover;
  background-position: center center;
  margin-top: -66px;
`;

const Section = styled.section`
  height: 12.5rem;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: 8rem;

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
  const path = process.env.PATH;
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
              <Link className="menu" to={`${path}/admin/enroll`}>
                <IconWrapper>
                  <MdLocalDining />
                </IconWrapper>
                매장 등록 / 폐업
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to={`${path}/admin/qna`}>
                <IconWrapper>
                  <FaComments />
                </IconWrapper>
                문의 내역
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to={`${path}/admin/owner`}>
                <IconWrapper>
                  <MdFace />
                </IconWrapper>
                사장님 승인
              </Link>
            </li>
            <li className="li">
              <Link className="menu" to={`${path}/admin/review`}>
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
