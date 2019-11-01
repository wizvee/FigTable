import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';

import HeaderSimple from '../../common/HeaderSimple';
import PayInfo from './detail/PayInfo';
import Separator from './detail/Separator';
import EatPayWay from './detail/EatPayWay';
import TotalPay from './detail/TotalPay';


const sample = [
    {
      eatNo: 1,
      thumb:
        'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190623074633_photo1_a8KtahP0JSRT.jpg',
      title: '달콩카페',
      status:'N',//new
      discount:'20%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:3,
      FoodName:'녹차케이크',
    },
    {
      eatNo: 2,
      thumb:
        'https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/52193_1488438243054735.jpg',
      title: '아이엠바리스타',
      status:'Y',//재입고
      discount:'40%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:50,
      FoodName:'녹차케이크',
    },
    {
      eatNo: 3,
      thumb:
        'https://mp-seoul-image-production-s3.mangoplate.com/819837_1509504944362416.jpg',
      title: '나이트티',
      status:'N',
      discount:'20%',
      originPrice:25000,
      discountPrice:20000,
      remainFood:5,
      FoodName:'녹차케이크',
    },
  ];

  
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
    const eat = sample.find(s => s.eatNo == eatNo);
    return (
        <>
        <HeaderSimple />
        <EatdealCard>
            <PayInfo eat={eat}/>
            <Separator/>
              <TotalPay eat={eat}/>
            <Separator/>
             <EatPayWay/>
            <ButtonArea>
              <CancelButton bgColor={palette.textGray}>
                취소하기 
              </CancelButton>
              <EatdealButton>
                결제하기
              </EatdealButton>
            </ButtonArea>
            
            

        </EatdealCard>
        </>
    )
}

export default EatdealpayContainer;