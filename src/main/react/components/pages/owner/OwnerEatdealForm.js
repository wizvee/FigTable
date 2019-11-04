import React,{useState} from 'react';
import styled from 'styled-components';
import EatdealEnroll from './EatdealEnroll';
import EatdealManage from './EatdealManage';
import palette from '../../../lib/styles/Palette';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: 20px;
  margin-top: 20px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  padding-bottom: 20px;
  font-weight: 900;
  font-size: 20px;
  font-weight:normal;

`;
const SubMenu =styled.div`
    display: inline-block;
    font-size:1rem;
    font-weight:0;
    margin: 0 0.5rem;
    padding: 0.2rem 1rem;
    background-color:rgba(206,212,218,0.5);
    color: ${palette.textGray};
   

`;
const Span=styled.span`
 margin: 0 1.2rem;
 cursor: pointer;
 color: ${props => props.color||palette.textGray};
 :hover{
    color: black;
  }     
`;

const OwnerEatdealForm = () => {

  const [manage,setManage]=useState(false);
  const [fontColor1,setFontColor1]=useState('black');
  const [fontColor2,setFontColor2]=useState('');
  const openManageDiv=()=>{
    setManage(false);
    setFontColor1('black');
    setFontColor2('');
    
  }
  const openEnrollDiv=()=>{
    setManage(true);
    setFontColor1('');
    setFontColor2('black');
  }
  return (
    <>
      <FormContainer>
        <SubTitle>Eat Deal
          <SubMenu>
          <Span onClick={openManageDiv} color={fontColor1}>
            관리
          </Span>|
          <Span onClick={openEnrollDiv} color={fontColor2}>
            등록
          </Span>
          </SubMenu>
        </SubTitle>
        {!manage?  <EatdealManage/>: <EatdealEnroll/>}
         
         
        </FormContainer>

    </>
  );
};

export default OwnerEatdealForm;
