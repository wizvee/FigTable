import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import client, { path } from '../../../../lib/api/client';
import { check } from '../../../../modules/member';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  margin: 0 auto;
  p {
    text-align: center;
    b {
      color: ${palette.primary};
    }
  }
`;

const Receipt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.93rem;
  svg {
    margin: 0 0.4rem;
    color: ${palette.textGray};
    font-size: 1rem;
    transform: translateY(3px);
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const ErrorMsg = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
  margin-left: auto;
`;

const MyWarn = ({ member }) => {
  const dispatch = useDispatch();
  const { memPoint, memWrCnt } = member;
  const [warns, setWarns] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (memPoint >= memWrCnt * 600) setWarns(memWrCnt);
    else setWarns(Math.floor(memPoint / 600));
  }, []);

  const onIncrease = useCallback(() => {
    if (memPoint >= (warns + 1) * 600) setWarns(warns + 1);
    else setError('😿이 부족해 더 이상의 경고는 줄일 수 없어요!');
  }, [warns]);

  const onDecrease = useCallback(() => {
    if (warns > 0) setWarns(warns - 1);
    setError('');
  }, [warns]);

  const onSubmit = useCallback(async () => {
    if (warns == 0) {
      setError('0개는 줄일 수 없어요! 😥');
      return;
    }
    await client
      .patch(`${path}/api/member/warn/?warns=${warns}`)
      .then(() => dispatch(check(member.memNo)))
      .then(() => {
        setWarns(0);
        setError('');
      });
  }, [warns, memPoint]);

  return (
    <div>
      <h3>블랙리스트 풀기</h3>
      <Container>
        <p>
          경고는 1회 당 <b>600</b>😺을 소모합니다.
        </p>
        <Receipt>
          <span>없앨 🚨 갯수는?</span>
          <div>
            <MdRemoveCircleOutline onClick={onDecrease} />
            <span>{warns}</span>
            <MdAddCircleOutline onClick={onIncrease} />
          </div>
        </Receipt>
        <ButtonWithMarginTop onClick={onSubmit}>풀기</ButtonWithMarginTop>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Container>
    </div>
  );
};

export default React.memo(MyWarn);
