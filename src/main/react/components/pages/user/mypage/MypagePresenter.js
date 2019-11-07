import React from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../../../common/Responsive';
import Button from '../../../../lib/styles/Button';

const Container = styled(Responsive)`
  padding: 2rem;
  min-height: calc(100vh - 12rem);
`;

const Profile = styled.div`
  display: flex;
  label {
    cursor: pointer;
  }
  input[type='file'] {
    display: none;
    outline: none;
    pointer-events: none;
    user-select: none;
  }
`;

const path = process.env.PATH;
const Pic = styled.div`
  margin: 0 2rem;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const Info = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  div {
    padding: 0.5rem;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
`;

const ButtonWithMarginLeft = styled(Button)`
  margin-left: 1.5rem;
  border-radius: 30px;
`;

const Social = styled.div`
  height: 100%;
  span + span {
    margin-left: 1.5rem;
  }
`;

const MypagePresenter = ({ member, onChangeFile }) => {
  return (
    <Container>
      <Profile>
        <label>
          <Pic url={member.memProfile} />
          <input type="file" name="memProfile" onChange={onChangeFile} />
        </label>
        <Info>
          <Name>
            {member.memName}
            <ButtonWithMarginLeft>수정</ButtonWithMarginLeft>
          </Name>
          <Social>
            <span>리뷰 {member.memRvCnt}</span>
            <span>팔로워 0</span>
            <span>팔로잉 0</span>
          </Social>
        </Info>
      </Profile>
    </Container>
  );
};

export default React.memo(MypagePresenter);
