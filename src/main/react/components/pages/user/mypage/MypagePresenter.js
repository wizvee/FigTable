import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import ModalLoversContainer from '../detail/ModalLoversContainer';
import MyReviews from './MyReviews';
import MyPoint from './MyPoint';
import MyCoupon from './MyCoupon';
import EditProfileContainer from './EditProfileContainer';
import MyWarn from './MyWarn';

const Container = styled(Responsive)`
  padding: 2rem;
  min-height: calc(100vh - 12rem);
  @media (max-width: 426px) {
    padding: 1rem;
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
  @media (max-width: 426px) {
    margin-bottom: 1rem;
  }
  label {
    display: inline-flex;
    justify-content: center;
    margin: 0 1.5rem;
    cursor: pointer;
    @media (max-width: 426px) {
      margin: 0;
    }
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
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(${props => `${path}/resources/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
  @media (max-width: 426px) {
    width: 60px;
    height: 60px;
  }
`;

const Info = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  div {
    padding: 0.5rem;
  }
  @media (max-width: 426px) {
    div {
      padding: 0.1rem;
    }
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  @media (max-width: 426px) {
    padding-left: 0.4rem !important;
  }
  &.stop {
    color: #fa5252;
  }
  svg {
    margin: 0 0.6rem 0 0.3rem;
    color: ${palette.textGray};
    transform: translateY(-1px);
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
  .warn {
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
  height: 100%;
  color: ${palette.textGray};
  @media (max-width: 426px) {
    position: absolute;
    bottom: 0;
    right: 0;
    justify-content: space-around;
  }
  span {
    display: inline-flex;
    align-items: center;
    height: 100%;
    transition: color 0.2s linear;
    cursor: pointer;
    @media (max-width: 426px) {
      align-items: flex-end;
    }
    &:hover {
      color: ${palette.text};
    }
    &.right {
      margin-left: auto;
      @media (max-width: 426px) {
        margin-left: 0.7rem;
      }
    }
    &.selected {
      color: ${palette.primary};
      font-weight: 600;
    }
  }
  span + span {
    margin-left: 1.3rem;
    @media (max-width: 426px) {
      margin-left: 0.7rem;
    }
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
  rvLoading,
  fdLoading,
  onChangeFile,
  onMyFeed,
  onMyReviews,
  onMyPoint,
  onMyCoupon,
  onEdit,
  onWarn,
}) => {
  const [followPop, setFollowPop] = useState('');

  const openFollowPop = useCallback(type => {
    setFollowPop(type);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeFollowPop = useCallback(() => {
    setFollowPop('');
    document.body.style.overflow = 'unset';
  });

  const setWarnIcon = useCallback(() => {
    let arr = [];
    for (let i = 0; i < member.memWrCnt; i++) {
      arr.push(
        <span key={i} onClick={onWarn} className="warn">
          🚨
        </span>,
      );
    }
    return arr;
  }, [member]);

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
          <Name className={member.memWrCnt >= 3 ? 'stop' : ''}>
            {member.memName}
            <AiFillSetting onClick={onEdit} />
            {setWarnIcon()}
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
            <span onClick={onMyCoupon}>🎫 {member.eatdealCnt}</span>
          </Social>
        </Info>
      </Profile>
      <Section>
        {(menu == 'myReviews' || menu == 'myFeed') && (
          <MyReviews
            title={menu == 'myReviews' ? '내가 쓴 리뷰' : '나의 피드'}
            reviews={reviews}
            rvLoading={rvLoading}
            fdLoading={fdLoading}
          />
        )}
        {menu == 'myPoint' && <MyPoint currentPoint={member.memPoint} />}
        {menu == 'myCoupon' && <MyCoupon currentCoupon={member.eatdealCnt} />}
        {menu == 'edit' && <EditProfileContainer member={member} />}
        {menu == 'warn' && <MyWarn member={member} />}
      </Section>
    </Container>
  );
};

export default React.memo(MypagePresenter);
