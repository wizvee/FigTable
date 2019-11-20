import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import ReviewItem from '../detail/ReviewItem';
import { path } from '../../../../lib/api/client';
import Loader from '../../../common/Loader';

const MyReviews = ({ title, reviews, rvLoading, fdLoading, history }) => {
  const toRes = useCallback(resNo => {
    history.push(`${path}/restaurant/${resNo}`);
  }, []);

  return (
    <>
      <h3>{title}</h3>
      {rvLoading || fdLoading ? (
        <Loader />
      ) : reviews ? (
        reviews.map(r => <ReviewItem key={r.rvNo} toRes={toRes} review={r} />)
      ) : (
        <div>사람들을 팔로잉하시면 소식을 받아볼 수 있어요! 🤩</div>
      )}
      {reviews && reviews.length == 0 && (
        <div>아직 작성한 리뷰가 없어요! ✍</div>
      )}
    </>
  );
};

export default withRouter(React.memo(MyReviews));
