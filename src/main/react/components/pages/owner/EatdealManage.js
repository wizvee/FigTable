import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EatdealManageDetail from './EatdealDetail/EatdealManageDetail';
import { deleteEat, extendEat } from '../../../../react/modules/eatdeals';

import { listOwnEat} from '../../../modules/eatdeals';
const Manage= styled.div`
  width:100%;
`;
const EatdealManage =({history, restaurant})=>{
  const {
    resNo,
  }=restaurant;
  const dispatch = useDispatch();
 
  const {
    eatdeals,
    result,
  }=useSelector(({eatdeals, loading})=>({
    eatdeals:eatdeals.ownEatdeals,
    eatError:eatdeals.error,
    result:eatdeals.result,
    eatLoading:loading['eatdeal/READ_EAT']
  }));
  
  useEffect(() => {
    dispatch(listOwnEat(resNo));
  }, [resNo]);


  //잇딜종료
  const onDelete = useCallback(
    (eatNo, resNo) => {
      dispatch(deleteEat({ eatNo, resNo }));
    },
    [dispatch],
  );
  
  
  //잇딜 연장
  const onDateExtend = useCallback(
    (eatNo, resNo, eatStartDate, eatEndDate)=> {
      console.log({eatNo, resNo, eatStartDate, eatEndDate});
      dispatch(extendEat({eatNo, resNo, eatStartDate, eatEndDate}));
    },
    [dispatch],
  );
  
  
  if(!eatdeals) {
    return null
}
    return(
        <>
        <Manage>
        {eatdeals.map(eat=>(
          <EatdealManageDetail 
          key={eat.eatNo} 
          eatDeal={eat}
          onDelete={onDelete}
          onDateExtend={onDateExtend}
          />
        ))}

        </Manage>
        
        </>
    )
}

export default EatdealManage;