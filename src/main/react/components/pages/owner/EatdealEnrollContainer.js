import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EatdealEnrollPresenter from './EatdealEnrollPresenter';
import {
    changeField,
    initializeForm,
    register,
  } from '../../../modules/newEat';
import client, { path } from '../../../lib/api/client';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';
import moment from 'moment';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 3rem;
  width: 310px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  .msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
  padding: 0.5rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const EatdealEnrollContainer = ({restaurant}) =>{
  
    const dispatch=useDispatch();
    const [error, setError] = useState(null);
    const [isModal, setModal] = useState(false);

    const{form, newEat, thumb, newEatError }= useSelector(({newEat})=>({
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


//날짜 이벤트 핸들러
  const onSetValue = (value) =>{
    dispatch(changeField({ form: 'register', key: 'eatStartDate', value: moment(value.startDate).format('YYYY-MM-DD') }))
    dispatch(changeField({ form: 'register', key: 'eatEndDate', value: moment(value.endDate).format('YYYY-MM-DD') }))
      
  }
  // 파일인풋 변경 이벤트 핸들러
  const onChangeFile = useCallback(
    async ({ target: { files, name } }) => {
      if(thumb){

        await client.patch(`${path}/api/eatdeal/files`, { thumb });
      }
    
      const file = files[0];
      let form = new FormData();
      form.append('thumb', file);

      await client
        .post(`${path}/api/eatdeal/files`, form, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(({ data }) => dispatch(changeField({ form ,key: name, value: data })))
        .catch(err => console.log(err));
    },
  );

  // unMount 시 form 초기화
  useEffect(() => {
    return () => dispatch(initializeForm());
  }, [dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    const {
      resNo,
      resName,
      resRocationKeyword,
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
          thumb,
          eatFoodName,
          eatCount,
          eatOriginPrice,
          eatDiscount,
          eatContent,].includes('')
      ) {
        // 하나라도 비어있다면
        setError('빈 칸을 모두 입력하세요');
        return;
      }
    if(eatDiscount>=1){
      //할인율이 1보다 크면 
      setError('할인율은 1보다 클 수 없습니다.');
      return;
    }
    setError('');
      dispatch(register({ 
        resNo,
        resName,
        resRocationKeyword,
        thumb,
        eatFoodName,
        eatCount,
        eatOriginPrice,
        eatDiscount,
        eatStartDate,
        eatEndDate,
        eatContent,}));
    
    };
    
  // 컴포넌트가 처음 렌더링 될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
    dispatch(changeField({ key: 'resNo', value: restaurant.resNo }));//초기resNo넣어줌
  }, [dispatch]);

  // 잇딜 성공/실패 처리
  useEffect(() => {
    if (newEatError) {
      console.log('오류 발생');
      console.log(newEatError);
      return;
    }
    if (newEat>0) {
      setModal(true);
      dispatch(initializeForm('register'));
    }
  }, [newEat, newEatError, dispatch]);


    return(
        <>
        {isModal && (
          <>
        <Overlay />
        <Container>
          <h3>eatdeal</h3>
          <div className="msg">
            등록이 완료되었습니다.
            <ButtonWithMarginTop onClick={()=>{setModal(false)}}>
              확인
            </ButtonWithMarginTop>
          </div>
        </Container>
        </>
      )}
        <EatdealEnrollPresenter
        form={form}
        onChange={onChange}
        onChangeFile={onChangeFile}
        onSubmit={onSubmit}
        onSetValue={onSetValue}
        error={error}
        restaurant={restaurant}
        
        />
        </>

    )
}
export default EatdealEnrollContainer;