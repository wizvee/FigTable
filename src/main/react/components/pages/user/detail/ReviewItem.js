import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import RatingIcon from '../RatingIcon';
import MemberProfile from '../MemberProfile';
import ReviewActionButtonLoves from './ReviewActionButtonLoves';
import ReviewActionButtonCmts from './ReviewActionButtonCmts';
import ReviewActionButtonWarn from './ReviewActionButtonWarn';

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 1rem 0;
  width: 100%;
  min-height: 200px;
  border-bottom: 1px solid ${palette.borderLightGray};
  transition: background 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  .warn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    strong {
      font-size: 1.1rem;
    }
  }
`;

const Content = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  .date {
    height: 1.5rem;
    font-size: 0.9rem;
    color: ${palette.textGray};
  }
`;

const Detail = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  &:hover {
    .toRes {
      visibility: visible;
      opacity: 1;
    }
  }
  .toRes {
    visibility: hidden;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1.5px dashed ${palette.borderGray};
    background: rgba(255, 255, 255, 0.6);
    opacity: 0;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    cursor: pointer;
    strong {
      font-size: 1.1rem;
    }
  }
  .images {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 120px;
    overflow-x: auto;
    div + div {
      margin-left: 7px;
    }
  }
`;

const path = process.env.PATH;
const ImgBlock = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 2px;
  background: url(${props => `${path}/resources/upload/reviews/${props.url}`});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 426px) {
    width: 70px;
    height: 70px;
  }
`;

const ReviewActionButtons = styled.div`
  position: relative;
  padding-top: 0.8rem;
  width: 100%;
`;

const ReviewItem = ({ review, openInsta, toRes }) => {
  const {
    resNo,
    memProfile,
    memName,
    memRvCnt,
    memFwCnt,
    rvDate,
    rvContent,
    rvRating,
    rvImages,
    rvWarn,
  } = review;

  return (
    <Container>
      {rvWarn && (
        <div className="warn">
          🚨&nbsp;<strong>신고된 리뷰입니다.</strong>&nbsp;🚨
        </div>
      )}
      <MemberProfile
        picUrl={memProfile}
        name={memName}
        rvCnt={memRvCnt}
        fwCnt={memFwCnt}
      />
      <Content>
        <div className="date">{rvDate}</div>
        <Detail>
          {toRes && (
            <div onClick={() => toRes(resNo)} className="toRes">
              <strong>맛집 정보 보러 가기</strong>&nbsp;👉
            </div>
          )}
          <div>{rvContent}</div>
          <div className="images">
            {rvImages &&
              rvImages.map((img, index) => (
                <ImgBlock
                  key={index}
                  url={img}
                  onClick={openInsta ? () => openInsta(img) : undefined}
                />
              ))}
          </div>
        </Detail>
        <ReviewActionButtons>
          <ReviewActionButtonLoves review={review} />
          <ReviewActionButtonCmts review={review} />
          <ReviewActionButtonWarn review={review} />
        </ReviewActionButtons>
      </Content>
      <RatingIcon width="90px" fontSize="3rem" rating={rvRating} />
    </Container>
  );
};

export default React.memo(ReviewItem);
