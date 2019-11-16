import React from 'react';
import ReviewItem from '../detail/ReviewItem';

const MyReviews = ({ reviews }) => {
  return (
    reviews && (
      <>
        <h3>내가 쓴 리뷰</h3>
        {reviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} />
        ))}
      </>
    )
  );
};

export default React.memo(MyReviews);
