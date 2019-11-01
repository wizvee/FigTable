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

const ActionButtons = ({ onCancel, onSubmit }) => {
  return (
    <Container>
      <Button onClick={onCancel}>취소</Button>
      <Button onClick={onSubmit}>등록</Button>
    </Container>
  );
};

export default ActionButtons;
