import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import {
  changeField,
  initializeForm,
  login,
} from '../../../modules/enrollOwner';
import Responsive from '../../common/Responsive';
import HeaderOwnerSimple from './common/HeaderOwnerSimple';
import ApplyReadyModal from './Modal/ApplyReadyModal';
import ReturnModal from './Modal/ReturnModal';

const Container = styled.div`
  padding-top: 80px;
  height: 100%;
  min-height: calc(100vh - 8rem);
`;

const ContainerWrapper = styled(Responsive)`
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
    margin-top: 1rem;
  }
`;

const Button = styled.div`
  width: 100%;
  background: ${palette.primary};
  color: white;
  opacity: 0.8;
  border-radius: 5px;
  padding: 0.5rem 0.8rem;
  margin-top: 1rem;
  text-align: center;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const EnrollContainer = styled.div`
  text-align: center;
  border: 1px solid ${palette.borderGray};
  width: 100%;
  height: auto;

  padding: 20px;
  border: 1px solid #ced4da;
  margin-top: 20px;

  .text {
    font-size: 13px;
    margin-top: 10px;
  }
`;

const EnrollButton = styled.div`
  width: 65%;
  padding: 0.3rem 0.8rem;
  border: 2px solid #868e96;
  opacity: 0.7;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 3px;
  font-size: 15px;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: #fa5252;
  font-weight: 900;
  padding-top: 20px;
`;

const OwnerLoginContainer = ({ history }) => {
  const path = process.env.PATH;
  const dispatch = useDispatch();
  const { owner, resList, loginE, loginS } = useSelector(({ enrollOwner }) => ({
    owner: enrollOwner.owner,
    resList: enrollOwner.resList,
    loginE: enrollOwner.loginE,
    loginS: enrollOwner.loginS,
  }));

  const onChange = useCallback(
    ({ target }) => {
      const { value, name } = target;
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(initializeForm('owner'));
  }, [dispatch]);

  const [error, setError] = useState(false);
  useEffect(() => {
    if (loginE) {
      setError(true);
      return;
    }
    if (loginS) {
      // dispatch(setOwner(owner));
      setError(false);
      if (owner.ownApply == 'S') {
        setReady(true);
      }
      if (owner.ownApply == 'A') {
        if (owner.ownReturn) {
          setReturnOwn(true);
        } else {
          location.href = `${path}/owner/${resList[0]}`;
        }
      }
    }
  }, [loginE, loginS, resList, dispatch]);

  useEffect(() => {
    if (!owner.ownReturn) {
      try {
        sessionStorage.setItem('owner', JSON.stringify(owner));
      } catch (e) {
        console.log('sessionStorage is not working');
      }
    }
  }, [history, owner]);

  const onSubmit = e => {
    e.preventDefault();
    const { ownEmail, ownPassword } = owner;
    dispatch(login({ ownEmail, ownPassword }));
  };

  const [ready, setReady] = useState(false);
  const readyClose = () => {
    setReady(false);
  };

  const [returnOwn, setReturnOwn] = useState(false);
  const returnClose = () => {
    setReturnOwn(false);
  };

  return (
    <>
      <HeaderOwnerSimple />
      <Container>
        <ContainerWrapper>
          <h3>로그인</h3>
          <LoginContainer>
            <StyledInput
              autoComplete="ownEmail"
              name="ownEmail"
              placeholder="이메일 입력"
              value={owner.ownEmail}
              onChange={onChange}
            />
            <StyledInput
              autoComplate="new-password"
              name="ownPassword"
              placeholder="비밀번호 입력"
              type="password"
              value={owner.ownPassword}
              onChange={onChange}
            />
            <Button onClick={onSubmit}>로그인</Button>
            {error && <ErrorMsg>로그인 실패</ErrorMsg>}
            <EnrollContainer>
              <b>회원이 아니신가요?</b>
              <br />
              <div className="text">
                회원가입과 동시에 Figtable, Figtable 파트너 사이트의 회원가입이
                진행되며, 가입 승인 시 Figtable과 Figtable 파트너 사이트를 모두
                이용하실 수 있습니다.
              </div>
              <Link to={`${path}/ownerEnroll`}>
                <EnrollButton>회원가입</EnrollButton>
              </Link>
            </EnrollContainer>
          </LoginContainer>
        </ContainerWrapper>
      </Container>
      {!ready ? '' : <ApplyReadyModal readyClose={readyClose} />}
      {!returnOwn ? (
        ''
      ) : (
        <ReturnModal ownReturn={owner.ownReturn} returnClose={returnClose} />
      )}
    </>
  );
};

export default withRouter(OwnerLoginContainer);
