import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  toggleField,
  initializeForm,
  register,
} from '../../../modules/auth';
import { setMember } from '../../../modules/member';
import RegisterPresenter from './RegisterPresenter';
import HeaderSimple from '../../common/HeaderSimple';
import ModalAlert from '../../common/ModalAlert';

const RegisterContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const [isModal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { form, auth, authError, member } = useSelector(({ auth, member }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    member: member.member,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onToggle = ({ target }) => {
    const { name } = target;
    dispatch(toggleField(name));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const {
      memEmail,
      memPassword,
      passwordConfirm,
      memPhone,
      memName,
      policies,
      privacy,
    } = form;

    const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;
    if (
      [memEmail, memPassword, passwordConfirm, memPhone, memName].includes('')
    ) {
      // 하나라도 비어있다면
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    if (!reg.test(memPassword)) {
      // 비밀번호가 유효하지 않는다면
      setError('비밀번호가 유효하지 않습니다');
      return;
    }
    if (memPassword !== passwordConfirm) {
      // 비밀번호가 일치하지 않는다면
      setError('비밀번호가 일치하지 않습니다');
      return;
    }
    if (!policies || !privacy) {
      setError('약관을 확인해 주세요');
      return;
    }
    dispatch(register({ memEmail, memPassword, memPhone, memName }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      dispatch(setMember(auth));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (member) setModal(true);
    try {
      sessionStorage.setItem('member', JSON.stringify(member));
    } catch (e) {
      console.log('sessionStorage is not working');
    }
  }, [history, member]);

  return (
    <>
      {isModal && (
        <ModalAlert
          title="포인트"
          msg="회원가입으로 1,000😻 지급이 완료되었습니다."
          url={`${process.env.PATH}`}
        />
      )}
      <HeaderSimple />
      <RegisterPresenter
        form={form}
        onChange={onChange}
        onToggle={onToggle}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default withRouter(React.memo(RegisterContainer));
