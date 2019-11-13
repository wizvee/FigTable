import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdLocalDining, MdFace, MdSpeakerNotes } from 'react-icons/md';
import { FaComments } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';
import Responsive from '../../common/Responsive';
import SearchTemplate from './SearchTemplate';

const MenuBlock = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.1);
  top: 60px;
  z-index: 9999;
  ${props =>
    !props.isHome &&
    css`
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      top: 0;
    `}
  .title {
    margin-left: 10px;
    float: right;
    justify-content: center;
    font-size: 1.2rem;
    color: '#474747';
  }
`;

const HeaderWrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-between;
  margin: 20;
  height: 4rem;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 30%;

  .ulList {
    align-items: center;
    display: table;
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

const SearchWrapper = styled.div`
  width: 70%;
`;

const IconWrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${props => (props.isInsertRes ? '#f67280' : '#474747')};
`;
const IconWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${props => (props.isResList ? '#f67280' : '#474747')};
`;
const IconWrapper3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${props => (props.isOwnList ? '#f67280' : '#474747')};
`;
const IconWrapper4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  color: ${props => (props.isRevList ? '#f67280' : '#474747')};
`;

const MenuNavi = ({
  location: { pathname },
  subTitle,
  onSubmit,
  input,
  onReset,
}) => {
  //주소값 비교 후 css 바꾸기
  const isInsertRes =
    pathname === '/figtable/admin/enroll' ||
    pathname === '/figtable/admin/enroll/';
  const isResList =
    pathname === '/figtable/admin/restaurant' ||
    pathname === '/figtable/admin/restaurant/';
  const isOwnList =
    pathname === '/figtable/admin/owner' ||
    pathname === '/figtable/admin/owner/';
  const isRevList =
    pathname === '/figtable/admin/review' ||
    pathname === '/figtable/admin/review/';

  const [isHome, setIsHome] = useState(false);

  function handleScroll() {
    if (window.scrollY > 60) setIsHome(false);
    else setIsHome(true);
  }

  useEffect(() => {
    setIsHome(false);
    if (window.scrollY < 60) setIsHome(true);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <>
      <MenuBlock isHome={isHome}>
        <HeaderWrapper>
          <TitleWrapper>
            <h3>{subTitle}</h3>
          </TitleWrapper>
          <SearchWrapper>
            {isOwnList && (
              <SearchTemplate
                onSubmit={onSubmit}
                input={input}
                onReset={onReset}
              />
            )}
          </SearchWrapper>
          <MenuList>
            <div>
              <ul className="ulList">
                <li>
                  <Link className="menu" to="/figtable/admin/enroll">
                    <IconWrapper1 isInsertRes={isInsertRes}>
                      <MdLocalDining />
                    </IconWrapper1>
                  </Link>
                </li>
                <li className="li">
                  <Link className="menu" to="/figtable/admin/restaurant">
                    <IconWrapper2 isResList={isResList}>
                      <FaComments />
                    </IconWrapper2>
                  </Link>
                </li>
                <li className="li">
                  <Link className="menu" to="/figtable/admin/owner">
                    <IconWrapper3 isOwnList={isOwnList}>
                      <MdFace />
                    </IconWrapper3>
                  </Link>
                </li>
                <li className="li">
                  <Link className="menu" to="/figtable/admin/review">
                    <IconWrapper4 isRevList={isRevList}>
                      <MdSpeakerNotes />
                    </IconWrapper4>
                  </Link>
                </li>
              </ul>
            </div>
          </MenuList>
        </HeaderWrapper>
      </MenuBlock>
    </>
  );
};

export default withRouter(MenuNavi);
