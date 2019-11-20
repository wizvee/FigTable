import React, { useState, useEffect } from 'react';
import { listQnae } from '../../../../modules/adminReviews';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import QnsResApplyList from './QnaResApplyList';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 260px;
`;

const RestaurantApplyList = () => {
  const dispatch = useDispatch();
  const { qnae, error, loading } = useSelector(({ adminReviews, loading }) => ({
    qnae: adminReviews.qnae,
    error: adminReviews.error,
    loading: loading['amdinReview/LIST_QNAE'],
  }));

  useEffect(() => {
    dispatch(listQnae());
  }, [dispatch]);

  return (
    <>
      <BodyHeight>
        <QnsResApplyList qnas={qnae} error={error} loading={loading} />
      </BodyHeight>
    </>
  );
};

export default RestaurantApplyList;
