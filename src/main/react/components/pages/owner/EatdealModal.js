import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
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
const ShareContents= styled.div`
    padding: 0.3rem;
`;
const ShareContent= styled.div`
    text-align:left;
    font-size: 1.2rem;
    padding: 0.4rem 1.2rem;
    cursor:pointer;
    
    svg {
        transform: translateY(0.5rem);
        margin-right: 1.2rem;
        font-size: 1.5rem;
    }
`;

const EatdealInput = styled.div`
margin:0.5rem 0;
padding:0 3rem;
input{
  width:80%;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  text-align:center;
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

const EatdealModal =({closeModal})=>{
    return (
        <>
        <ModalWrap>
        <Modal>
            <ModalX>
                <MdClose onClick={closeModal}/>
            </ModalX>
            <ModalTitle>기간 연장</ModalTitle>
            <Separator/> 
            
          <EatdealInput>
            <input type="text" name="resName" placeholder="2019.00.00~2019.00.00"/>
          </EatdealInput>
            <Separator/> 
        <ButtonArea>
              <EatdealButton >
                수정 완료
              </EatdealButton>
              </ButtonArea>

        </Modal>
        </ModalWrap>
        </>
    )
};
export default EatdealModal;