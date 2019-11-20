import React, { useEffect, useState, useCallback } from 'react';
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
import client from '../../../lib/api/client';

const LoginContainer = ({ history, location: { search } }) => {
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

  const onKakao = useCallback(() => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_RESTKEY}&redirect_uri=http://localhost:9090${process.env.PATH}/api/auth/kakao&response_type=code`;
  }, []);

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

  useEffect(() => {
    const token = search.substring(6);
    if (token.length > 0) {
      client
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_RESTKEY}&redirect_uri=http://localhost:9090${process.env.PATH}/api/auth/kakao&code=${token}`,
        )
        .then(({ request: { response } }) => {
          const accessToken = JSON.parse(response).access_token;
          console.log(accessToken);
          client
            .post(
              'https://kapi.kakao.com/v2/user/me?property_keys=["properties.nickname"]',
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'content-type':
                    'application/x-www-form-urlencoded;charset=utf-8',
                },
              },
            )
            .then(resp => console.log(resp));
        });
    }
  }, [search]);

  return (
    <>
      <HeaderSimple />
      <LoginPresenter
        form={form}
        onChange={onChange}
        onToggle={onToggle}
        onSubmit={onSubmit}
        onKakao={onKakao}
        error={error}
      />
    </>
  );
};

export default withRouter(React.memo(LoginContainer));
