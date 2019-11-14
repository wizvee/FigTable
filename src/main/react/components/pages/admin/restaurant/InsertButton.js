import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const ButtonBlock = styled.div`
  margin-top: -0.5rem;
  margin-bottom: 3rem;
  display: inline;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled(Button)`
  padding: 0.5rem;
  width: 100px;
  & + & {
    margin: 1rem;
  }
`;

const SpanBlock = styled.div`
  margin-bottom: 0.2rem;
  text-align: center;
`;

const Span = styled.span`
  color: red;
  margin-bottom: 0.5rem;
`;

const InsertButton = ({ onCancel, onPublish, errorMsg }) => {
  return (
    <>
      <SpanBlock>{errorMsg && <Span>{errorMsg}</Span>}</SpanBlock>
      <ButtonBlock>
        <ButtonStyle onClick={onCancel}>취소</ButtonStyle>
        <ButtonStyle onClick={onPublish}>등록</ButtonStyle>
      </ButtonBlock>
    </>
  );
};

export default InsertButton;
