import React, { useEffect, useState, useCallback } from 'react';
import InsertButton from './InsertButton';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { insertRes } from '../../../../modules/adminInsertRes';
import InsertModal from './InsertModal';

const InsertButtonContainer = ({ history }) => {
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

  const [errorMsg, setErrorMsg] = useState(null);
  const [modal, setModal] = useState(false);

  //restaurant 등록
  const onPublish = () => {
    if (
      [
        resName,
        resAddress,
        resTel,
        resLocationKeyword,
        resFoodKeyword,
      ].includes('')
    ) {
      setErrorMsg('필수 항목을 입력해주세요');
      return;
    }
    dispatch(
      insertRes({
        resName,
        resAddress,
        resTel,
        ownName,
        resLocationKeyword,
        resFoodKeyword,
        resOpenDay,
        resCloseTime,
        resThumb,
      }),
    );
  };

  //취소
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  //성공 or 실패시
  useEffect(() => {
    if (restaurant && restaurant > 0) {
      ///등록한 사람의 id와 username을 참조하여 restaurant를 읽을 수 있는 경로 만들기
      //history.push(`/@${user.username}/${_id}`);
      setModal(true);
      console.log('성공');
    }
    if (restaurantError) {
      console.log(restaurantError);
    }
  }, [history, restaurant, restaurantError]);

  return (
    <>
      {modal && (
        <InsertModal
          msg="등록이 완료되었습니다."
          url="/figtable/admin/enroll"
        />
      )}
      <InsertButton
        onCancel={onCancel}
        onPublish={onPublish}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default withRouter(InsertButtonContainer);
