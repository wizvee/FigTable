import React, { useCallback } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentNeutral,
} from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

const Container = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .resInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-weight: 600;
      font-size: 1.5rem;
      color: ${palette.primary};
    }
  }
  .rating {
    display: flex;
    input {
      display: none;
      &:checked + label {
        color: ${palette.primary};
      }
    }
    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem;
      color: ${palette.textGray};
      font-size: 0.9rem;
      cursor: pointer;
      svg {
        font-size: 3rem;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .member {
    width: 100px;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  margin-right: 1rem;
  padding: 1rem;
  width: 100%;
  resize: none;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  &::placeholder {
    color: ${palette.textGray};
  }
`;

const path = process.env.PATH;
const Profile = styled.div`
  margin-bottom: 0.5rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const WritePresenter = ({ member }) => {
  return (
    <Container>
      <Title>
        <div className="resInfo">
          <span className="name">오스틴</span>
          <span>에 대한 솔직한 리뷰를 써주세요.</span>
        </div>
        <div className="rating">
          <input type="radio" name="rating" value="5" id="good" />
          <label htmlFor="good">
            <MdSentimentVerySatisfied />
            맛있어
          </label>
          <input type="radio" name="rating" value="3" id="nomal" />
          <label htmlFor="nomal">
            <MdSentimentSatisfied />
            괜찮아
          </label>
          <input type="radio" name="rating" value="1" id="bad" />
          <label htmlFor="bad">
            <MdSentimentNeutral />
            별로야
          </label>
        </div>
      </Title>
      <Content>
        <div className="member">
          <Profile url={member.memProfile} />
        </div>
        <StyledTextarea
          placeholder={`${member.memName}님, 주문하신 메뉴는 어떠셨나요? 식당의 분위기와 서비스도 궁금해요!`}
        />
      </Content>
    </Container>
  );
};

export default WritePresenter;
