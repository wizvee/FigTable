import React, { useEffect, useCallback } from 'react';
import ActionButtons from './ActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeReview } from '../../../../modules/review';

const ActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    memNo,
    resNo,
    rvRating,
    rvContent,
    rvImages,
    result,
    error,
  } = useSelector(({ review }) => ({
    memNo: review.memNo,
    resNo: review.resNo,
    rvRating: review.rvRating,
    rvContent: review.rvContent,
    rvImages: review.rvImages,
    result: review.result,
    error: review.error,
  }));

  // 리뷰 등록
  const onSubmit = useCallback(() => {
    dispatch(writeReview({ memNo, resNo, rvRating, rvContent, rvImages }));
  }, [dispatch]);

  // 취소
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (result && result > 0) {
      history.push(`/figtable/restaurant/${resNo}`);
    }
    if (error) console.log(error);
  }, [history, result, error]);

  return <ActionButtons onCancel={onCancel} onSubmit={onSubmit} />;
};

export default withRouter(ActionButtonsContainer);