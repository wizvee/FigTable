import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
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
  span {
    color: ${palette.textGray};
  }
`;

const CtgItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.textGray};
  transition: color 0.2s linear;
  cursor: pointer;
  &.disabled {
    cursor: default;
  }
  &.selected {
    color: ${palette.primary};
  }
  &:hover {
    color: ${palette.primary};
  }
`;

const Divider = styled.span`
  margin: 5px;
`;

const NoneMsg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${palette.textGray};
  div {
    font-size: 1.25rem;
  }
`;

const ReviewPresenter = ({ reviews, openInsta }) => {
  if (!reviews) return null;

  // category state
  const [selectCtg, setSelectCtg] = useState(null);

  // 리뷰 카테고리 별로 분류
  const goodReviews = reviews.filter(r => r.rvRating === 5);
  const nomalReviews = reviews.filter(r => r.rvRating === 3);
  const badReviews = reviews.filter(r => r.rvRating === 1);

  return (
    <>
      <Container>
        <Title>
          리뷰<span>({reviews.length})</span>
        </Title>
        <CtgItem
          className={selectCtg === null && 'selected'}
          onClick={() => setSelectCtg(null)}
        >
          전체({reviews.length})
        </CtgItem>
        <Divider>·</Divider>
        <CtgItem
          className={
            (selectCtg === 'good' && 'selected',
            goodReviews.length === 0 && 'disabled')
          }
          onClick={
            goodReviews.length !== 0 ? () => setSelectCtg('good') : undefined
          }
        >
          맛있어({goodReviews.length})
        </CtgItem>
        <Divider>·</Divider>
        <CtgItem
          className={
            (selectCtg === 'nomal' && 'selected',
            nomalReviews.length === 0 && 'disabled')
          }
          onClick={
            nomalReviews.length !== 0 ? () => setSelectCtg('nomal') : undefined
          }
        >
          괜찮아({nomalReviews.length})
        </CtgItem>
        <Divider>·</Divider>
        <CtgItem
          className={
            (selectCtg === 'bad' && 'selected',
            badReviews.length === 0 && 'disabled')
          }
          onClick={
            badReviews.length !== 0 ? () => setSelectCtg('bad') : undefined
          }
        >
          별로야({badReviews.length})
        </CtgItem>
      </Container>
      {reviews.length === 0 && (
        <NoneMsg>
          <div>아직 작성된 리뷰가 없네요.</div>
          해당 식당의 첫 리뷰를 작성해주시겠어요?
        </NoneMsg>
      )}
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
