import React from 'react';
import styled from 'styled-components';
import ApplyOwner from './ApplyOwner';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
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
  width: 30rem;
  height: 28rem;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 3rem;
`;

const FormWrapper = styled.div`
  display: flex;
`;

const OwnerModal = ({ owner, closeModal, changePage, onSubmit }) => {
  const {
    ownNo,
    ownName,
    ownEmail,
    ownPassword,
    ownResName,
    ownResTel,
    ownResAddress,
  } = owner;

  return (
    <>
      <ModalWrap>
        <Modal>
          <Content>
            <div>
              <b>{ownResName}</b> 매장의 사장님으로 등록하시겠습니까?
            </div>
          </Content>
          <FormWrapper>
            <ApplyOwner
              owner={owner}
              closeModal={closeModal}
              changePage={changePage}
              onSubmit={onSubmit}
            />
          </FormWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
};

export default OwnerModal;
