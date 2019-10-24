import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import ReviewItem from './ReviewItem';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0;
`;

const Title = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const CtgItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.selected {
    color: ${palette.primary};
  }
`;

const Divider = styled.span`
  margin: 8px;
`;

const ReviewPresenter = ({ reviews, openInsta }) => {
  // category state
  const [selectCtg, setSelectCtg] = useState(null);

  // 리뷰 카테고리 별로 분류
  const goodReviews = reviews.filter(r => r.rating === 'good');
  const nomalReviews = reviews.filter(r => r.rating === 'nomal');
  const badReviews = reviews.filter(r => r.rating === 'bad');

  return (
    <>
      <Container>
        <Title>리뷰({reviews.length})</Title>
        <CtgItem
          className={selectCtg === null && 'selected'}
          onClick={() => setSelectCtg(null)}
        >
          전체({reviews.length})
        </CtgItem>
        <Divider>|</Divider>
        <CtgItem
          className={selectCtg === 'good' && 'selected'}
          onClick={() => setSelectCtg('good')}
        >
          맛있어({goodReviews.length})
        </CtgItem>
        <Divider>|</Divider>
        <CtgItem
          className={selectCtg === 'nomal' && 'selected'}
          onClick={() => setSelectCtg('nomal')}
        >
          괜찮아({nomalReviews.length})
        </CtgItem>
        <Divider>|</Divider>
        <CtgItem
          className={selectCtg === 'bad' && 'selected'}
          onClick={() => setSelectCtg('bad')}
        >
          별로야({badReviews.length})
        </CtgItem>
      </Container>
      {selectCtg === null &&
        reviews.map(r => (
          <ReviewItem key={r.id} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'good' &&
        goodReviews.map(r => (
          <ReviewItem key={r.id} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'nomal' &&
        nomalReviews.map(r => (
          <ReviewItem key={r.id} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'bad' &&
        badReviews.map(r => (
          <ReviewItem key={r.id} review={r} openInsta={openInsta} />
        ))}
    </>
  );
};

export default ReviewPresenter;
