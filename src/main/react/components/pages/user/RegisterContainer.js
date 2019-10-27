import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, register } from '../../../modules/auth';
import RegisterPresenter from './RegisterPresenter';
import HeaderSimple from '../../common/HeaderSimple';

const RegisterContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { memEmail, memPassword, passwordConfirm, memPhone, memName } = form;
    if (memPassword !== passwordConfirm) {
      // TODO: 오류 처리
      return;
    }
    dispatch(register({ memEmail, memPassword, memPhone, memName }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch, form]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError, dispatch]);

  return (
    <>
      <HeaderSimple />
      <RegisterPresenter form={form} onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};

export default withRouter(RegisterContainer);
