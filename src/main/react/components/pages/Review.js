import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import {
  MdModeEdit,
  MdPeople,
  MdSentimentSatisfied,
  MdSentimentNeutral,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import path from '../Path';

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 100%;
  min-height: 200px;
  border-bottom: 1px solid ${palette.borderGray};
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
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  color: ${palette.primary};
  svg {
    font-size: 3rem;
  }
`;

const ReviewPresenter = ({ review }) => {
  const { profile, nickname, rvCnt, flCnt, date, comment, rating } = review;
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
      </Content>
      {rating === 'good' && (
        <Icon>
          <MdSentimentSatisfied />
          <span>맛있</span>
        </Icon>
      )}
      {rating === 'nomal' && (
        <Icon>
          <MdSentimentNeutral />
          <span>괜찮</span>
        </Icon>
      )}
      {rating === 'bad' && (
        <Icon>
          <MdSentimentDissatisfied />
          <span>별로</span>
        </Icon>
      )}
    </Container>
  );
};

export default ReviewPresenter;
