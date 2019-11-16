import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const ActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 5rem;
  margin: 0.5rem;
  margin-top: 1rem;
`;

const ActionButtons = ({ onReturn, onRemove }) => {
  return (
    <ActionButtonBlock>
      <StyledButton onClick={onReturn}>복구</StyledButton>
      <StyledButton onClick={onRemove}>삭제</StyledButton>
    </ActionButtonBlock>
  );
};

export default ActionButtons;
