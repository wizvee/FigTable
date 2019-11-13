import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const ButtonBlock = styled.div`
  margin-top: -0.5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 315px;
`;

const Span = styled.span`
  color: red;
  margin-right: 0.7rem;
  margin-bottom: 0.5rem;
`;

const InsertButton = ({ onPublish, errorMsg }) => {
  return (
    <ButtonBlock>
      {errorMsg && <Span>{errorMsg}</Span>}
      <StyledButton onClick={onPublish}>등록</StyledButton>
    </ButtonBlock>
  );
};

export default InsertButton;
