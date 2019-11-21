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
import client, { path } from '../../../lib/api/client';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    member: member.member,
  }));

  const [error, setError] = useState(null);

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
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    window.document.body.appendChild(kakaoScript);

    kakaoScript.addEventListener('load', () => {
      Kakao.init(`${process.env.KAKAO_APIKEY}`);

      Kakao.Auth.login({
        success: function({ access_token }) {
          client
            .post(`${path}/api/auth/kakao`, access_token)
            .then(({ data }) => dispatch(setMember(data)));
        },
        fail: function(err) {
          console.log(err);
        },
      });
    });
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
