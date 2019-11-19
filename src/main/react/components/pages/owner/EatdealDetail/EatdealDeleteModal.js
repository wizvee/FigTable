import React,{useState} from 'react';
import styled, { css } from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import { MdClose } from 'react-icons/md';
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
const EatdealDeleteModal = ({closeModal, onDelete, eatNo, resNo})=>{
    console.log("모달"+eatNo);
    return (
        <>
        <ModalWrap>
        <Modal>
            <ModalX>
                <MdClose onClick={closeModal}/>
            </ModalX>
                <ModalTitle>잇딜 판매를 종료하시겠습니까?</ModalTitle>
            <Separator/> 
        <ButtonArea>
              <EatdealButton onClick={()=>{onDelete(eatNo,resNo), closeModal()}} >
                종료하기
              </EatdealButton>
              </ButtonArea>

        </Modal>
        </ModalWrap>
        </>

    )
};
export default EatdealDeleteModal;