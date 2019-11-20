import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';

const Container = styled.div`
  padding-top: 80px;
  height: 100%;
  min-height: calc(100vh - 8rem);
`;

const ContainerWrapper = styled(Responsive)`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
`;

const LoginContainer = styled.div`
  width: 40%;
  height: auto;
  margin: 0 auto;
  margin-top: 20px;
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

const AdminLoginPresenter = ({ form, onChange, onSubmit, error }) => {
  return (
    <Container>
      <ContainerWrapper>
        <h3>로그인</h3>
        <LoginContainer>
          <form onSubmit={onSubmit}>
            <StyledInput
              autoComplete="adminEmail"
              name="adminEmail"
              placeholder="이메일 입력"
              value={form.adminEmail}
              onChange={onChange}
            />
            <StyledInput
              autoComplate="new-password"
              name="adminPassword"
              placeholder="비밀번호 입력"
              type="password"
              value={form.adminPassword}
              onChange={onChange}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <ButtonWithMarginTop fullwidth>로그인</ButtonWithMarginTop>
          </form>
        </LoginContainer>
      </ContainerWrapper>
    </Container>
  );
};

export default React.memo(AdminLoginPresenter);
