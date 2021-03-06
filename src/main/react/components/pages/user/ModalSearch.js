import React, { useState } from 'react';
import ModalHeader from '../../common/ModalHeader';

const ModalSearch = () => {
  const [select, setSelect] = useState('recommend');

  const menu = [
    {
      key: 'recommend',
      text: '추천 검색어',
    },
    {
      key: 'popular',
      text: '인기 검색어',
    },
    {
      key: 'recent',
      text: '최근 검색어',
    },
  ];

  return (
    <>
      <ModalHeader menu={menu} select={select} setSelect={setSelect} />
      <div>모달 내용</div>
    </>
  );
};

export default React.memo(ModalSearch);
