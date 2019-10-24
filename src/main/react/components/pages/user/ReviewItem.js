import React from 'react';
import path from '../../Path';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { MdModeEdit, MdPeople } from 'react-icons/md';
import RatingIcon from './RatingIcon';

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

const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 110px;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const Nickname = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;

const Data = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  color: ${palette.textGray};
  svg {
    margin-right: 2px;
    font-size: 0.9rem;
    transform: translateY(2px);
  }
  span + span {
    margin-left: 5px;
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
      margin-left: 10px;
    }
  }
`;

const ImgBlock = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 3px;
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
    profile,
    nickname,
    rvCnt,
    flCnt,
    date,
    comment,
    rating,
    images,
  } = review;
  return (
    <Container>
      <User>
        <Profile url={profile} />
        <Nickname>{nickname}</Nickname>
        <Data>
          <span>
            <MdModeEdit />
            {rvCnt}
          </span>
          <span>
            <MdPeople />
            {flCnt}
          </span>
        </Data>
      </User>
      <Content>
        <div className="date">{date}</div>
        <div className="comment">{comment}</div>
        <div className="images">
          {images &&
            images.map((img, index) => (
              <ImgBlock key={index} url={img} onClick={() => openInsta(img)} />
            ))}
        </div>
      </Content>
      <RatingIcon width="90px" fontSize="3rem" rating={rating} />
    </Container>
  );
};

export default ReviewItem;
