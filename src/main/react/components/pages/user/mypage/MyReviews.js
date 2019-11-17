import React from 'react';
import ReviewItem from '../detail/ReviewItem';

const MyReviews = ({ title, reviews }) => {
  return (
    reviews && (
      <>
        <h3>{title}</h3>
        {reviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} />
        ))}
      </>
    )
  );
};

export default React.memo(MyReviews);
