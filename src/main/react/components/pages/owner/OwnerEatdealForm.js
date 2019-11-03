import React,{useState} from 'react';
import styled from 'styled-components';
import EatdealEnroll from './EatdealEnroll';
import EatdealManage from './EatdealManage';

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

`;
const SubMenu =styled.div`
    display: inline-block;
    font-size:1rem;
    font-weight:0;
    margin: 0 0.5rem;
    padding: 0.2rem 1rem;
    background-color:rgba(206,212,218,0.5);
    span{
      margin: 0 1.2rem;
      cursor: pointer;
    }

`;
const OwnerEatdealForm = () => {

  const [manage,setManage]=useState(false);
  const openManageDiv=()=>{
    setManage(false);
  }
  const openEnrollDiv=()=>{
    setManage(true);

  }
  return (
    <>
      <FormContainer>
        <SubTitle>Eat Deal
          <SubMenu>

          <span onClick={openManageDiv}>
            관리
          </span>|
          <span onClick={openEnrollDiv}>
            등록
          </span>
          </SubMenu>
        </SubTitle>
        {!manage?  <EatdealManage/>: <EatdealEnroll/>}
         
         
        </FormContainer>

    </>
  );
};

export default OwnerEatdealForm;
