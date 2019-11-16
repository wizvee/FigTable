import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EatdealManageDetail from './EatdealDetail/EatdealManageDetail';
import { deleteEat } from '../../../../react/modules/eatdeals';

const Manage= styled.div`
  width:100%;
`;

const EatdealManage =({eatdeals})=>{
  const dispatch = useDispatch();
 
  //잇딜종료
  const onDelete = useCallback(
    eatNo => {
      console.log(eatNo);
      // dispatch(deleteEat({ eatNo }));
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
          />
        ))}

        </Manage>
        
        </>
    )
}

export default EatdealManage;