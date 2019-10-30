import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import HeaderSimple from '../../common/HeaderSimple';
import EatDealImageContainer from './detail/EatDealImageContainer';
import DisCountPrice from './detail/DisCountPrice';
import EatDealIntroduce from './detail/EatDealIntroduce';
import EatDealInfo from './detail/EatDealInfo';
import palette from '../../../lib/styles/Palette';

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
  
const TextContainer= styled.div`
    margin-top:0.3rem;
    padding: 0.7rem;
`;

const Separator = styled.div`
    position:relative;
    display: block;
    height:1px;
    margin:0.3rem 0.1rem;
    background-color:#E9E9E9;
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
`;
// const Spacer=styled.div`
//     height:8rem;
// `;
// const [isSpace, setIsSpace] = useState(false);
// useEffect(()=>{
//     setIsSpace(false);
//     if (window.scrollY < 250) setIsSpace(true);
//     window.addEventListener('scroll', handleScroll);

// })
const EatdealDetailContainer=({match})=>{
    const { eatNo } = match.params;
    {console.log(eatNo)}
    const eat = sample.find(s => s.eatNo == eatNo);
    if(!eat) {
        return <div>존재하지 않습니다.</div>
    }
    return(
        <>
        <HeaderSimple />
        <EatdealCard>
            <EatDealImageContainer key={eat.eatNo} eat={eat}/>
            <TextContainer>
                <EatDealInfo key={eat.eatNo} eat={eat}/>
                <DisCountPrice key={eat.eatNo} eat={eat}/>
                <Separator/>
                <EatDealIntroduce/>
            </TextContainer>
            
        <Button>구매하기</Button>
      {/* {!isSpace && <Spacer />} */}
        </EatdealCard>
        </>
    )
};
export default withRouter(EatdealDetailContainer);