import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Purchaser from './EatdealDetail/Purchaser';
import EatdealSearch from './EatdealDetail/EatdealSearch';
import { listBuyEat, confirmEat } from '../../../../react/modules/eatdeals';

const Manage = styled.div`
  width:100%;
`;

const EatdealBuy =({restaurant})=>{
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
  }, [resNo]);

 //수정될 때 디스패치
 useEffect(() => {
  dispatch(listBuyEat(resNo));
  console.log('잇딜디스패치됨');

}, [result])


  //구매확인
  const onConfirm = useCallback(
    payNo => {
      console.log({payNo});
      dispatch(confirmEat({payNo}));
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

  const buy =
  searchKeyword != '' ? buyers.filter(buyer=> buyer.memName.includes(searchKeyword)) : buyers;

  if (buyers.length <= 0) {
    return (
       <Wrapper>
          <span >구매자가 존재하지 않습니다.</span>
        </Wrapper>
    );
  }

  if(!buyers) {
    return null
}
    return(
        <>
        <Manage>
          <EatdealSearch
          onSubmit={onSubmit}
          input={input}/>
          
          {buyers.map(buyer=>(
            <Purchaser 
              key={buyer.payNo}
              buyer={buyer} 
              onConfirm={onConfirm}
              />
           ))}
        </Manage>
        
        </>
    )
}

export default EatdealBuy;