import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import InsertResForm from './InsertResForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  initializeForm,
  changeField,
  selAddr,
  insertRes,
} from '../../../../modules/adminInsertRes';
import styled from 'styled-components';
import client from '../../../../lib/api/client';
import confirmModal from './confirmModal';

const FormWrapper = styled.div`
  height: auto;
  margin-bottom: -2.5rem;
`;

const InsertRestaurant = ({ history }) => {
  const path = process.env.PATH;
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const { form, restaurant, restaurantError, resThumb } = useSelector(
    ({ adminInsertRes }) => ({
      form: adminInsertRes.insertRes,
      restaurant: adminInsertRes.restaurant,
      restaurantError: adminInsertRes.restaurantError,
      resThumb: adminInsertRes.resThumb,
    }),
  );

  //기본 인풋 변경
  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(changeField({ form: 'insertRes', key: name, value }));
  };

  //썸네일 변경
  const onChangeFile = useCallback(async ({ target: { files, name } }) => {
    if (resThumb) {
      await client.patch(`${path}/api/adminFile`, { resThumb });
    }
    const file = files[0];
    let form = new FormData();
    form.append('resThumb', file);

    await client
      .post(`${path}/api/adminFile`, form, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(({ data }) =>
        dispatch(changeField({ form, key: name, value: data })),
      )
      .catch(err => console.log(err));
  });

  const selectAddr = useCallback(
    (resAddress, resLat, resLong) => {
      dispatch(selAddr({ resAddress, resLat, resLong }));
    },
    [dispatch],
  );

  const [addressModal, setAddressModal] = useState(false);
  const addressModalOpen = () => {
    setAddressModal(true);
    document.body.style.overflow = 'hidden';
  };
  const addressModalClose = () => {
    setAddressModal(false);
    document.body.style.overflow = 'scroll';
  };

  //언마운트될 때 초기화
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  //InsertModal 닫기
  const onCloseModal = () => {
    setModal(false);
  };
  //취소 버튼
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  //등록 버튼
  const onSubmit = e => {
    e.preventDefault();
    const {
      resName,
      resAddress,
      resTel,
      resLocationKeyword,
      resFoodKeyword,
      resLat,
      resLong,
      resThumb,
    } = form;
    if (
      [
        resName,
        resAddress,
        resTel,
        resLocationKeyword,
        resFoodKeyword,
        resLat,
        resLong,
      ].includes('')
    ) {
      //하나라도 비었다면
      setError('모든 항목을 입력하세요.');
      return;
    }
    setError('');
    dispatch(
      insertRes({
        resName,
        resAddress,
        resTel,
        resLocationKeyword,
        resFoodKeyword,
        resLat,
        resLong,
        resThumb,
      }),
    );
  };

  //컴포넌트가 처음 렌더링 될 떄 form 초기화
  useEffect(() => {
    dispatch(initializeForm('insertRes'));
  }, [dispatch]);

  //등록 성공 & 실패시
  useEffect(() => {
    if (restaurantError) {
      console.log('오류 : ' + restaurantError);
      return;
    }
    if (restaurant > 0) {
      setModal(true);
      dispatch(initializeForm('insertRes'));
    }
  }, [restaurant, restaurantError, dispatch]);

  return (
    <>
      <FormWrapper>
        <InsertResForm
          form={form}
          onChange={onChange}
          onChangeFile={onChangeFile}
          onCancel={onCancel}
          onSubmit={onSubmit}
          restaurant={restaurant}
          selectAddr={selectAddr}
          addressModal={addressModal}
          addressModalOpen={addressModalOpen}
          addressModalClose={addressModalClose}
          errorMsg={error}
        />
      </FormWrapper>
      {modal && (
        <confirmModal
          msg="등록이 완료되었습니다."
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default withRouter(InsertRestaurant);
