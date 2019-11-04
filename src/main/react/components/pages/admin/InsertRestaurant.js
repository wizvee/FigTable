import React from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import InsetresForm from './InsertResForm';
import styled from 'styled-components';

const FormWrapper = styled.div`
  margin-top: 4rem;
`;

const onChange = e => {
  const { value, name } = e.target;
  {
    console.log(value, name);
  }
};

//폼 등록 이벤트
const onSubmit = e => {
  e.preventDefault();
};

const InsertRestaurant = () => {
  return (
    <>
      <AdminHeader />
      <MenuNavi subTitle="매장 신규 등록" />
      <FormWrapper>
        <InsetresForm onSubmit={onSubmit} onChange={onChange} />
      </FormWrapper>
    </>
  );
};

export default InsertRestaurant;
