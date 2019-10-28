import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';

const Wating = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  strong {
    color: ${palette.primary};
  }
  div {
    padding-bottom: 0.5rem;
  }
  button + button {
    margin-left: 5px;
  }
`;

const WaitingPresenter = ({ resWaitCnt }) => {
  return (
    <Wating>
      <div>
        최근 일주일간 대기 <strong>{resWaitCnt}</strong>건 예약{' '}
        <strong>{resWaitCnt}</strong>건이 있습니다.
      </div>
      <Button>줄서기</Button>
      <Button>예약하기</Button>
    </Wating>
  );
};

export default React.memo(WaitingPresenter);
