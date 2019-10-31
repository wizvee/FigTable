import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';

const WriteContainer = ({ history }) => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  if (!member) history.push('/');

  return (
    <>
      <HeaderContainer />
      <div>로그인함</div>
    </>
  );
};

export default withRouter(WriteContainer);
