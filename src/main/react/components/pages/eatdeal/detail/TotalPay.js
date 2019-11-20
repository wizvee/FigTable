import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import { setContext } from 'redux-saga/effects';


const TotalPayWrap = styled.div`
    text-align:left;
    padding : 2rem 3rem;
  span{
    float:right;
  }
  .cost{
    color:${palette.primary};
    font-size: 1.2rem;
  }
  `;
const PayContents = styled.div`
    margin: 0.5rem;
`;
const PointButton= styled.div`
    display:inline-block;
    border: none;
    border-radius: 4px;
    background: ${palette.primary};
    color: white;
    opacity: 0.8;
    outline: none;
    transition: opacity 0.2s linear;
    cursor: pointer;

    font-size: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.2rem;
     margin: 0 0.3rem;
`;

const CancelButton= styled.div`
    display:inline-block;
    border: none;
    border-radius: 4px;
    background: ${palette.textGray};
    font-family: 'NanumSquareRound', sans-serif;
    color: white;
    opacity: 0.8;
    outline: none;
    transition: opacity 0.2s linear;
    cursor: pointer;

    font-size: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.2rem;
     margin: 0 0.3rem;
`;


const Emph = styled.div`
    font-size:1.1rem;
    font-weight:bold;
    span{
        
    cursor: pointer;
    }
    svg{
        margin:0 0.5rem;
    }
`;
const Point = styled.div`
    margin:0 0.3rem;
    display:inline-block;
    width: 5rem;
    align-items: center;
    justify-content: top;
    padding:0.2rem;
    text-align:left;
    font-size:0.6rem;
    background-color:#dfe6e9;
    color:${palette.textGray};
    border-radius:0.4rem;
    input{
        
    padding:0;
    font-size:0.6rem;
    margin:0;
    }
`;
const Msg=styled.div`
    display:inline-block;
    color:red;
    font-size:0.8rem;
    
`;
const Title=styled.div`
    display:inline-block;
    
`;
const TotalPay
=({
    eat, 
    memPoint,
    onUsePoint, 
    finalCost,  
    msg, 
    usePoint, 
    onChange,
})=>{
    const {
      eatNo,
      resNo,
      resName,
      resRocationKeyword,
      thumb,
      eatFoodName,
      eatStatus,
      eatCount,
      eatOriginPrice,
      eatDiscount,
      eatStartDate,
      eatEndDate,
      eatContent
    } = eat;
    //const memberPoint= Number(memPoint);/총 수량
    
    return(
        <>
        <TotalPayWrap>
            <Emph>총수량<span>1개</span>
{/*                 
            {cont?(
                <span>
                    <MdRemoveCircleOutline onClick={() => onRemoveCount(count)}/>
                    {count}
                    <MdAddCircleOutline onClick={() => onAddCount(count)} />
                </span>
            ):(<span onClick={onControll}>수량 보기</span>)} */}
            </Emph>

        <PayContents>
            내 냥
            <Point>
                {memPoint}
            </Point>
            <Title>사용 냥</Title>
                <Point>
                    <input type="text" name="partPoint" value={usePoint} onChange={onChange}/>
                </Point>
                <PointButton htmlType="button" onClick={() => onUsePoint()} >전액 적용</PointButton>
               
                
                 {msg && <Msg>{msg}</Msg>} 
               
            
        </PayContents>
        <PayContents>
              적용 냥<span>{usePoint} p</span>
        </PayContents>

              <Emph>총 결제금액<span className="cost">\ {finalCost}</span></Emph>
        </TotalPayWrap>
        </>

    )

}
export default TotalPay;