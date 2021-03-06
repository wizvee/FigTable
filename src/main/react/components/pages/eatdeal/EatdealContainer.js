import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../common/Loader';
import HeaderSimple from '../../common/HeaderSimple';
import EatdealMainContainer from './EatdealMainContainer';
import { listEat } from '../../../modules/eatdeals';

const EatdealContainer = () => {
  
const dispatch = useDispatch();

const {eatdeals, error, loading } = useSelector(
  ({eatdeals, loading }) => ({
    eatdeals: eatdeals.eatdeals,
    error: eatdeals.error,
    loading: loading['eatdeals/LIST_EAT'],
  }),
);
// const eatdeals=useSelector(eatdeals=> eatdeals.eatdeals);

useEffect(() => {
  dispatch(listEat());
}, [dispatch]);

// if(error) return null;

  
  return (
    <>
      <HeaderSimple />
      {loading || !eatdeals ? (
        <Loader />
      ) : (
      <div>
        {!loading && eatdeals && eatdeals.map(eatdeal=>(
          <EatdealMainContainer key={eatdeal.eatNo} eatdeal={eatdeal} />
        ))};
      </div>
      )}
      
      
    </>
  );
};

export default EatdealContainer;
