import React,{useState} from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';


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
const PointButton= styled(Button)`
    font-size: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.2rem;
     margin: 0 0.3rem;
`;
const Emph = styled.div`
    font-size:1.1rem;
    font-weight:bold;
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
const TotalPay=({eat})=>{
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
    const memberPoint= 5000;

    //포인트 일부적용 창 키고 끄기
    const [myPoint, setMyPoint] = useState(false);
    function setTogglePoint(){
        if(myPoint===true){
            setMyPoint(false);
        }else{
            setMyPoint(true);
        }
    }
    const discountPrice=(Number(eatOriginPrice)*(1-Number(eatDiscount)));
    //총 수량
    const [Count, setCount] = useState(1);
    //회원포인트 () 안에 회원 포인트 넣기
    const [point, setPoint] = useState(memberPoint);
    //부분 포인트 입력값
    const [partPoint, setPartPoint] = useState(0);
    //적용 포인트 
    const [adPoint, setadPoint] = useState(0);
    //최종가격 
    const [totalCost, setTotalCost] = useState(discountPrice*Count);
    //총 수량 더하기
    const onAddCount=Count=>{
        //수량 누르면 포인트 적용 초기화
        setPartPoint(0);
        setadPoint(0);
        //수량설정
        setCount(Count+1);
        //상품가격+개수 
        makeTotalCost(Count+1);
    }
    //총 수량 빼기
    const onRemoveCount=()=>{
        if(Count===1){
            //수량 누르면 포인트 적용 초기화
            setPartPoint(0);
            setadPoint(0);

            setCount(1);
            makeTotalCost(1);
        }else {
            setPartPoint(0);
            setadPoint(0);

            setCount(Count-1);
            makeTotalCost(Count-1);
        }
    }

    
    //개수에 따라 가격결정
    const makeTotalCost=Count=>{
        setTotalCost(discountPrice*Count);
    }
    
    //포인트에 따라 가격결정
    const makeTotalCostP=partPoint=>{
        setTotalCost(totalCost-partPoint);
    }

    //포인트 적용
    const onSetPartAdPoint = partPoint => {
        if(memberPoint>=partPoint){
            setPoint(memberPoint-partPoint);
            setadPoint(partPoint);
            makeTotalCostP(partPoint);
            setPartPoint('');
        }else{//가지고 있는 포인트보다 큰 값 입력시
            //포인트 0으로 만들고
            setPoint(0);
            //가지고있는 포인트로 설정
            setadPoint(memberPoint);
            makeTotalCostP(memberPoint);
            setPartPoint('');
        }
    }
    //입력한 포인트 숫자로 넣어주기
    const onChange=e=>{
        setPartPoint(Number(e.target.value));
    }
    return(
        <>
        <TotalPayWrap>
            <Emph>총수량
                <span>
                    <MdRemoveCircleOutline onClick={() => onRemoveCount(Count)}/>
                    {Count}
                    <MdAddCircleOutline onClick={() => onAddCount(Count)} />
                </span>
            </Emph>
        <PayContents>
            내 포인트
            <Point>
                {point}
            </Point>
            <PointButton onClick={() => onSetPartAdPoint(point)} >모두 적용</PointButton>
            <PointButton onClick={setTogglePoint}>일부 적용</PointButton>
            { !myPoint?null:(
                <>
                <Point>
                    <input type="text" name="partPoint" value={partPoint} onChange={onChange}/>
                </Point>
                <PointButton onClick={() => onSetPartAdPoint(partPoint)}>적용</PointButton>
                </>
                )
            }
        </PayContents>
        <PayContents>
              적용 포인트<span>{adPoint} p</span>
        </PayContents>

              <Emph>총 결제금액<span className="cost">\ {totalCost}</span></Emph>
        </TotalPayWrap>
        </>

    )

}
export default TotalPay;