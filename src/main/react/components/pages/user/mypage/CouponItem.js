import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { path } from '../../../../lib/api/client';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  height: 12rem;
  border-radius: 4px;
  background: #f1f3f5;
  overflow: hidden;
  & + & {
    margin-top: 1rem;
  }
  &:hover {
    .toRes {
      visibility: visible;
      opacity: 1;
    }
  }
  .used,
  .toRes {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.borderGray};
    background: rgba(255, 255, 255, 0.6);
    strong {
      font-size: 1.1rem;
    }
  }
  .toRes {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    cursor: pointer;
  }
  .discount {
    position: absolute;
    right: 0;
    top: 1rem;
    padding: 0 0.5rem;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: rgba(20, 203, 178, 0.7);
    font-size: 2.5rem;
    font-family: 'Patua One';
    text-shadow: 2px 2px 0 ${palette.borderGray};
    color: #fff;
  }
  .original {
    position: absolute;
    right: 1rem;
    top: 7rem;
    color: #fff;
    font-size: 1.3rem;
    text-decoration: line-through;
  }
  .savePrice {
    position: absolute;
    right: 1rem;
    top: 9rem;
    color: #fff;
    font-size: 1.7rem;
    font-weight: 600;
    text-shadow: 2px 2px 0 ${palette.textGray};
  }
`;

const Detail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  .title {
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Patua One';
    text-shadow: 2px 2px 0 ${palette.borderGray};
  }
  .barcode {
    font-size: 4rem;
    font-family: 'Libre Barcode 39';
    transform: translateY(2rem);
  }
  .res {
    margin-top: 1rem;
  }
`;

const Thumb = styled.div`
  width: 60%;
  height: 100%;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  transform: skewX(-20deg) translateX(5rem);
  opacity: 0.6;
`;

const CouponItem = ({ coupon, history }) => {
  return (
    <Container>
      {coupon.BUY_STATUS == 'U' && (
        <div className="used">
          <strong>이미 사용된 잇딜입니다.</strong>&nbsp;🙇‍♀️
        </div>
      )}
      {coupon.BUY_STATUS != 'U' && (
        <div
          className="toRes"
          onClick={() => history.push(`${path}/restaurant/${coupon.RES_NO}`)}
        >
          <strong>맛집 정보 보러 가기</strong>&nbsp;👉
        </div>
      )}
      <Detail>
        <div className="title">EAT DEAL</div>
        <div className="res">{coupon.RES_NAME}</div>
        <div>{coupon.EAT_FOOD_NAME}</div>
        <div className="barcode">{(coupon.PAY_NO, coupon.RES_NO)}</div>
      </Detail>
      <Thumb
        url={
          coupon.THUMB.substring(0, 4) == 'http'
            ? coupon.THUMB
            : `${process.env.PATH}/resources/upload/eatdeal/${resThumb}`
        }
      />
      <div className="discount">-{coupon.EAT_DISCOUNT * 100}%</div>
      <div className="original">
        \{new Intl.NumberFormat().format(coupon.EAT_ORIGINPRICE)}
      </div>
      <div className="savePrice">
        \
        {new Intl.NumberFormat().format(
          coupon.EAT_ORIGINPRICE * (1 - coupon.EAT_DISCOUNT),
        )}
      </div>
    </Container>
  );
};

export default withRouter(React.memo(CouponItem));
