import React, { useCallback } from 'react';
import AdminHeader from './AdminHeader';
import InsertFormContainer from './InsertFormContainer';
import InsetresForm from './InsertResForm';

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
      <InsertFormContainer type="매장" />
      <InsetresForm onSubmit={onSubmit} onChange={onChange} />
    </>
  );
};

export default InsertRestaurant;
