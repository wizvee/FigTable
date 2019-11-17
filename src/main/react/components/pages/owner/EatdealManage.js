import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EatdealManageDetail from './EatdealDetail/EatdealManageDetail';
import { deleteEat, extendEat } from '../../../../react/modules/eatdeals';

import { listOwnEat} from '../../../modules/eatdeals';
const Manage= styled.div`
  width:100%;
`;
const EatdealManage =({restaurant})=>{
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

 //수정될 때 디스패치
 useEffect(() => {
  dispatch(listOwnEat(resNo));
  //setDeleteModal(false);
  console.log('잇딜디스패치됨')
}, [result])


  //잇딜종료
  const onDelete = useCallback(
    eatNo => {
      dispatch(deleteEat({ eatNo }));
    },
    [dispatch],
  );
  
  
  //잇딜 연장
  const onDateExtend = useCallback(
    (eatNo, eatStartDate, eatEndDate)=> {
      console.log({eatNo, eatStartDate, eatEndDate});
      dispatch(extendEat({eatNo, eatStartDate, eatEndDate}));
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
          result={result}
          />
        ))}

        </Manage>
        
        </>
    )
}

export default EatdealManage;