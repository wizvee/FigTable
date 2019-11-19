import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listReviews } from '../../../modules/adminReviews';
import { withRouter } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import ReviewList from './review/ReviewList';
import styled from 'styled-components';

import './TableStyle.css';

const BodyHeight = styled.div`
  height: auto;
  min-height: 415px;
  margin: auto;
`;

const ReviewContainer = () => {
  const dispatch = useDispatch();
  const { reviews, error, loading } = useSelector(
    ({ adminReviews, loading }) => ({
      reviews: adminReviews.reviews,
      error: adminReviews.error,
      loading: loading['adminReviews/LIST_REVIEWS'],
    }),
  );
  useEffect(() => {
    dispatch(listReviews());
  }, [dispatch]);

  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi subTitle="신고 리뷰" />
        <ReviewList reviews={reviews} loading={loading} error={error} />
      </BodyHeight>
    </>
  );
};

export default withRouter(ReviewContainer);
