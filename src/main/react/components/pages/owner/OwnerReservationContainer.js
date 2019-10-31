import React from 'react';
import HeaderOwner from './HeaderOwner';

const store = {
  name: '김사장',
};

const OwnerReservationContainer = () => {
  return <HeaderOwner name={store.name} />;
};

export default OwnerReservationContainer;
