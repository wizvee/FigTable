import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SelectShopModal from '../Modal/SelectShopModal';
import LogoutModal from '../Modal/LogoutModal';

const Header = styled.div`
  width: 100%;
  background: white;
  position: absolute;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Responsive)`
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  .logoMain,
  .logoSide {
    display: inline-block;
  }
  .logoMain {
    color: ${palette.primary};
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 4px;
    font-family: 'Patua One', cursive;
  }
  .logoSide {
    color: ${palette.textGray};
    position: relative;
    top: -1px;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: 'NanumSquareRound';
  }
  .info {
    .icon {
      display: inline-block;
      position: relative;
      top: 2px;
    }
    font-family: 600;
    &:hover {
      color: #868e96;
      cursor: pointer;
    }
  }
`;

const Button = styled.div`
  width: 120px;
  height: 30px;
  background: #868e96;
  text-align: center;
  color: white;
  padding-top: 0.3rem;
  position: relative;
  left: 25%;
  top: 4%;
  font-size: 14px;
  opacity: 0.8;
  border-radius: 3px;

  @media (max-width: 1024px) {
    left: 16%;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
const HeaderOwner = ({ ownerInfo, match }) => {
  const path = process.env.PATH;
  const { ownName, resCount, no, name } = ownerInfo;
  const { resNo } = match.params;
  const [selectShopModal, setSelectShopModal] = useState(false);
  const shopModalOpen = () => {
    setSelectShopModal(true);
    document.body.style.overflow = 'hidden';
  };
  const shopModalClose = () => {
    setSelectShopModal(false);
    document.body.style.overflow = 'scroll';
  };

  const [out, setOut] = useState(false);
  const LogoutModalOpen = () => {
    setOut(true);
  };
  const LogoutModalClose = () => {
    setOut(false);
  };
  return (
    <>
      <Header>
        <Wrapper>
          <div className="logo">
            <Link to={`${path}/owner/${resNo}`}>
              <div className="logoMain">FIGTABLE</div>
              &nbsp;&nbsp;
              <div className="logoSide">
                <b>파트너</b>
              </div>
            </Link>
          </div>
          <Button onClick={shopModalOpen}>다른 매장 관리</Button>
          <div className="info" onClick={LogoutModalOpen}>
            <b>{ownName}</b> 파트너님
            <div className="icon">
              &nbsp;
              <MdSettings />
            </div>
          </div>
        </Wrapper>
      </Header>
      {!selectShopModal ? null : (
        <SelectShopModal
          resCount={resCount}
          no={no}
          name={name}
          shopModalClose={shopModalClose}
        />
      )}
      {!out ? null : <LogoutModal LogoutModalClose={LogoutModalClose} />}
    </>
  );
};

export default withRouter(HeaderOwner);
