import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import RatingIcon from './RatingIcon';
import ReviewActionButtons from './ReviewActionButtons';
import MemberProfile from './MemberProfile';

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 100%;
  min-height: 200px;
  border-bottom: 1px solid ${palette.borderGray};
  transition: background 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .date {
    height: 1.5rem;
    font-size: 0.9rem;
    color: ${palette.textGray};
  }
  .comment {
    flex: 1;
    margin-bottom: 1rem;
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

const ImgBlock = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 2px;
  background: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.7;
  }
`;

const ReviewItem = ({ review, openInsta }) => {
  const {
    memProfile,
    memName,
    memRvCnt,
    memFwCnt,
    rvDate,
    rvContent,
    rvRating,
    rvImages,
  } = review;
  return (
    <Container>
      <MemberProfile
        picUrl={memProfile}
        name={memName}
        rvCnt={memRvCnt}
        fwCnt={memFwCnt}
      />
      <Content>
        <div className="date">{rvDate}</div>
        <div className="comment">{rvContent}</div>
        <div className="images">
          {rvImages &&
            rvImages.map((img, index) => (
              <ImgBlock key={index} url={img} onClick={() => openInsta(img)} />
            ))}
        </div>
        <ReviewActionButtons review={review} />
      </Content>
      <RatingIcon width="90px" fontSize="3rem" rating={rvRating} />
    </Container>
  );
};

export default React.memo(ReviewItem);
