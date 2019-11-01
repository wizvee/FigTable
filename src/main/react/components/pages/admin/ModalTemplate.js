import React from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 10rem;
  width: 24rem;
  height: 30rem;
  border-radius: 8px;
`;
const ModalTemplate = ({ closeModal }) => {
  return (
    <>
      <ModalWrap>
        <Modal>
          <div>모달</div>
        </Modal>
      </ModalWrap>
    </>
  );
};

export default ModalTemplate;
