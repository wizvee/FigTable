import React from 'react';
import ModalHeader from '../common/ModalHeader';

const ModalSearch = () => {
  const menu = ['추천 검색어', '인기 검색어', '최근 검색어'];

  return (
    <>
      <ModalHeader menu={menu} />
      <div>모달 내용</div>
    </>
  );
};

export default ModalSearch;
