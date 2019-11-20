import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import EatdealDateModal from './EatdealDateModal';
import EatdealDeleteModal from './EatdealDeleteModal';
import moment from 'moment';

const EatdealCard =styled.div`
display:flex;
text-align:left;
padding : 0.5rem;
background-color:rgba(206,212,218,0.5);
margin: 0 1rem;
margin-top: 1rem;
border-radius: 0.3rem;
    
`;
    
const Image = styled.div`
    float:left;
    background: url(${props => `${props.url}`});
    background-size: cover;
    width : 8rem;
    height : 8rem;
`;

const RightContainer=styled.div`
float:left;
height : 8rem;
padding: 0.3rem 1rem;
    p{
        margin-top:0;
    }
`;
const Text=styled.div`
    display:block;
    font-size:0.8rem;
    color: ${palette.textGray};
    span{
        color:#57606f;
        font-weight:bold;
    }
`;

const TextS=styled.div`
    display:block;
    font-size:0.8rem;
    
    color: ${palette.textGray};
    span{
        color:${props => props.color||palette.textGray};
        font-weight:bold;
    }
`;
const ButtonArea= styled.div`
padding : 0.2rem 1rem;
text-align:right;
position:relative;
top:-2rem;
span{
  font-size:0.8rem;
  color:red;
  margin-right:1rem;
}
`;

const EatdealButton= styled(Button)`
  padding: 0.2rem 0.5rem;
  margin: 0 0.3rem;
  font-size:0.8rem;
  font-weight:normal;
  vertical-align:center;
`;


const EatdealManageDetail=({
  eatDeal, 
  onDateExtend,
  onDelete,
})=>{
  
    //모달제어
    const [dateModal, setDateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    function openDateModal(){
      setDateModal(true);
    }
    function openDeleteModal(){
      setDeleteModal(true);
    }
    function closeModal(){
      setDeleteModal(false);
      setDateModal(false);
    }

    
  //수정될 때 디스패치
  
 //수정될 때 디스패치
//  useEffect(() => {
//   setDeleteModal(false);
// }, [result])

  //result>=1? setDeleteModal(false):null

  const dispatch= useDispatch();
  const path = process.env.PATH;
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
  } = eatDeal;
  
  
   
    return (
        <> 
         
        <EatdealCard>
            <Image url={`${path}/resources/upload/eatdeal/${thumb}`}/>
            <RightContainer>
                    <Text>메뉴 : <span>{eatFoodName}</span></Text>
                    <Text>원래 가격 : <span>\{eatOriginPrice}</span> | 할인율 : <span>{Number(eatDiscount)*100}%</span> |  할인 가격 :  <span>\{Number(eatOriginPrice)*(1-Number(eatDiscount))}</span></Text>
            
                    <Text>기간 : {moment(eatStartDate).format('YYYY-MM-DD')} ~ {moment(eatEndDate).format('YYYY-MM-DD')}</Text>
                    <Text>남은 수량 : <span>{eatCount}</span> </Text>
                    {eatStatus==='P'?
                    (<TextS >상태 : <span>New</span></TextS>)
                    :(<TextS color="#f67280">상태 : <span>Sold Out</span></TextS>)
                     }
            </RightContainer>
        </EatdealCard>
        
        <ButtonArea>
        {eatStatus==='P'&&(
          <>
              <EatdealButton bgColor={palette.textGray} onClick={openDeleteModal}>
                잇딜종료
              </EatdealButton>
              <EatdealButton onClick={openDateModal}>
                기간수정
              </EatdealButton>
          </>
              )||
          eatStatus==='S'&&(
                <EatdealButton onClick={openDateModal}>
                기간연장
                 </EatdealButton>
              )||
          
          eatStatus==='E'&&(
              <span>종료됨</span>
             )
        }
            </ButtonArea>
             {  //기간연장
                !dateModal?null:
                <EatdealDateModal 
                closeModal={closeModal}
                onDateExtend={onDateExtend}
                eatNo={eatNo}
                resNo={resNo}
                />
             }    
             {  //잇딜종료
                !deleteModal?null:
                <EatdealDeleteModal 
                closeModal={closeModal}
                onDelete={onDelete}
                eatNo={eatNo}
                resNo={resNo}
                />
             }    
        
        </>
    )
}
export default EatdealManageDetail;