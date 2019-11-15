import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { readRes, unloadRes } from '../../../../modules/restaurant';
import { listReviews, unloadReviews } from '../../../../modules/reviews';
import Responsive from '../../../common/Responsive';
import HeaderContainer from '../../../common/HeaderContainer';
import DetailPresenter from './DetailPresenter';
import ReviewPresenter from './ReviewPresenter';
import InstaViewer from './InstaViewer';

const Container = styled(Responsive)`
  margin-bottom: 4rem;
`;

const DetailContainer = ({ match }) => {
  // url에서 parameter 가져오기
  const { resNo } = match.params;

  const dispatch = useDispatch();
  const {
    restaurant,
    resError,
    reviews,
    rvError,
    resLoading,
    rvLoading,
  } = useSelector(({ restaurant, reviews, loading }) => ({
    restaurant: restaurant.restaurant,
    resError: restaurant.error,
    reviews: reviews.reviews,
    rvError: reviews.error,
    resLoading: loading['restaurant/READ_RES'],
    rvLoading: loading['reviews/LIST_RV'],
  }));

  // 리뷰 인스타모드로 보기 state
  const [viewInsta, setViewInsta] = useState({
    selectImage: null,
    isView: false,
  });

  // 처음 마운트 될 때 레스토랑 가져오기 API요청
  useEffect(() => {
    dispatch(readRes(resNo));
    dispatch(listReviews(resNo));
    // 언마운트 될 때 스토어에서 레스토랑 데이터 없애기
    return () => {
      dispatch(unloadRes());
      dispatch(unloadReviews());
    };
  }, [resNo]);

  // 이미지 있는 리뷰 필터
  const imgReviews = reviews ? reviews.filter(review => review.rvImages) : null;

  // 인스타모드 열고 닫기
  const openInsta = useCallback(selectImage => {
    setViewInsta({ selectImage, isView: true });
    document.body.style.overflow = 'hidden';
  }, []);
  const closeInsta = useCallback(() => {
    setViewInsta({ ...viewInsta, isView: false });
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      <HeaderContainer />
      <InstaViewer
        title={restaurant ? restaurant.resName : ''}
        reviews={imgReviews ? imgReviews : []}
        viewInsta={viewInsta}
        openInsta={openInsta}
        closeInsta={closeInsta}
      />
      <Container>
        <DetailPresenter
          info={restaurant}
          error={resError}
          loading={resLoading}
          imgReviews={imgReviews ? imgReviews : []}
          openInsta={openInsta}
        />
        <ReviewPresenter
          reviews={reviews}
          loading={rvLoading}
          openInsta={openInsta}
        />
      </Container>
    </>
  );
};

export default withRouter(DetailContainer);
