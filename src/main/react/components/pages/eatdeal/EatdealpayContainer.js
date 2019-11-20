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

import { withUserAgent } from 'react-useragent';
import queryString from 'query-string';

  
const EatdealCard =styled.div`
  display: flex;
  text-align:center; 
  margin:0px auto;
  flex-direction: column;
  width: 50rem;
  
`;

const ButtonArea= styled.div`
padding : 1rem 3rem;

`;
const EatdealButton= styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width:10rem;
  margin: 0 1rem;
  margin-bottom: 1rem;
`;

const ErrorMsg = styled.div`
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-bottom:1rem;
`;

const ModalWrap= styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 50;
`;
const Modal = styled.div`
    position:relative;
    display: flex;
    text-align:center; 
    margin:0px auto;
    flex-direction: column;
    
    background-color: white;
    top:15rem;
    width:15rem;
    height:10rem;
    border-radius:8px;

`;
const ModalTitle = styled.div`
    margin-top:3rem;
    font-size: 1.2rem;
`;
const ModalX = styled.div`
    cursor:pointer;
    text-align:right;
    font-size: 2rem;
    padding: 0.5rem;
    color:black;
`;





const EatdealpayContainer = ({match, history, form}) => {

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


//결제방법
const [payway, setPayway]=useState('');
const onPayway=useCallback(payway=>setPayway(payway),[]);
//최종가격
const [finalCost, setFinalCost]=useState(0);
//사용한 포인트
const [usedPoint, setUsedPoint]=useState(0);


//결제 핸들러
  function handleSubmit(e) {
    e.preventDefault();
    
        /* 가맹점 식별코드 */
        const userCode = 'imp19424728';
        //const userCode = 'imp97056647';

        const data = {
          pg:payway,
          name:eatdeal.eatFoodName,
          amount:250,
          buyer_name:member.memName,
        };

        if(payway!='html5_inicis'&&payway!='kakaopay') {
          setError('결제수단을 선택하세요');
          return;
        }
          /* 웹 환경일때 */
          const { IMP } = window;
          IMP.init(userCode);
          IMP.request_pay(data, callback);
      
      }
    //결제 콜백함수
  function callback(response) {
    const {
      success,
      error_msg,
    }=response;
      if (success) {
        setModal(true);//결제되었습니다 모달
        afterPay(eatNo, member.memNo, usedPoint);
        //개수 -1 처리
        //포인트차감
        //구매테이블 생성
      } else {
        alert(`결제 실패: ${error_msg}`);
        
      }
  }
  const afterPay = useCallback(
    (eatNo, memNo, poHistory ) => {
      console.log('afterpay함수')
      //잇딜개수수정
      dispatch(afterPayEat({ eatNo }));
      //구매테이블생성
      dispatch(insertPay({ eatNo, memNo }));
      if(poHistory){
      //사용자 포인트 수정
      dispatch(afterPayPoint({ memNo, poHistory }))
    }
    },
    [dispatch],
  );
  
  
  ///여기까지 결제

    //에러메세지
    const [error, setError] = useState(null);
    //모달제어
    const [isModal, setModal] = useState(false);
    function openModal(){
        setModal(true);
    }


   
    if(eatError) return null;
    return (
        <>
        <HeaderSimple />
        <form onSubmit={handleSubmit}>
        <EatdealCard>
            <PayInfo eat={eatdeal}/>
            <Separator/>
              <TotalPay eat={eatdeal} memPoint={point}/>
            <Separator/>
             <EatPayWay onPayway={onPayway}/>
            <ButtonArea>
              {/* <CancelButton bgColor={palette.textGray}>
                취소하기 
              </CancelButton> */}
              
            {error && <ErrorMsg>{error}</ErrorMsg>}
              <EatdealButton  htmlType="submit">
                결제하기
              </EatdealButton>
            </ButtonArea>
        </EatdealCard>
        </form>
        
        {!isModal?null:(
            <ModalWrap>
            <Modal>
                    <ModalTitle>결제 되었습니다.</ModalTitle>
                <Separator/> 
            <ButtonArea>
                  <EatdealButton to={`${process.env.PATH}`} >
                    확인
                  </EatdealButton>
                  </ButtonArea>
    
            </Modal>
            </ModalWrap>
        )}
        </>
    )
}

export default EatdealpayContainer;