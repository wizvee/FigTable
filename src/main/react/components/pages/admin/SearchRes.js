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

  const onChange = e => {
    setValue(e.target.value);
    {
      console.log(e.target.value);
    }
  };

  const onClickSearch = value => {
    {
      console.log(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    onClickSearch(value);
    setValue('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="검색어 입력"
          name="searchRes"
          value={value}
          onChange={onChange}
        />
        <StyledButton>검색</StyledButton>
      </form>
    </>
  );
};

export default SearchRes;
