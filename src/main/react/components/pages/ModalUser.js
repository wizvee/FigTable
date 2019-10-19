import React from 'react';
import ModalHeader from '../common/ModalHeader';

const ModalUser = () => {
  const menu = ['최근 본 맛집', '가고싶다'];
  return (
    <>
      <ModalHeader menu={menu} />
      <div>모달 내용</div>
    </>
  );
};

export default ModalUser;
