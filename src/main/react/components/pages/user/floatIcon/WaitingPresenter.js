import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 1rem;
  width: 100%;
  height: 100%;
  h4 {
    margin-top: 0;
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.primary};
    }
  }
  .cancle {
    margin-top: 2rem;
    b {
      color: ${palette.primary};
    }
  }
  .button {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    margin-top: 1rem;
    padding: 1rem 2rem;
    width: 100%;
    button {
      padding: 0.3rem 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  border: 2px dashed ${palette.borderGray};
  small {
    color: ${palette.textGray};
  }
  .remining {
    margin: 0.5rem 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 1rem;
    width: 100%;
    font-size: 0.95rem;
    b {
      font-size: 1rem;
    }
  }
  button {
    padding: 0.5rem 0;
    margin-top: 1rem;
  }
`;

const WaitingPresenter = ({ waitInfo, history, onCancle }) => {
  const dateForParse = new Date(waitInfo.WT_TIME);
  const [isCancle, setCancle] = useState(false);

  const toRes = useCallback(() => {
    document.body.style.overflow = 'unset';
    history.push(`${process.env.PATH}/restaurant/${waitInfo.RES_NO}`);
  }, []);

  return (
    <Container>
      <h3>원격 줄서기 🙋‍♀️</h3>
      <h4 onClick={toRes}>{waitInfo.RES_NAME}</h4>
      {isCancle ? (
        <>
          <div className="cancle">
            정말 줄서기를 <b>취소</b>할까요? 😮
          </div>
          <div className="button">
            <Button onClick={onCancle}>확인</Button>
            <Button onClick={() => setCancle(!isCancle)}>취소</Button>
          </div>
        </>
      ) : (
        <Content>
          <small>내 앞 대기</small>
          <div className="remining">{waitInfo.WT_REMAINING}팀</div>
          <div className="info">
            <span>인원</span>
            <span>
              총 <b>{waitInfo.WT_PEOPLE}</b>명
            </span>
            <span>등록시간</span>
            <span>
              <b>{dateForParse.getHours()}</b>시{' '}
              <b>{dateForParse.getMinutes()}</b>분
            </span>
          </div>
          <Button fullwidth onClick={() => setCancle(!isCancle)}>
            취소하기
          </Button>
        </Content>
      )}
    </Container>
  );
};

export default withRouter(React.memo(WaitingPresenter));
