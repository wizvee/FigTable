import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import ReviewItem from '../detail/ReviewItem';
import { path } from '../../../../lib/api/client';

const MyReviews = ({ title, reviews, history }) => {
  const toRes = useCallback(resNo => {
    history.push(`${path}/restaurant/${resNo}`);
  }, []);

  return (
    reviews && (
      <>
        <h3>{title}</h3>
        {reviews.map(r => (
          <ReviewItem key={r.rvNo} toRes={toRes} review={r} />
        ))}
      </>
    )
  );
};

export default withRouter(React.memo(MyReviews));
