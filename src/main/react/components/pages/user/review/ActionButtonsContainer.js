import React, { useEffect } from 'react';
import ActionButtons from './ActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeReview } from '../../../../modules/review';

const ActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { memNo, resNo, rvRating, rvContent, rvImages, error } = useSelector(
    ({ review }) => ({
      memNo: review.memNo,
      resNo: review.resNo,
      rvRating: review.rvRating,
      rvContent: review.rvContent,
      rvImages: review.rvImages,
      error: review.error,
    }),
  );

  // 리뷰 등록
  const onSubmit = () => {
    dispatch(writeReview({ memNo, resNo, rvRating, rvContent, rvImages }));
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    // if (success) history.push(`/figtable/restaurant/${resNo}`);
    if (error) console.log(error);
  }, [history, error]);

  return <ActionButtons onCancel={onCancel} onSubmit={onSubmit} />;
};

export default withRouter(ActionButtonsContainer);
