import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  initializeForm,
  login,
  toggleField,
} from '../../../modules/auth';
import { setMember } from '../../../modules/member';
import LoginPresenter from './LoginPresenter';
import HeaderSimple from '../../common/HeaderSimple';

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    member: member.member,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  const onToggle = ({ target: { name } }) =>
    dispatch(toggleField({ form: 'login', key: name }));

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { memEmail, memPassword } = form;
    dispatch(login({ memEmail, memPassword }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // 로그인 성공/실패 처리
  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      return;
    }
    if (auth) {
      dispatch(setMember(auth));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (member) history.goBack();
    try {
      sessionStorage.setItem('member', JSON.stringify(member));
      if (member && form.isKeep)
        localStorage.setItem('member', JSON.stringify(member));
    } catch (e) {
      console.log('sessionStorage is not working');
    }
  }, [history, member]);

  return (
    <>
      <HeaderSimple />
      <LoginPresenter
        form={form}
        onChange={onChange}
        onToggle={onToggle}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default withRouter(React.memo(LoginContainer));
