import React from 'react';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  width: 50%;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  & + & {
    margin-top: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 5rem;
`;

const ButtonWrapper = styled.div`
  display: inline;
`;

const SearchTemplate = ({ onSubmit, input, onReset, searchKeyword }) => {
  return (
    <>
      <form>
        <StyledInput
          type="text"
          placeholder="매장명 입력"
          name="searchRes"
          value={searchKeyword}
          ref={input}
        />
        <ButtonWrapper>
          <StyledButton onClick={onSubmit}>검색</StyledButton>
          <StyledButton onClick={onReset}>초기화</StyledButton>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default SearchTemplate;
