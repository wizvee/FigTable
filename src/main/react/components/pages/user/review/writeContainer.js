import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import WritePresenter from './WritePresenter';
import { changeField, initializeForm } from '../../../../modules/review';
import ActionButtonsContainer from './ActionButtonsContainer';

const WriteContainer = ({ history }) => {
  const disaptch = useDispatch();
  const { member, resName } = useSelector(({ member, review }) => ({
    member: member.member,
    resName: review.resName,
  }));

  if (!member) history.push('/');

  // 기본인풋 변경 이벤트 핸들러
  const onChange = ({ target }) => {
    const { value, name } = target;
    disaptch(changeField({ key: name, value }));
  };

  // 파일인풋 변경 이벤트 핸들러
  const onChangeFile = ({ target }) => {};

  // unMount 시 review 초기화
  useEffect(() => {
    return () => {
      disaptch(initializeForm());
    };
  }, [disaptch]);

  return (
    <>
      <HeaderContainer />
      <WritePresenter
        member={member}
        resName={resName}
        onChange={onChange}
        onChangeFile={onChangeFile}
        imgUrls={imgUrls}
        buttons={<ActionButtonsContainer />}
      />
    </>
  );
};

export default withRouter(WriteContainer);
