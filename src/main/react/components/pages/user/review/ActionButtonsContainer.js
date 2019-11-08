import React, { useEffect, useCallback } from 'react';
import ActionButtons from './ActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeReview } from '../../../../modules/review';
import { check } from '../../../../modules/member';

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
  const onSubmit = () => {
    dispatch(writeReview({ memNo, resNo, rvRating, rvContent, rvImages }));
  };

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
    // unmount 시 멤버 정보 check
    return dispatch(check(memNo));
  }, [history, result, error]);

  return <ActionButtons onCancel={onCancel} onSubmit={onSubmit} />;
};

export default withRouter(ActionButtonsContainer);
