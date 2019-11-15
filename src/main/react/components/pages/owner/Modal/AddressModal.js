import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { selAddr } from '../../../../modules/ownerRestaurant';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 8rem;
  width: 24rem;
  height: 27.5rem;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 49px;
  font-size: 16px;
  padding-top: 0.5rem;
  padding-left: 2rem;
  text-align: left;
  border-bottom: 1px solid rgba(134, 142, 150, 0.2);

  svg {
    font-size: 25px;
    float: right;
    margin-right: 1rem;
    opacity: 0.5;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const AddressModal = ({ handleData, addressModalClose }) => {
  return (
    <ModalWrapper>
      <Modal>
        <ModalTitle>
          주소 검색
          <MdClose onClick={addressModalClose} />
        </ModalTitle>
        <DaumPostcode onComplete={handleData} style={{ height: '29rem' }} />
      </Modal>
    </ModalWrapper>
  );
};
export default AddressModal;
