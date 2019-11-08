import React,{useState, useCallback} from 'react';
import styled from 'styled-components';
import EatdealCategory from './EatdealCategory';
import EatdealEnroll from './EatdealEnroll';
import EatdealManage from './EatdealManage';
import EatdealBuy from './EatdealBuy';
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


const OwnerEatdealForm = () => {

  const [category, setCategory]=useState('manage');
  const onSelect=useCallback(category=>setCategory(category),[]);

  
  return (
    <>
      <FormContainer>
        <SubTitle>Eat Deal
          <SubMenu>
            <EatdealCategory category={category} onSelect={onSelect}/>
          </SubMenu>
        </SubTitle>
        {/* 카테고리별로 컴포넌트 불러옴 */}
        {category==='enroll'&& <EatdealEnroll/>||
         category==='manage'&&<EatdealManage/>||
         category==='buy'&&<EatdealBuy/> }
         
         
        </FormContainer>

    </>
  );
};

export default OwnerEatdealForm;
