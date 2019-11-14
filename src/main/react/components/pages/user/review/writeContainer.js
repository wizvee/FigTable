import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import WritePresenter from './WritePresenter';
import { changeField, initializeForm } from '../../../../modules/review';
import ActionButtonsContainer from './ActionButtonsContainer';
import client, { path } from '../../../../lib/api/client';

const WriteContainer = ({ history }) => {
  const disaptch = useDispatch();
  const { member, resName, rvImages } = useSelector(({ member, review }) => ({
    member: member.member,
    resName: review.resName,
    rvImages: review.rvImages,
  }));

  if (!member) history.push('/');

  // 기본인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    ({ target }) => {
      const { value, name } = target;
      disaptch(changeField({ key: name, value }));
    },
    [disaptch],
  );

  // 파일인풋 변경 이벤트 핸들러
  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      if (rvImages.length != 0) {
        await client.patch(`${path}/api/files`, { rvImages });
      }

      const imgFiles = Array.from(files);
      let form = new FormData();

      imgFiles.forEach((img, i) => {
        if (i < 4) form.append(i, img);
      });

      await client
        .post(`${path}/api/files`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => disaptch(changeField({ key: name, value: data })))
        .catch(err => console.log(err));
    },
    [disaptch],
  );

  // unMount 시 review 초기화
  useEffect(() => {
    return () => disaptch(initializeForm());
  }, [disaptch]);

  return (
    <>
      <HeaderContainer />
      <WritePresenter
        member={member}
        resName={resName}
        onChange={onChange}
        onChangeFile={onChangeFile}
        rvImages={rvImages}
        buttons={<ActionButtonsContainer />}
      />
    </>
  );
};

export default withRouter(WriteContainer);
