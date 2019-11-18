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
      ) : (
        reviews.map(r => <ReviewItem key={r.rvNo} toRes={toRes} review={r} />)
      )}
    </>
  );
};

export default withRouter(React.memo(MyReviews));
