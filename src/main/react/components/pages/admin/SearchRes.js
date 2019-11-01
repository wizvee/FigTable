import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  width: 30%;
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

const SearchRes = ({ restaurants }) => {
  const [value, setValue] = useState('');
  const onChange = useCallback(text => {
    setValue(text.target.value);
  }, []);

  const onSubmit = useCallback(e => {
    onChange(value);
    setValue('');
  });

  return (
    <>
      <form>
        <StyledInput
          type="text"
          placeholder="검색어 입력"
          id="searchRes"
          value={value}
          onChange={onChange}
        />
        <StyledButton type="submit" onSubmit={onSubmit}>
          검색
        </StyledButton>
      </form>
    </>
  );
};

export default SearchRes;
