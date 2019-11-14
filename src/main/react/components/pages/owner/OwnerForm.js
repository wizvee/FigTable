import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';

const FormContainer = styled.div`
  width: 80%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: 20px;
  margin: 0 auto;
  margin-top: 20px;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  padding-bottom: 20px;
  font-weight: 900;
  font-size: 17px;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 70%;
  float: right;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;

  & + & {
    margin-top: 0.5rem;
  }
`;

const OwnerForm = () => {
  return (
    <FormContainer>
      <SubTitle>사장님 정보</SubTitle>
      <StyledInput
        style={{ marginLeft: '45px' }}
        type="text"
        name="ownEmail"
        placeholder="이메일"
        // onChange={onChange}
      />
      <StyledInput
        style={{ marginLeft: '45px' }}
        type="password"
        name="ownPassword"
        placeholder="비밀번호"
        // onChange={onChange}
      />
      <StyledInput
        style={{ marginLeft: '45px' }}
        type="password"
        name="ownPasswordCk"
        placeholder="비밀번호 확인"
        // onChange={onChange}
      />
      <StyledInput
        style={{ marginLeft: '45px' }}
        type="ownPasswordCk"
        name="ownName"
        placeholder="이름"
        // onChange={onChange}
      />
      <StyledInput
        style={{ marginLeft: '45px' }}
        type="text"
        name="ownPhone"
        placeholder="전화번호"
        // onChange={onChange}
      />
    </FormContainer>
  );
};

export default OwnerForm;
