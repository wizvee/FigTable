import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import WritePresenter from './WritePresenter';
import { changeField, initializeForm } from '../../../../modules/review';
import ActionButtonsContainer from './ActionButtonsContainer';
import client from '../../../../lib/api/client';

const WriteContainer = ({ history }) => {
  const disaptch = useDispatch();
  const { member, resName, rvImages } = useSelector(({ member, review }) => ({
    member: member.member,
    resName: review.resName,
    rvImages: review.rvImages,
  }));

  if (!member) history.push('/');

  // 기본인풋 변경 이벤트 핸들러
  const onChange = ({ target }) => {
    const { value, name } = target;
    disaptch(changeField({ key: name, value }));
  };

  // 파일인풋 변경 이벤트 핸들러
  const onChangeFile = async ({ target: { files, name } }) => {
    if (rvImages.length != 0) {
      await client.patch('/figtable/api/files', { rvImages });
    }

    const imgFiles = Array.from(files);
    let form = new FormData();

    imgFiles.forEach((img, i) => {
      form.append(i, img);
    });

    await client
      .post('/figtable/api/files', form, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(({ data }) => disaptch(changeField({ key: name, value: data })))
      .catch(err => console.log(err));
  };

  // unMount 시 review 초기화
  useEffect(() => {
    return () => {
      disaptch(initializeForm());
    };
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
