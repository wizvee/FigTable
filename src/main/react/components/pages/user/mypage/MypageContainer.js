import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import HeaderContainer from '../../../common/HeaderContainer';
import MypagePresenter from './MypagePresenter';
import { check, changeField } from '../../../../modules/member';
import { myReviews, unloadReviews, myFeed } from '../../../../modules/reviews';

const MypageContainer = () => {
  const dispatch = useDispatch();
  const { member, reviews } = useSelector(({ member, reviews }) => ({
    member: member.member,
    reviews: reviews.reviews,
  }));

  const [menu, setMenu] = useState('myFeed');

  // event handler to change profile
  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      const file = files[0];
      let form = new FormData();
      form.append('profile', file);

      await client
        .post(`${path}/api/member/profile/?memNo=${member.memNo}`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => dispatch(changeField({ key: name, value: data })))
        .catch(err => console.log(err));
    },
    [dispatch],
  );

  const onMyFeed = useCallback(() => {
    setMenu('myFeed');
    dispatch(myFeed());
  }, []);
  const onMyReviews = useCallback(() => {
    setMenu('myReviews');
    dispatch(myReviews());
  }, []);
  const onMyPoint = useCallback(() => setMenu('myPoint'), []);
  const onMyCoupon = useCallback(() => setMenu('myCoupon'), []);
  const onEdit = useCallback(() => setMenu('edit'), []);

  // mount 시마다 member information을 DB와 연동,
  // unmount 할 때 내가 쓴 리뷰 등 초기화
  useEffect(() => {
    dispatch(check(member.memNo));
    dispatch(myFeed());
    return () => dispatch(unloadReviews());
  }, [dispatch]);

  return (
    member && (
      <>
        <HeaderContainer />
        <MypagePresenter
          member={member}
          menu={menu}
          reviews={reviews}
          onChangeFile={onChangeFile}
          onMyFeed={onMyFeed}
          onMyReviews={onMyReviews}
          onMyPoint={onMyPoint}
          onMyCoupon={onMyCoupon}
          onEdit={onEdit}
        />
      </>
    )
  );
};

export default React.memo(MypageContainer);
