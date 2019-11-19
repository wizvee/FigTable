import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import { MdClose } from 'react-icons/md';
import moment from 'moment';

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
    width:24rem;
    height:15rem;
    border-radius:8px;

`;
const ModalTitle = styled.div`
    font-size: 1.2rem;
`;
const ModalX = styled.div`
    cursor:pointer;
    text-align:right;
    font-size: 2rem;
    padding: 0.5rem;
    color:black;
`;

const Separator = styled.div`
    position:relative;
    display: block;
    height:1px;
    margin:0.5rem;
    background-color:#E9E9E9;
`;

const EatdealDateInput= styled.div`

    margin:0.5rem 0;
    padding:0 3rem;
    .wrap{
      display:inline-block;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      outline: none;
      :focus{
        border: 1px solid ${palette.primary};
        transition-duration:0.5s;
      }
    }
`;

const EatdealButton= styled(Button)`
  padding: 0.5rem 0.5rem;
  margin: 0 0.3rem;
  font-size:1rem;
  width:6rem;
  font-weight:normal;
  vertical-align:center;
`;

const ButtonArea= styled.div`
padding : 0.2rem 1rem;
text-align:center;
`;

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
    
    .confirmed{
        color:${palette.primary};
        
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

const Purchaser =({buyer, onConfirm})=>{
    
  const{payNo,eatNo,eatFoodName,memName,memNo,thumb,buyDate,buyStatus
  }=buyer;
   
    
    //모달제어
    const [isModal, setModal] = useState(false);
    function openModal(){
        setModal(true);
    }
    function closeModal(){
        setModal(false);
    }

    

      return(
        <>
        <Wrapper key={payNo}>
            <span ><Image url='https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/52193_1488438243054735.jpg'/>
                {eatFoodName}</span>
            <span>{memName}</span>
            <span>{moment(buyDate).format('YYYY-MM-DD')}</span>
            {buyStatus==='U'?(
                <span className="confirmed">사용됨</span>
           
            ):(
           <span className="confirm" onClick={openModal}>사용확인</span>
           )
            }
        </Wrapper>
        
        {!isModal?null:(
            <ModalWrap>
            <Modal>
                <ModalX>
                    <MdClose onClick={closeModal}/>
                </ModalX>
                    <ModalTitle>사용확인합니다.</ModalTitle>
                <Separator/> 
            <ButtonArea>
                  <EatdealButton onClick={()=>{onConfirm(payNo), closeModal()}} >
                    확인
                  </EatdealButton>
                  </ButtonArea>
    
            </Modal>
            </ModalWrap>
        )}
       
       </>
     )              

        
    
}

export default Purchaser;