import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderSimple from '../../common/HeaderSimple';
import EatdealMainContainer from './EatdealMainContainer';
import { listEat } from '../../../modules/eatdeals';

const EatdealContainer = () => {
  
const dispatch = useDispatch();


// const { eatdeals, error, loading } = useSelector(
//   ({ eatdeals, loading }) => ({
//     eatdeals: eatdeals.eatdeals,
//     error: eatdeals.error,
//     loading: loading['eatdeal/LIST_EAT'],
//   }),
// );

console.log( ['eatdeals/LIST_EAT']);
useEffect(() => {
  dispatch(listEat());
}, [dispatch]);

  
  return (
    <>
      <HeaderSimple />
      <div>
        {eatDeals.map(eatDeal=>(
          <EatdealMainContainer key={eatDeal.eatNo} eatDeal={eatDeal}/>
        ))};
      </div>
      
      
    </>
  );
};

export default EatdealContainer;
