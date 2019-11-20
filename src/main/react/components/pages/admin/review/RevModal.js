import React from 'react';
import styled from 'styled-components';
import ReviewDetail from './ReviewDetail';

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
  top: 6.5rem;
  width: 30rem;
  height: auto;
  min-height: 25rem;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  display: flex;
`;

const RevModal = ({ review, onReturn, onRemove }) => {
  return (
    <>
      <ModalWrap>
        <Modal>
          <Content>
            <div>리뷰를 삭제하시겠습니까?</div>
          </Content>
          <FormWrapper>
            <ReviewDetail
              review={review}
              onRemove={onRemove}
              onReturn={onReturn}
            />
          </FormWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
};

export default RevModal;
