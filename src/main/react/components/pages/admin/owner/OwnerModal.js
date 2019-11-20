import React from 'react';
import styled from 'styled-components';
import ApplyOwnerForm from './ApplyOwnerForm';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 5rem;
  width: 31rem;
  height: 38rem;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 3rem;
`;

const FormWrapper = styled.div`
  display: flex;
`;

const OwnerModal = ({ owner, onReturn, onChange, onSubmit }) => {
  return (
    <>
      <ModalWrap>
        <Modal>
          <Content>
            <div>
              <b>{owner.resName}</b> 매장의 사장님으로 등록하시겠습니까?
            </div>
          </Content>
          <FormWrapper>
            <ApplyOwnerForm
              owner={owner}
              onReturn={onReturn}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </FormWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
};

export default OwnerModal;
