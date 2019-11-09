import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import ReviewItem from './ReviewItem';
import { FiChevronsDown } from 'react-icons/fi';
import Loader from '../../common/Loader';

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

const Message = styled.div`
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

const Paging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  font-size: 1.4rem;
  color: ${palette.primary};
  svg {
    margin: 0 0.5rem;
    transform: translateY(-1px);
  }
`;

const ReviewPresenter = ({ reviews, loading, openInsta }) => {
  if (loading || !reviews) return <Loader />;

  // category state
  const [selectCtg, setSelectCtg] = useState(null);

  // 리뷰 카테고리 별로 분류
  const goodReviews = reviews.filter(r => r.rvRating == 5);
  const nomalReviews = reviews.filter(r => r.rvRating == 3);
  const badReviews = reviews.filter(r => r.rvRating == 1);

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
          className={selectCtg === 'good' && 'selected'}
          onClick={
            goodReviews.length !== 0 ? () => setSelectCtg('good') : undefined
          }
        >
          맛있어({goodReviews.length})
        </CtgItem>
        <Divider>·</Divider>
        <CtgItem
          className={selectCtg === 'nomal' && 'selected'}
          onClick={
            nomalReviews.length !== 0 ? () => setSelectCtg('nomal') : undefined
          }
        >
          괜찮아({nomalReviews.length})
        </CtgItem>
        <Divider>·</Divider>
        <CtgItem
          className={selectCtg === 'bad' && 'selected'}
          onClick={
            badReviews.length !== 0 ? () => setSelectCtg('bad') : undefined
          }
        >
          별로야({badReviews.length})
        </CtgItem>
      </Container>
      {reviews.length === 0 && (
        <Message>
          <div>아직 작성된 리뷰가 없네요.</div>
          해당 식당의 첫 리뷰를 작성해주시겠어요?
        </Message>
      )}
      {selectCtg === null &&
        reviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'good' &&
        goodReviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'nomal' &&
        nomalReviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} openInsta={openInsta} />
        ))}
      {selectCtg === 'bad' &&
        badReviews.map(r => (
          <ReviewItem key={r.rvNo} review={r} openInsta={openInsta} />
        ))}
      <Paging>
        더보기
        <FiChevronsDown />
      </Paging>
    </>
  );
};

export default React.memo(ReviewPresenter);
