import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';

import HeaderSimple from '../../common/HeaderSimple';
import PayInfo from './detail/PayInfo';
import Separator from './detail/Separator';
import EatPayWay from './detail/EatPayWay';
import TotalPay from './detail/TotalPay';
import { readEat } from '../../../modules/eatdeal';
import { getPoint } from '../../../modules/point';

  
const EatdealCard =styled.div`
  display: flex;
  text-align:center; 
  margin:0px auto;
  flex-direction: column;
  width: 50rem;
  
`;

const ButtonArea= styled.div`
padding : 2rem 3rem;

`;
const EatdealButton= styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width:10rem;
  margin: 0 1rem;
  margin-bottom: 1rem;
`;


const CancelButton= styled(Button)`

  margin-top: 0.5rem;
  padding: 0.5rem;
  width:10rem;
`;

const EatdealpayContainer = ({match}) => {

    const { eatNo } = match.params;
    const dispatch= useDispatch();

    const {
      eatdeal,
      member,
      point,
      eatError,
      eatLoading
    }=useSelector(({eatdeal, member, point, loading})=>({
      member:member.member,
      point:point.point,
      eatdeal:eatdeal.eatdeal,
      eatError:eatdeal.error,
      eatLoading:loading['eatdeal/READ_EAT']
    }));
  useEffect(() => {
    dispatch(readEat(eatNo));
    dispatch(getPoint(member.memNo));
  }, [eatNo])
    
  const [pay, setPay]=useState('');
  const onPayway=useCallback(pay=>setPay(pay),[]);
  

   
    if(eatError) return null;
    return (
        <>
        <HeaderSimple />
        <EatdealCard>
            <PayInfo eat={eatdeal}/>
            <Separator/>
              <TotalPay eat={eatdeal} memPoint={point}/>
            <Separator/>
             <EatPayWay onPayway={onPayway}/>
            <ButtonArea>
              <CancelButton bgColor={palette.textGray}>
                취소하기 
              </CancelButton>
              <EatdealButton >
                결제하기
              </EatdealButton>
            </ButtonArea>
            
            

        </EatdealCard>
        </>
    )
}

export default EatdealpayContainer;