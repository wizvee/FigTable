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
  margin-bottom: 20px;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

  .label {
    display: inline-block;
    width: 100%;
    padding-top: 0.5rem;
    text-align: right;
    line-height: 2;
  }
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

const OwnerForm = ({ owner, onChange }) => {
  return (
    <FormContainer>
      <SubTitle>사장님 정보</SubTitle>
      <div className="label">
        이메일
        <StyledInput
          style={{ marginLeft: '45px' }}
          type="text"
          name="ownEmail"
          placeholder="이메일"
          defaultValue={owner.ownEmail}
          onChange={onChange}
        />
      </div>
      <div className="label">
        비밀번호
        <StyledInput
          style={{ marginLeft: '45px' }}
          type="password"
          name="ownPassword"
          placeholder="비밀번호"
          defaultValue={owner.ownPassword}
          onChange={onChange}
        />
      </div>
      <div className="label">
        비밀번호 확인
        <StyledInput
          style={{ marginLeft: '45px' }}
          type="password"
          name="ownPasswordCk"
          placeholder="비밀번호 확인"
          defaultValue={owner.ownPasswordCk}
          onChange={onChange}
        />
      </div>
      <div className="label">
        이름
        <StyledInput
          style={{ marginLeft: '45px' }}
          type="ownPasswordCk"
          name="ownName"
          placeholder="이름"
          defaultValue={owner.ownName}
          onChange={onChange}
        />
      </div>
      <div className="label">
        전화번호
        <StyledInput
          style={{ marginLeft: '45px' }}
          type="text"
          name="ownPhone"
          placeholder="전화번호"
          defaultValue={owner.ownPhone}
          onChange={onChange}
        />
      </div>
    </FormContainer>
  );
};

export default OwnerForm;
