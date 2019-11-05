import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3 } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  justify-content: space-between;
  display: inline;
  position: absolute;
  top: 85px;
  .profile {
    justify-items: center;
    display: inline-block;
    margin-top: 112px;
    margin-left: 30px;
    background: white;
    position: relative;
    width: 280px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);

    .background1 {
      background: ${palette.primary};
      position: relative;
      top: -50px;
      width: 130px;
      height: 130px;
      border-radius: 70px;
      margin: 0 auto;

      .background2 {
        margin: 0 auto;
        position: relative;
        top: 0.48rem;
        background: white;
        width: 115px;
        height: 115px;
        border-radius: 70px;
      }
    }

    @media (max-height: 768px) {
      margin-top: 85px;
    }

    @media (max-width: 425px) {
      margin-left: 19%;
    }
  }
`;

const Image = styled.div`
  background: url(${props => `${props.imgUrl}`});
  background-size: 100px 100px;
  margin: 0 auto;
  position: relative;
  top: 0.46rem;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 1;

  &.main {
    &:hover {
      opacity: 0.7;
      padding-top: 28px;
      &::before {
        content: '+';
      }
      color: white;
      text-align: center;
      font-weight: 500;
      font-size: 40px;
    }
  }
`;

const Name = styled.div`
  width: 280px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: -20px;
`;

const Keyword = styled.div`
  color: ${palette.textGray};
  font-size: 18px;
  width: 100%;
  text-align: center;
`;

const Statics = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 50px;
  background: rgba(206, 212, 218, 0.5);
  margin-top: 33px;
  padding-top: 12px;
  .detail {
    text-align: center;
    font-size: 20px;
    span {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

const OwnerInfo = ({ store, location: { pathname } }) => {
  const {
    shopName,
    imgUrl,
    foodKeyword,
    locationKeyword,
    view,
    reviewCount,
    star,
  } = store;
  return (
    <Container>
      <div className="profile">
        <div className="background1">
          <div className="background2">
            <Image
              imgUrl={imgUrl}
              className={pathname == '/figtable/owner' && 'main'}
            />
          </div>
        </div>
        <Name>{shopName}</Name>
        <Keyword>
          {locationKeyword} | {foodKeyword}
        </Keyword>
        <Statics>
          <div className="detail">
            <span>
              <FiEye /> {view}
            </span>{' '}
            |
            <span>
              <FiEdit3 /> {reviewCount}
            </span>{' '}
            |
            <span>
              <FiStar /> {star}
            </span>
          </div>
        </Statics>
      </div>
    </Container>
  );
};

export default withRouter(OwnerInfo);
