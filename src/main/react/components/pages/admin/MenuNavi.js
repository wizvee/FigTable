import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdLocalDining, MdEdit, MdFace, MdSpeakerNotes } from 'react-icons/md';
import { Link, withRouter } from 'react-router-dom';
import Responsive from '../../common/Responsive';

const MenuBlock = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.1);
  top: 60px;
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
  width: 60%;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
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
`;

const MenuNavi = ({ location: { pathname }, subTitle }) => {
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

  const [isHome, setIsHome] = useState(false);

  function handleScroll() {
    if (window.scrollY > 64) setIsHome(false);
    else setIsHome(true);
  }

  useEffect(() => {
    setIsHome(false);
    if (window.scrollY < 64) setIsHome(true);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  //

  return (
    <>
      <MenuBlock isHome={isHome}>
        <HeaderWrapper>
          <TitleWrapper>
            <h3>{subTitle}</h3>
          </TitleWrapper>

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
                      <MdEdit />
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
                    <IconWrapper4>
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
