import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EatdealCategory from './EatdealDetail/EatdealCategory';
import EatdealEnroll from './EatdealEnroll';
import EatdealManage from './EatdealManage';
import EatdealBuy from './EatdealBuy';
import palette from '../../../lib/styles/Palette';
import { listOwnEat } from '../../../modules/eatdeals';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: 20px;
  margin-top: 20px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  min-height:35rem;
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  padding-bottom: 20px;
  font-weight: 900;
  font-size: 20px;
  font-weight:normal;

`;

const OwnerEatdealForm = ({restaurant}) => {

  const {resNo,}=restaurant;
  const dispatch= useDispatch();
  const {
    eatdeals,
    eatError,
    eatLoading
  }=useSelector(({eatdeals, loading})=>({
    eatdeals:eatdeals.ownEatdeals,
    eatError:eatdeals.error,
    eatLoading:loading['eatdeal/READ_EAT']
  }));
  
  useEffect(() => {
    dispatch(listOwnEat(resNo));
  }, [dispatch]);

  
  const [category, setCategory]=useState('manage');
  const onSelect=useCallback(category=>setCategory(category),[]);

  
  if(eatError) return null;
  return (
    <>
      <FormContainer>
        <SubTitle>Eat Deal
            <EatdealCategory category={category} onSelect={onSelect}/>
        </SubTitle>
        {/* 카테고리별로 컴포넌트 불러옴 */}
        {category==='enroll'&& <EatdealEnroll/>||
         category==='manage'&&<EatdealManage eatdeals={eatdeals}/>||
         category==='buy'&&<EatdealBuy/> }
         
         
        </FormContainer>

    </>
  );
};

export default OwnerEatdealForm;
