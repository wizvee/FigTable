import React, { useEffect, useCallback, useState } from 'react';
import ActionButtons from './ActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeReview } from '../../../../modules/review';
import { check } from '../../../../modules/member';
import ModalAlert from '../../../common/ModalAlert';

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

  const [isModal, setModal] = useState(false);
  const [submitError, setError] = useState(null);

  // 리뷰 등록
  const onSubmit = () => {
    if ([rvRating, rvContent].includes('')) {
      // 하나라도 비어있다면
      setError('평점이나 리뷰를 입력하세요');
      return;
    }
    dispatch(writeReview({ memNo, resNo, rvRating, rvContent, rvImages }));
  };

  // 취소
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if ([memNo, resNo].includes('')) history.push('/');
  }, []);

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (result && result > 0) setModal(true);
    if (error) console.log(error);
    // unmount 시 멤버 정보 check
    return () => dispatch(check(memNo));
  }, [history, result, error]);

  return (
    <>
      {isModal && (
        <ModalAlert
          title="포인트"
          msg="리뷰 작성으로 300😻 지급이 완료되었습니다."
          url={`/figtable/restaurant/${resNo}`}
        />
      )}
      <ActionButtons
        onCancel={onCancel}
        onSubmit={onSubmit}
        error={submitError}
      />
    </>
  );
};

export default withRouter(ActionButtonsContainer);
