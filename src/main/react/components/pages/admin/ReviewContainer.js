import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listReviews } from '../../../modules/adminReviews';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import ReviewList from './review/ReviewList';
import styled from 'styled-components';
import './TableStyle.css';

const BodyHeight = styled.div`
  height: auto;
  min-height: 500px;
  margin: auto;
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 460px;
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
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일</th>
                <th>매장명</th>
                <th>매장주소</th>
              </tr>
            </thead>
            <tbody>
              <ReviewList reviews={reviews} loading={loading} error={error} />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default ReviewContainer;
