import React from 'react';

const MypagePresenter = ({ member }) => {
  return <div>{member.memName}님 마이페이지</div>;
};

export default React.memo(MypagePresenter);
