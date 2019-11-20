import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  initializeForm,
  login,
} from '../../../modules/adminLogin';
import AdminHeaderSimple from './AdminHeaderSimple';
import AdminLoginPresenter from './AdminLoginPresenter';

const AdminLoginContainer = ({ history }) => {
  const path = process.env.PATH;
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, admin, adminError } = useSelector(({ adminLogin }) => ({
    form: adminLogin.login,
    admin: adminLogin.admin,
    adminError: adminLogin.adminError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { adminEmail, adminPassword } = form;
    dispatch(login({ adminEmail, adminPassword }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // 로그인 성공/실패 처리
  useEffect(() => {
    if (adminError) {
      setError('로그인 실패');
      return;
    }
    if (admin) {
      location.href = `${path}/admin`;
    }
  }, [admin, adminError, dispatch]);

  return (
    <>
      <AdminHeaderSimple />
      <AdminLoginPresenter
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default withRouter(AdminLoginContainer);
