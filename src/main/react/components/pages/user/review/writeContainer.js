import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import WritePresenter from './WritePresenter';

const WriteContainer = ({ history, match }) => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  const { resNo } = match.params;

  if (!member) history.push('/');

  return (
    <>
      <HeaderContainer />
      <WritePresenter member={member} />
    </>
  );
};

export default withRouter(WriteContainer);
