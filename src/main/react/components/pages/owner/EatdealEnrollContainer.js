import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EatdealEnrollPresenter from './EatdealEnrollPresenter';
import {
    changeField,
    initializeForm,
    register,
  } from '../../../modules/newEat';
import client, { path } from '../../../lib/api/client';

const EatdealEnrollContainer = () =>{
    const dispatch=useDispatch();
    const [error, setError] = useState(null);
    const [isModal, setModal] = useState(false);

    const{form, newEat,thumb, newEatError }= useSelector(({newEat})=>({
        form:newEat.register,
        newEat:newEat.newEat,
        thumb:newEat.thumb,
        newEatError:newEat.newEatError,
    }));

    //기본 인풋변경 이벤트 핸들러 
  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };


  // 파일인풋 변경 이벤트 핸들러
  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      if (thumb) {
        await client.patch(`${path}/api/eatdeal/files`, { thumb });
      }

      const imgFiles = Array.from(files);
      let form = new FormData();

      imgFiles.forEach((img, i) => {
        if (i < 2) form.append(i, img);
      });

      await client
        .post(`${path}/api/eatdeal/files`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => disaptch(changeField({ key: name, value: data })))
        .catch(err => console.log(err));
    },
    [dispatch],
  );

  // unMount 시 review 초기화
  useEffect(() => {
    return () => disaptch(initializeForm());
  }, [dispatch]);

  //폼 등록 이벤트
  const onSubmit = e => {
    e.preventDefault();
    const {
        thumb,
        eatFoodName,
        eatCount,
        eatOriginPrice,
        eatDiscount,
        eatStartDate,
        eatEndDate,
        eatContent,
    } = form;
    if (
        [ 
            eatFoodName,
            eatContent,].includes('')
      ) {
        // 하나라도 비어있다면
        setError('빈 칸을 모두 입력하세요');
        return;
      }
      dispatch(register({ 
        thumb,
        eatFoodName,
        eatCount,
        eatOriginPrice,
        eatDiscount,
        eatStartDate,
        eatEndDate,
        eatContent, }));
    
    };
    
  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 잇딜 성공/실패 처리
  useEffect(() => {
    if (newEatError) {
      console.log('오류 발생');
      console.log(newEatError);
      return;
    }
    if (newEat) {//이거 만들기@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      dispatch(setEatdeal(newEat));
    }
  }, [newEat, newEatError, dispatch]);


    return(
        <>
        <EatdealEnrollPresenter
        form={form}
        onChange={onChange}
        onChangeFile={onChangeFile}
        thumb={thumb}
        onSubmit={onSubmit}
        error={error}
        
        />
        </>

    )
}
export default EatdealEnrollContainer;