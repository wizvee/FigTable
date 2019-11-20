import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Purchaser from './EatdealDetail/Purchaser';
import EatdealSearch from './EatdealDetail/EatdealSearch';
import { listBuyEat, confirmEat } from '../../../../react/modules/eatdeals';

const Manage = styled.div`
  width:100%;
`;

const EatdealBuy =({restaurant, history})=>{
  const {
    resNo,
  }=restaurant;
  const dispatch = useDispatch();
 
  const {
    buyers,
    result,
    eatError,
    eatLoading
  }=useSelector(({eatdeals, loading})=>({
    buyers:eatdeals.buyers,
    eatError:eatdeals.error,
    result:eatdeals.result,
    eatLoading:loading['eatdeal/READ_EAT']
  }));
  
  useEffect(() => {
    dispatch(listBuyEat(resNo));
    console.log('이건가')
  }, [resNo]);

  //구매확인
  const onConfirm = useCallback(
    (payNo, resNo) => {
      console.log({payNo, resNo});
      dispatch(confirmEat({payNo, resNo}));
    },
    [dispatch],
  );
  //검색어로 찾기 
  
const [searchKeyword, setSearchKeyword] = useState('');

const input = useRef(null);

const onSubmit = e => {
  e.preventDefault();
  setSearchKeyword(input.current.value);
  console.log(searchKeyword);
};

  const buyer =
  searchKeyword != '' 
  ? buyers.filter(b=> b.memName.includes(searchKeyword)) 
  : buyers;

  

  if(!buyers) {
    return null
}
    return(
        <>
        <Manage>
          <EatdealSearch
          onSubmit={onSubmit}
          input={input}/>
          
          {buyer.map(bu=>(
            <Purchaser 
              key={bu.payNo}
              buyer={bu} 
              onConfirm={onConfirm}
              resNo={resNo}
              />
           ))}
        </Manage>
        
        </>
    )
}

export default EatdealBuy;