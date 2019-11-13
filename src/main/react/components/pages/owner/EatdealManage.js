import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
import EatdealManageDetail from './EatdealDetail/EatdealManageDetail';

const Manage= styled.div`
  width:100%;
`;

const EatdealManage =({eatdeals})=>{

  if(!eatdeals) {
    return <div>존재하지 않습니다.</div>
}
    return(
        <>
        <Manage>
        {eatdeals.map(eat=>(
          <EatdealManageDetail key={eat.eatNo} eatDeal={eat}/>
        ))}

        </Manage>
        
        </>
    )
}

export default EatdealManage;