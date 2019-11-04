import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { FiStar, FiSmile } from 'react-icons/fi';
import Responsive from './Responsive';
import palette from '../../lib/styles/Palette';

const HeaderBlock = styled.div`
  z-index: 50;
  position: fixed;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
  ${props =>
    !props.isHome &&
    css`
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `}
  ${props =>
    props.isModal &&
    css`
      box-shadow: none;
    `}
`;

/* Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 Header 컴포넌트 생성 */
const HeaderWrapper = styled(Responsive)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  .logo,
  .right {
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
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`;

// 최근 본 맛집 알림 뱃지
const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  border: 2px solid white;
  border-radius: 50%;
  background: ${palette.primary};
  width: 1.4rem;
  height: 1.4rem;
  color: white !important;
  font-size: 0.75rem;
`;

/* 헤더가 fixed로 되어있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 */
/* 해 주는 컴포넌트 */
const Spacer = styled.div`
  height: 4rem;
`;

const HeaderPresenter = ({
  location: { pathname },
  isModal,
  openSearchModal,
  openUserModal,
  keyword,
  onChange,
  children,
}) => {
  const { recent } = useSelector(({ guest }) => ({ recent: guest.recent }));
  const [isHome, setIsHome] = useState(false);

  // url이 '/'일 때 header를 숨기고 보여주는 이벤트
  const handleScroll = useCallback(() => {
    if (window.scrollY > 250) setIsHome(false);
    else setIsHome(true);
  }, []);

  useEffect(() => {
    setIsHome(false);
    if (pathname === '/figtable/' || pathname === '/figtable') {
      if (window.scrollY < 250) setIsHome(true);
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
                value={keyword}
                onClick={openSearchModal}
                onChange={onChange}
                placeholder="지역, 식당 또는 음식"
              />
              <button type="submit">검색</button>
            </form>
          )}
          <div className="right">
            <IconWrapper>
              <FiSmile />
            </IconWrapper>
            <IconWrapper onClick={openUserModal}>
              <Badge>{recent.length}</Badge>
              <FiStar />
            </IconWrapper>
          </div>
          {children}
        </HeaderWrapper>
      </HeaderBlock>
      {!isHome && <Spacer />}
    </>
  );
};

export default withRouter(HeaderPresenter);
