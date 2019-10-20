import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Responsive from './Responsive';
import { FiSmile } from 'react-icons/fi';
import palette from '../../lib/styles/Palette';

const HeaderBlock = styled.div`
  z-index: 50;
  position: fixed;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
  ${props =>
    !props.isHome &&
    css`
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    `}
  ${props =>
    props.isModal &&
    css`
      box-shadow: none;
    `}
`;

/* Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 Header 컴포넌트 생성 */
const HeaderWrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    color: ${props => (props.isHome ? 'white' : palette.primary)};
  }
  .logo {
    font-size: 1.4rem;
    font-weight: 900;
    font-family: 'Patua One', cursive;
    letter-spacing: 4px;
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
  }
`;

/* 헤더가 fixed로 되어있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 */
/* 해 주는 컴포넌트 */
const Spacer = styled.div`
  height: 4rem;
`;

const Header = ({
  location: { pathname },
  isModal,
  openSearchModal,
  openUserModal,
}) => {
  const [isHome, setIsHome] = useState(false);

  // url이 '/'일 때 header를 숨기고 보여주는 이벤트
  function handleScroll() {
    if (window.scrollY > 250) setIsHome(false);
    else setIsHome(true);
  }

  useEffect(() => {
    setIsHome(false);
    if (pathname === '/figtable/' || pathname === '/figtable') {
      setIsHome(true);
      window.addEventListener('scroll', handleScroll);
    }

    // 컴포넌트가 언마운트되기 전이나 업데이트 전에 이벤트 제거
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <>
      <HeaderBlock isHome={isHome} isModal={isModal}>
        <HeaderWrapper isHome={isHome}>
          <div className="logo">
            <Link to="/figtable">FIGTABLE</Link>
          </div>
          {!isHome && (
            <form>
              <input
                type="text"
                onClick={openSearchModal}
                placeholder="지역, 식당 또는 음식"
              />
              <button type="submit">검색</button>
            </form>
          )}
          <div className="right">
            <FiSmile onClick={openUserModal} />
          </div>
        </HeaderWrapper>
      </HeaderBlock>
      {!isHome && <Spacer />}
    </>
  );
};

export default withRouter(Header);
