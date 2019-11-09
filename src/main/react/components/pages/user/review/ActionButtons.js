import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  button + button {
    margin-left: 1rem;
  }
  button {
    padding: 0.7rem 2rem;
  }
`;

const ErrorMsg = styled.div`
  margin-top: 1rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const ActionButtons = ({ onCancel, onSubmit, error }) => {
  return (
    <>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Container>
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={onSubmit}>등록</Button>
      </Container>
    </>
  );
};

export default React.memo(ActionButtons);
