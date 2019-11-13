import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import InsertResForm from './restaurant/InsertResForm';
import { useSelector, useDispatch } from 'react-redux';
import { intialize, changeField } from '../../../modules/adminInsertRes';
import styled from 'styled-components';
import client from '../../../lib/api/client';

const FormWrapper = styled.div`
  margin-top: 5rem;
  height: auto;
`;

const InsertRestaurant = ({ history }) => {
  const dispatch = useDispatch();
  const {
    resName,
    resAddress,
    resTel,
    ownName,
    resLocationKeyword,
    resFoodKeyword,
    resOpenDay,
    resCloseTime,
    resThumb,
    restaurant,
    restaurantError,
  } = useSelector(({ adminInsertRes }) => ({
    resName: adminInsertRes.resName,
    resAddress: adminInsertRes.resAddress,
    resTel: adminInsertRes.resTel,
    ownName: adminInsertRes.ownName,
    resLocationKeyword: adminInsertRes.resLocationKeyword,
    resFoodKeyword: adminInsertRes.resFoodKeyword,
    resOpenDay: adminInsertRes.resOpenDay,
    resCloseTime: adminInsertRes.resCloseTime,
    resThumb: adminInsertRes.resThumb,
    restaurant: adminInsertRes.restaurant,
    restaurantError: adminInsertRes.restaurantError,
  }));

  const onChange = useCallback(
    ({ target }) => {
      const { value, name } = target;
      dispatch(changeField({ key: name, value }));
      console.log(value, name);
    },
    [dispatch],
  );

  const onChangeFile = useCallback(
    async ({ target: { file, name } }) => {
      if (resThumb.length != 0) {
        await client.patch('/figtable/api/adminFile', { resThumb });
      }

      const imgFile = file;
      let form = new FormData();

      form.append(0, imgFile);

      await client
        .post('/figtable/api/adminFile', form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => dispatch(changeField({ key: name, value: data })))
        .catch(error => console.log(error));
    },
    [dispatch],
  );

  //언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(intialize());
    };
  }, [dispatch]);

  return (
    <>
      <AdminHeader />
      <MenuNavi subTitle="매장 신규 등록" />
      <FormWrapper>
        <InsertResForm
          onChange={onChange}
          onChangeFile={onChangeFile}
          resName={resName}
          resAddress={resAddress}
          resTel={resTel}
          ownName={ownName}
          resLocationKeyword={resLocationKeyword}
          resFoodKeyword={resFoodKeyword}
          resOpenDay={resOpenDay}
          resCloseTime={resCloseTime}
          resThumb={resThumb}
        />
      </FormWrapper>
    </>
  );
};

export default withRouter(InsertRestaurant);
