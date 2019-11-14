import React, { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
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
    height: auto;
    min-height: 300px;
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
  #thLabel {
    padding: 2.6rem 3.15rem;
    z-index: 999;
    position: relative;
    top: -52px;
    left: 7px;
    border-radius: 70px;
    &::before {
      content: '';
    }
    &:hover {
      padding: 1.7rem 2.4rem;
      color: white;
      text-align: center;
      font-weight: 500;
      font-size: 40px;
      position: relative;
      top: -67px;
      left: 7px;
      background: black;
      opacity: 0.3;
      &::before {
        content: '+';
        color: white;
        text-align: center;
        font-weight: 500;
        font-size: 40px;
      }
    }
  }
  input[type='file'] {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
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
`;

const Name = styled.div`
  width: 280px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: -20px;
`;

const Keyword = styled.div`
  color: ${palette.textGray};
  font-size: 17px;
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
  margin-bottom: 15px;
  padding-top: 12px;

  .detail {
    text-align: center;
    font-size: 19px;
    span {
      margin-left: 10px;
      margin-right: 10px;

      svg {
        position: relative;
        top: 2px;
      }
    }
  }
`;

const OwnerInfo = ({ store, location: { pathname }, onChangeFile }) => {
  const path = process.env.PATH;
  useEffect(() => {
    const resName = document.getElementById('resName').textContent;

    document.getElementById('resName').style.fontSize =
      (resName.length > 8 && resName.length < 19 && '18px') ||
      (resName.length > 18 && '23px');
  });

  const {
    resNo,
    resName,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    resViews,
    resRating,
    resReviews,
  } = store;

  console.log(resThumb.substring(0, 4));
  return (
    <Container>
      <div className="profile">
        <div className="background1">
          <div className="background2">
            <Image
              imgUrl={
                resThumb.substring(0, 4) == 'http'
                  ? resThumb
                  : `${path}/resources/upload/restaurant/${resThumb}`
              }
            />
            {pathname == `${path}/owner/${resNo}` && (
              <>
                <label id="thLabel" htmlFor="thumb" />
                <input
                  type="file"
                  id="thumb"
                  type="file"
                  name="resThumb"
                  multiple="multiple"
                  onChange={onChangeFile}
                />
              </>
            )}
          </div>
        </div>
        <Name id="resName">{resName}</Name>
        <Keyword>
          {resLocationKeyword} | {resFoodKeyword}
        </Keyword>
        <Statics>
          <div className="detail">
            <span>
              <FiEye /> {resViews}
            </span>{' '}
            |
            <span>
              <FiEdit3 /> {resReviews}
            </span>{' '}
            |
            <span>
              <FiStar /> {resRating}
            </span>
          </div>
        </Statics>
      </div>
    </Container>
  );
};

export default withRouter(OwnerInfo);
