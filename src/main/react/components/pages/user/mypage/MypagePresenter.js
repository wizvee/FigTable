import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import ModalLoversContainer from '../detail/ModalLoversContainer';
import MyReviews from './MyReviews';
import MyPoint from './MyPoint';

const Container = styled(Responsive)`
  padding: 2rem;
  min-height: calc(100vh - 12rem);
`;

const Profile = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
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
  margin: 0 1.5rem;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(${props => `${path}/resources/upload/profiles/${props.url}`});
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
  svg {
    margin-left: 0.5rem;
    color: ${palette.textGray};
    transform: translateY(-1px);
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
  height: 100%;
  color: ${palette.textGray};
  span {
    display: inline-flex;
    align-items: center;
    height: 100%;
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
    &.right {
      margin-left: auto;
    }
    &.selected {
      color: ${palette.primary};
      font-weight: 600;
    }
  }
  span + span {
    margin-left: 1.3rem;
  }
`;

const Section = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  border-top: 1px solid ${palette.borderLightGray};
  @media (max-width: 426px) {
    padding: 1rem 0;
  }
`;

const MypagePresenter = ({
  member,
  menu,
  reviews,
  onChangeFile,
  onMyFeed,
  onMyReviews,
  onMyPoint,
}) => {
  const [followPop, setFollowPop] = useState('');

  function openFollowPop(type) {
    setFollowPop(type);
    document.body.style.overflow = 'hidden';
  }

  function closeFollowPop() {
    setFollowPop('');
    document.body.style.overflow = 'unset';
  }

  return (
    <Container>
      {followPop == 'following' && (
        <ModalLoversContainer
          title="팔로잉"
          api={`${path}/api/member/follwing`}
          closeModal={closeFollowPop}
        />
      )}
      {followPop == 'follower' && (
        <ModalLoversContainer
          title="팔로워"
          api={`${path}/api/member/follwer`}
          closeModal={closeFollowPop}
        />
      )}
      <Profile>
        <label>
          <Pic url={member.memProfile} />
          <input type="file" name="memProfile" onChange={onChangeFile} />
        </label>
        <Info>
          <Name>
            {member.memName}
            <AiFillSetting />
          </Name>
          <Social>
            <span
              onClick={onMyFeed}
              className={menu == 'myFeed' ? 'selected' : ''}
            >
              피드
            </span>
            <span
              onClick={onMyReviews}
              className={menu == 'myReviews' ? 'selected' : ''}
            >
              리뷰 {member.memRvCnt}
            </span>
            <span onClick={() => openFollowPop('following')}>
              팔로잉 {member.followingCnt}
            </span>
            <span onClick={() => openFollowPop('follower')}>
              팔로워 {member.memFwCnt}
            </span>
            <span onClick={onMyPoint} className="right">
              😻 {new Intl.NumberFormat().format(member.memPoint)}
            </span>
            <span>🎫 {member.eatdealCnt}</span>
          </Social>
        </Info>
      </Profile>
      <Section>
        {(menu == 'myReviews' || menu == 'myFeed') && (
          <MyReviews
            title={menu == 'myReviews' ? '내가 쓴 리뷰' : '나의 피드'}
            reviews={reviews}
          />
        )}
        {menu == 'myPoint' && <MyPoint currentPoint={member.memPoint} />}
      </Section>
    </Container>
  );
};

export default React.memo(MypagePresenter);
