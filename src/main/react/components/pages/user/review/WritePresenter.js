import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentNeutral,
} from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import MemberProfile from '../MemberProfile';

const Container = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
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
  .profile {
    margin-top: 0.2rem;
  }
  .review {
    width: 100%;
    padding: 0 1rem;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
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

const ImgUploadBlock = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.7rem;
  padding: 0 1px;
  input[type='file'] {
    outline: none;
    display: none;
    pointer-events: none;
    user-select: none;
  }
  label {
    display: inline-block;
    width: 90px;
    height: 90px;
    border-radius: 2px;
    border: 1px dashed ${palette.borderGray};
    color: ${palette.borderGray};
    transition: all 0.2s linear;
    cursor: pointer;
    svg {
      position: relative;
      top: 50%;
      left: 50%;
      font-size: 1.5rem;
      transform: translate(-50%, -50%);
    }
  }
`;

const Preview = styled.div`
  display: inline-block;
  width: 90px;
  height: 90px;
  margin-right: 5px;
  border-radius: 2px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const WritePresenter = ({
  member,
  resName,
  onChange,
  onChangeFile,
  rvImages,
  buttons,
}) => {
  return (
    <Container>
      <Title>
        <div className="resInfo">
          <span className="name">{resName}</span>
          <span>에 대한 솔직한 리뷰를 써주세요.</span>
        </div>
        <div className="rating">
          <input
            type="radio"
            name="rvRating"
            value="5"
            id="good"
            onChange={onChange}
          />
          <label htmlFor="good">
            <MdSentimentVerySatisfied />
            맛있어
          </label>
          <input
            type="radio"
            name="rvRating"
            value="3"
            id="nomal"
            onChange={onChange}
          />
          <label htmlFor="nomal">
            <MdSentimentSatisfied />
            괜찮아
          </label>
          <input
            type="radio"
            name="rvRating"
            value="1"
            id="bad"
            onChange={onChange}
          />
          <label htmlFor="bad">
            <MdSentimentNeutral />
            별로야
          </label>
        </div>
      </Title>
      <Content>
        <div className="profile">
          <MemberProfile
            picSize="60px"
            picUrl={member.memProfile}
            name={member.memName}
            rvCnt={member.memRvCnt}
            fwCnt={member.memFwCnt}
          />
        </div>
        <div className="review">
          <StyledTextarea
            name="rvContent"
            minRows={4}
            placeholder={`${member.memName}님, 주문하신 메뉴는 어떠셨나요? 식당의 분위기와 서비스도 궁금해요!`}
            onChange={onChange}
          />
          <ImgUploadBlock>
            {rvImages.length != 0 &&
              rvImages.map((img, i) => <Preview key={i} url={img} />)}
            <label>
              <FiPlus />
              <input
                type="file"
                name="rvImages"
                multiple="multiple"
                onChange={onChangeFile}
              />
            </label>
          </ImgUploadBlock>
          {buttons}
        </div>
      </Content>
    </Container>
  );
};

export default React.memo(WritePresenter);
