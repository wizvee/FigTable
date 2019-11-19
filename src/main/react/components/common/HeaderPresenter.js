import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { FiStar, FiSmile } from 'react-icons/fi';
import Responsive from './Responsive';
import palette from '../../lib/styles/Palette';
import Button from '../../lib/styles/Button';

const HeaderBlock = styled.div`
  z-index: 50;
  position: fixed;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
  ${props =>
    !props.isHome &&
    css`
      background: rgba(255, 255, 255, 0.9);
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
  .logo_m,
  .right {
    color: ${props => (props.isHome ? 'white' : palette.primary)};
  }
  .logo,
  .logo_m {
    font-size: 1.4rem;
    font-weight: 900;
    font-family: 'Patua One';
    letter-spacing: 4px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
  }
  .logo_m {
    display: none;
  }
  @media (max-width: 426px) {
    .logo {
      display: none;
    }
    .logo_m {
      display: block;
    }
    .right {
      font-size: 1.5rem;
    }
    input {
      padding: 4px 0;
    }
    button {
      padding: 0.3rem;
    }
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
  @media (max-width: 426px) {
    width: 30px;
    height: 30px;
    & + & {
      margin-left: 0.5rem;
    }
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
  @media (max-width: 426px) {
    width: 1.1rem;
    height: 1.1rem;
    font-size: 0.7rem;
  }
`;

/* 헤더가 fixed로 되어있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 */
/* 해 주는 컴포넌트 */
const Spacer = styled.div`
  height: 4rem;
`;

const HeaderPresenter = ({
  location: { pathname },
  history,
  isModal,
  openSearchModal,
  openUserModal,
  keyword,
  onChange,
  onSubmit,
  children,
}) => {
  const { recent, member } = useSelector(({ guest, member }) => ({
    recent: guest.recent,
    member: member.member,
  }));
  const [isHome, setIsHome] = useState(false);

  // url이 '/'일 때 header를 숨기고 보여주는 이벤트
  const handleScroll = useCallback(() => {
    if (window.scrollY > 250) setIsHome(false);
    else setIsHome(true);
  }, []);

  // 마이페이지 전환 함수
  const toMypage = useCallback(() => {
    history.push(`${process.env.PATH}/@${member.memName}`);
  }, [history, member]);

  useEffect(() => {
    setIsHome(false);
    if (
      pathname === `${process.env.PATH}` ||
      pathname === `${process.env.PATH}/`
    ) {
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
            <Link to={process.env.PATH}>FIGTABLE</Link>
          </div>
          <div className="logo_m">
            <Link to={process.env.PATH}>FIG</Link>
          </div>
          {!isHome && (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={keyword}
                // onClick={openSearchModal}
                onChange={onChange}
                placeholder="지역, 식당 또는 음식"
              />
              <Button type="submit">검색</Button>
            </form>
          )}
          <div className="right">
            {member && (
              <IconWrapper onClick={toMypage}>
                <FiSmile />
              </IconWrapper>
            )}
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

export default withRouter(React.memo(HeaderPresenter));
