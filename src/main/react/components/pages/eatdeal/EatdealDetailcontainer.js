import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import HeaderSimple from '../../common/HeaderSimple';
import palette from '../../../lib/styles/Palette';
import { FiShare2 } from 'react-icons/fi';
import { FaInfoCircle,FaChevronRight } from 'react-icons/fa';
import DisCountPrice from './detail/DisCountPrice';
import EatDealIntroduce from './detail/EatDealIntroduce';
import { Link } from 'react-router-dom';

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
  
const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height:40rem;
`;
const Image = styled.div`
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  height: 100%;
  transition: all 0.2s linear;
`;

const Status = styled.div`
    position:absolute;
    left: 0.8rem;
    bottom:0;
    z-index:2;
    text-align: right;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    padding: 0.2rem;
    padding-left:0.7rem;
    padding-right:0.4rem;
    background: #212529;
    background-color:${palette.textGray};
    color: white;
    margin-bottom:0.8rem;
    border-radius:4px;
    opacity: 0.9;
`;
const IconContainer =styled.div`
    position:absolute;
    padding:0.3rem;
    right:0;
    top:0;
`;
const TextContainer= styled.div`
    margin-top:0.3rem;
    padding: 0.7rem;
`;
const TextTitle=styled.div`
    text-align:left;
    font-size:1.2rem;
    font-weight:bold;
`;
const Infowrap=styled.div`
    margin:0.1rem;
`;
const RestauInfo=styled.div`
    width: 6rem;
    margin-top:0.3rem;
    align-items: center;
    justify-content: top;
    padding:0.2rem;
    text-align:left;
    font-size:0.6rem;
    background-color:#dfe6e9;
    color:${palette.textGray};
    border-radius:0.4rem;
    svg {
        transform: translateY(1px);
    }
`;

const DiscountFoodName=styled.p`
    text-align:left;
    font-size:1rem;
    color:${palette.textGray};
    margin:0.5rem 0;
`;

    const Usedate = styled.div`
    text-align:left;
    font-size:0.8rem;
    font-weight:bold;

`;
    const RightContainer= styled.div`
    text-align: right;
    right:0;
    bottom:0;
    `;
const Separator = styled.div`
    position:relative;
    display: block;
    height:1px;
    margin:0.3rem 0.1rem;
    background-color:#E9E9E9;
`;
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
            <ImageContainer>
                <Image url={eat.thumb}/>
                    <IconContainer>
                        <FiShare2 color="white" size="1.6rem"/>
                    </IconContainer>
                <Status>{eat.FoodName} {eat.discount} 할인</Status> 
            </ImageContainer>

            <TextContainer>
                <TextTitle>{eat.title}</TextTitle>
                <Infowrap>
                    <RestauInfo>
                        <Link to={`/figtable/restaurant/${eat.eatNo}` /*식당정보로 바꾸기*/}>
                            <FaInfoCircle/> 식당정보보기 <FaChevronRight/> 
                        </Link>
                    </RestauInfo>
                </Infowrap>
                <DiscountFoodName>{eat.FoodName}</DiscountFoodName>
                <Usedate>사용기간</Usedate>
                <RightContainer>
                    <DisCountPrice key={eat.eatNo} eat={eat}/>
                </RightContainer>

                <Separator/>
                <EatDealIntroduce/>
                
            </TextContainer>
        </EatdealCard>
        </>
    )
};
export default withRouter(EatdealDetailContainer);