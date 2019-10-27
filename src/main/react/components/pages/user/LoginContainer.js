import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../../modules/auth';
import LoginPresenter from './LoginPresenter';
import HeaderSimple from '../../common/HeaderSimple';

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { memEmail, memPassword } = form;
    dispatch(login({ memEmail, memPassword }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch, form]);

  // 로그인 성공/실패 처리
  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      return;
    }
    if (auth) {
      if (auth) history.push('/');
      try {
        sessionStorage.setItem('member', JSON.stringify(auth));
      } catch (e) {
        console.log('sessionStorage is not working');
      }
    }
  });

  return (
    <>
      <HeaderSimple />
      <LoginPresenter
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default withRouter(LoginContainer);
