import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../../../common/HeaderContainer';
import MypagePresenter from './MypagePresenter';

const MypageContainer = () => {
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  return (
    <>
      <HeaderContainer />
      <MypagePresenter member={member} />
    </>
  );
};

export default MypageContainer;
