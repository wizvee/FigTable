import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import moment from 'moment';

const Wrapper=styled.div`
    display:flex;
    text-align:left;
    padding : 0.5rem;
    background-color:rgba(206,212,218,0.5);
    margin: 0 1rem;
    margin-top: 1rem;
    border-radius: 0.3rem;
    font-size:0.8rem;
    color: ${props => props.color||palette.textGray};
    :hover{
        background-color:rgba(206,212,218,0.3);
        transition-duration:0.5s;
    }   

    .confirm{
        color: black;
        cursor: pointer;
        :hover{
            color: ${palette.primary};
            }
    }
    span{
        
        padding:0 1rem;
        padding-top: 0.6rem;
        vertical-align:middle;
        width:30%;
        text-align:center;
    }
`;
  
const Image = styled.div`
    float:left;
    position:relative;
    top:-0.2rem;
    background: url(${props => `${props.url}`});
    background-size: cover;
    width : 1.5rem;
    height : 1.5rem;
    border-radius:0.75rem;
`;


const Purchaser =({buyers, keyword})=>{
    
  const{payNo,eatNo,eatFoodName,memName,memNo,thumb,buyDate,buyStatus
  }=buyers;
    const buy =
      keyword != '' ? buyers.filter(b=> b.memName.includes(keyword)) : buyers;
  

      if (buyers.length <= 0) {
        return (
           <Wrapper>
              <span >구매자가 존재하지 않습니다.</span>
            </Wrapper>
        );
      }

      return(
          <>
            {buy.map(bu=>{
                return(
                    <Wrapper key={bu.payNo}>
                        <span ><Image url='https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/52193_1488438243054735.jpg'/>
                            {bu.eatFoodName}</span>
                        <span>{bu.memName}</span>
                        <span>{moment(bu.buyDate).format('YYYY-MM-DD')}</span>
                        <span className="confirm">사용확인</span>
                    </Wrapper>
                 )

            })}
        </>
      )
        
    
}

export default Purchaser;