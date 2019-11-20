import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import WaitingForm from './WaitingForm';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  register,
  getWaitings,
} from '../../../../modules/waiting';

const Container = styled.div`
  height: 100vmax;
`;

const Left = styled(Responsive)`
  float: left;
  width: 50%;
  height: 100%;
  background: url(${props => `${props.imgUrl}`}) no-repeat;
  top: 0;
  padding: 0;
  background-size: 50vmax;
  &.back {
    width: 100%;
    height: 100%;
    color: black;
    opacity: 0.5;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    background-size: 50vmax 100vmax;
  }
`;
const Right = styled(Responsive)`
  float: right;
  width: 50%;
  height: 100%;
`;

const Back = styled(Responsive)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const Count = styled.div`
  background: rgba(206, 212, 218, 0.8);
  text-align: center;
  width: 60%;
  height: 250px;
  position: relative;
  top: 28rem;
  left: 4rem;
  border-radius: 5px;
  font-size: 57px;
  font-weight: 900;
  padding-top: 3.2rem;
  letter-spacing: 15px;
`;

const Logo = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  padding-top: 6%;
  .logoMain,
  .logoSide {
    display: inline-block;
  }
  .logoMain {
    color: ${palette.primary};
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 4px;
    font-family: 'Patua One', cursive;
  }
  .logoSide {
    color: ${palette.textGray};
    position: relative;
    top: -1px;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: 'NanumSquareRound';
  }
`;

const WaitingPublicContainer = ({ match }) => {
  const resNo = match.params;

  const path = process.env.PATH;

  const dispatch = useDispatch();
  const { wait, waitings } = useSelector(({ ownerWaiting }) => ({
    wait: ownerWaiting.waiting,
    waitings: ownerWaiting.waitings,
  }));

  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(changeField({ key: name, value }));
  };

  const [pNumber, setPNumber] = useState();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dispatch(initializeForm('waiting'));
    dispatch(getWaitings(resNo.resNo));
  }, [dispatch]);

  const onIncrease = () => {
    let value = wait.wtPeople + 1;
    dispatch(changeField({ key: 'wtPeople', value }));
  };
  const onDecrease = () => {
    if (wait.wtPeople > 0) {
      let value = wait.wtPeople - 1;
      dispatch(changeField({ key: 'wtPeople', value }));
    }
  };

  const [error, setError] = useState('');
  const onSubmit = () => {
    const { wtName, wtPeople, wtPhone } = wait;
    if ([wtName, wtPeople, wtPhone].includes('')) {
      setError('빈칸을 모두 입력하세요');
    } else {
      dispatch(register({ wtName, resNo: resNo.resNo, wtPeople, wtPhone }));
      setError('');
    }
  };

  return (
    <>
      {waitings && (
        <Container>
          <Left imgUrl={`${path}/resources/images/publicWtThumb.jpg`}>
            <Back>
              <Count>
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: '500',
                    paddingBottom: '2.5rem',
                  }}
                >
                  현재 웨이팅
                </div>
                {waitings != null ? waitings.length : 0} 팀
              </Count>
            </Back>
          </Left>
          <Right>
            <Link to={`${path}/owner/${resNo}`}>
              <Logo>
                <div className="logoMain">FIGTABLE</div>
                &nbsp;&nbsp;
                <div className="logoSide">
                  <b>파트너</b>
                </div>
              </Logo>
            </Link>
            <WaitingForm
              wait={wait}
              onChange={onChange}
              onSubmit={onSubmit}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </Right>
        </Container>
      )}
    </>
  );
};

export default withRouter(WaitingPublicContainer);
