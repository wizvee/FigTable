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
  }
  .option {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    width: ${width};
    font-size: 0.9rem;
    color: ${palette.textGray};
  }
  .divider {
    position: relative;
    margin-bottom: 1rem;
    width: ${width};
    height: 1rem;
    border-bottom: 1px solid ${palette.borderGray};
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 0 0.3rem;
      background: white;
      font-size: 0.9rem;
      color: ${palette.textGray};
      transform: translate(-50%, 3px);
    }
  }
  .other {
    width: ${width};
    margin-bottom: 1rem;
  }
  .register {
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
  outline: none;
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

const LoginPresenter = ({ form, onChange, onSubmit, error }) => {
  return (
    <Container>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="memEmail"
          name="memEmail"
          placeholder="이메일 입력"
          vlaue={form.memEmail}
          onChange={onChange}
        />
        <StyledInput
          autoComplate="new-password"
          name="memPassword"
          placeholder="비밀번호 입력"
          type="password"
          value={form.memPassword}
          onChange={onChange}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <ButtonWithMarginTop fullwidth>로그인</ButtonWithMarginTop>
      </form>
      <div className="option">
        <span>로그인 유지</span>
        <span>비밀번호 찾기</span>
      </div>
      <div className="divider">
        <span>또는</span>
      </div>
      <div className="other">
        <ButtonWithMarginTop fullwidth bgColor="#fed330">
          카카오톡으로 로그인
        </ButtonWithMarginTop>
      </div>
      <div className="register">
        아직 회원이 아니신가요? <Link to="/figtable/register">회원가입</Link>
      </div>
    </Container>
  );
};

export default LoginPresenter;
