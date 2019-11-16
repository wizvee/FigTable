import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import client from '../../../../lib/api/client';
import ModalLoversItem from './ModalLoversItem';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1rem;
  width: 310px;
  height: 310px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  h3 {
    margin-top: 0;
  }
  .msg {
    padding: 70px 10px;
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

const ModalLoversContainer = ({ title, api, closeModal }) => {
  const [loversArr, setLoversArr] = useState([]);

  useEffect(() => {
    client.get(`${api}`).then(({ data }) => setLoversArr(data));
  }, []);

  return (
    <>
      <Overlay onClick={closeModal} />
      <Container>
        <h3>{title}</h3>
        {loversArr.map(lover => (
          <ModalLoversItem key={lover.memNo} lover={lover} />
        ))}
        {loversArr.length == 0 && title == '팔로잉' && (
          <div className="msg">
            사람들을 팔로잉하시면 소식을 받아볼 수 있어요! 🤩
          </div>
        )}
        {loversArr.length == 0 && title == '팔로워' && (
          <div className="msg">
            회원님을 팔로우하는 모든 사람이 여기에 표시됩니다! 😉
          </div>
        )}
      </Container>
    </>
  );
};

export default React.memo(ModalLoversContainer);
