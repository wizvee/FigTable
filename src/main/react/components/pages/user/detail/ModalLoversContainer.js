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
`;

const ModalLoversContainer = ({ rvNo, closeModal }) => {
  const [loversArr, setLoversArr] = useState([]);

  useEffect(() => {
    client
      .get(`/figtable/api/review/loves/${rvNo}`)
      .then(({ data }) => setLoversArr(data));
  }, []);

  return (
    <>
      <Overlay onClick={closeModal} />
      <Container>
        <h3>좋아요</h3>
        {loversArr.map(lover => (
          <ModalLoversItem key={lover.memNo} lover={lover} />
        ))}
      </Container>
    </>
  );
};

export default React.memo(ModalLoversContainer);
