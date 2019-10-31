import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../../common/Responsive';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';

const width = '290px';

const Container = styled(Responsive)`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  min-height: calc(100vh - 12rem);
  form {
    width: ${width};
    .check {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: ${palette.textGray};
      a {
        text-decoration: underline;
        transition: color 0.2s linear;
      }
      a:hover {
        color: ${palette.primary};
      }
    }
  }
  .login {
    margin-top: 1rem;
    a {
      text-decoration: underline;
      transition: color 0.2s linear;
    }
    a:hover {
      color: ${palette.primary};
    }
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const ErrorMsg = styled.div`
  margin-top: 1rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const RegisterPresenter = ({ form, onChange, onToggle, onSubmit, error }) => {
  return (
    <Container>
      <h3>회원가입</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="memEmail"
          name="memEmail"
          placeholder="이메일 입력"
          vlaue={form.memEmail}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="memPhone"
          name="memPhone"
          placeholder="휴대전화 입력"
          vlaue={form.memPhone}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="memName"
          name="memName"
          placeholder="이름 입력"
          vlaue={form.memName}
          onChange={onChange}
        />
        <StyledInput
          autoComplate="new-password"
          name="memPassword"
          placeholder="비밀번호 (8자 이상)"
          type="password"
          vlaue={form.memPassword}
          onChange={onChange}
        />
        <StyledInput
          autoComplate="new-password"
          name="passwordConfirm"
          placeholder="비밀번호 확인 (8자 이상)"
          type="password"
          vlaue={form.passwordConfirm}
          onChange={onChange}
        />
        <div className="check">
          <label>
            <input
              type="checkbox"
              name="policies"
              checked={form.policies}
              onChange={onToggle}
            />
            (필수) 회원가입 약관 동의
          </label>
        </div>
        <div className="check">
          <label>
            <input
              type="checkbox"
              name="privacy"
              checked={form.privacy}
              onChange={onToggle}
            />
            (필수) 개인정보 수집 및 이용 동의
          </label>
        </div>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <ButtonWithMarginTop fullwidth>회원가입</ButtonWithMarginTop>
      </form>
      <div className="login">
        이미 가입하셨나요? <Link to="/figtable/login">로그인</Link>
      </div>
    </Container>
  );
};

export default RegisterPresenter;
