import React from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';

const ReviewContainer = () => {
  return (
    <>
      <AdminHeader />
      <MenuNavi subTitle="신고 리뷰" />
      <div style={{ minHeight: 500 }}></div>
    </>
  );
};

export default ReviewContainer;
