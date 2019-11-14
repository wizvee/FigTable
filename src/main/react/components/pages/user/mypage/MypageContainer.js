import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import HeaderContainer from '../../../common/HeaderContainer';
import MypagePresenter from './MypagePresenter';
import { check, changeField } from '../../../../modules/member';

const MypageContainer = () => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({ member: member.member }));

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

  // mount 시마다 member information을 DB와 연동
  useEffect(() => {
    dispatch(check(member.memNo));
  }, [dispatch]);

  return (
    member && (
      <>
        <HeaderContainer />
        <MypagePresenter member={member} onChangeFile={onChangeFile} />
      </>
    )
  );
};

export default MypageContainer;
