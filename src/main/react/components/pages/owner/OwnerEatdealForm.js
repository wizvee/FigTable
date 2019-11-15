import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EatdealCategory from './EatdealDetail/EatdealCategory';
import EatdealEnrollContainer from './EatdealEnrollContainer';
import EatdealManage from './EatdealManage';
import EatdealBuy from './EatdealBuy';
import palette from '../../../lib/styles/Palette';
import { listOwnEat, listBuyEat } from '../../../modules/eatdeals';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: relative;
  padding-bottom: 20px;
  margin-top: 20px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  min-height:35rem;
  z-index:999999;
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

  const {
    resNo,
  }=restaurant;
  
  const dispatch= useDispatch();
  const {
    eatdeals,
    buyers,
    eatError,
    eatLoading
  }=useSelector(({eatdeals, loading})=>({
    eatdeals:eatdeals.ownEatdeals,
    buyers:eatdeals.buyers,
    eatError:eatdeals.error,
    eatLoading:loading['eatdeal/READ_EAT']
  }));
  
  useEffect(() => {
    dispatch(listOwnEat(resNo));
    dispatch(listBuyEat(resNo));
  }, [resNo]);
  
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
        {category==='enroll'&& <EatdealEnrollContainer  restaurant={restaurant}/>||
         category==='manage'&&<EatdealManage eatdeals={eatdeals}/>||
         category==='buy'&&<EatdealBuy buyers={buyers}/> }
         
         
        </FormContainer>

    </>
  );
};

export default OwnerEatdealForm;
