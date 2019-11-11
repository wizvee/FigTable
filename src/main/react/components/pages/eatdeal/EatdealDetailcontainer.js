import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter,Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderSimple from '../../common/HeaderSimple';
import EatDealImageContainer from './detail/EatDealImageContainer';
import DisCountPrice from './detail/DisCountPrice';
import EatDealIntroduce from './detail/EatDealIntroduce';
import EatDealInfo from './detail/EatDealInfo';
import Separator from './detail/Separator';
import palette from '../../../lib/styles/Palette';
import { readEat } from '../../../modules/eatdeal';



  export const EatdealCard =styled.div`
  display: flex;
  text-align:center; 
  margin:0px auto;
  flex-direction: column;
  width: 50rem;
  
  `;
  
const TextContainer= styled.div`
    margin-top:0.3rem;
    padding: 0.7rem;
`;

const Button= styled.div`
    background-color:${palette.primary};
    text-align:center; 
    font-size: 1.2rem;
    padding: 1rem 0;
    width: 50rem;
    color: white;
    border:none;
    cursor: pointer;
    position:sticky;
    bottom:0;
`;
const EatdealDetailContainer=({match})=>{
    const { eatNo } = match.params;
    const dispatch= useDispatch();

    const {
      eatdeal,
      eatError,
      eatLoading
    }=useSelector(({eatdeal, loading})=>({
      eatdeal:eatdeal.eatdeal,
      eatError:eatdeal.error,
      eatLoading:loading['eatdeal/READ_EAT']
    }));
    
  // 처음 마운트 될 때 레스토랑 가져오기 API요청
  useEffect(() => {
    dispatch(readEat(eatNo));
  }, [eatNo])

    const [modal, setIsModal] = useState(false);
    function openModal(){
      setIsModal(true);
    }
    function closeModal(){
      setIsModal(false);
    }

    if(!eatdeal) {
        return <div>존재하지 않습니다.</div>
    }
    return(
        <>
        <HeaderSimple />
        <EatdealCard>
            <EatDealImageContainer eat={eatdeal} modal={modal} openModal={openModal} closeModal={closeModal}/>
            <TextContainer>
                <EatDealInfo eat={eatdeal}/>
                <DisCountPrice eat={eatdeal}/>
                <Separator/>
                <EatDealIntroduce eat={eatdeal}/>
            </TextContainer >
            <Link to={`/figtable/payment/${eatNo}`}>
              <Button>구매하기</Button> 
            </Link>
        </EatdealCard>
        </>
    )
};
export default withRouter(EatdealDetailContainer);