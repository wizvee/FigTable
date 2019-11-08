import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
import DatePicker from './EatdealDetail/DatePicker';


    const StyledButton = styled.button`
    width: 140px;
    height: 40px;
    font-weight: 900;
    font-size: 20px;
    float: right;
    margin-top: 19px;
    margin-right: 23px;
    border-radius: 5px;
    background: #f67280;
    color: white;
  `;
  const EatdealInput = styled.div`
    margin:0.5rem 0;
    padding:0 3rem;
  
    .title{
      display:inline-block;
      width:8rem;
      text-align:right;
      margin-right:1rem;
      vertical-align:top;
    }
    input{
      width:60%;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      outline: none;
      :focus{
        border: 1px solid ${palette.primary};
        transition-duration:0.5s;
      }
    }
    textarea{
      width:60%;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      :focus{
        border: 1px solid ${palette.primary};
        transition-duration:0.5s;
      }
    }
    
  `;
  const Image= styled.div`
      display:inline-block;
      background: url(${props => `${props.url}`});
      position: relative;
      overflow: hidden;
      height:15rem;
      background-size: cover;
      background-position: center center;
      transition: all 0.2s linear;
  
      width:60% !important;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      outline: none;
  `;
  const ButtonArea = styled.div`
      width:60%;
      font-size: 0.8rem;
      outline: none;
  `;
  const PointButton= styled(Button)`
      margin-top: 0.5rem;
      font-size: 0.8rem;
  `;
  
const EatdealEnroll =()=>{

    return(
        <>
        
       
        <EatdealInput>
            <div className="title">eatdeal 제목</div><input type="text" name="resName" placeholder="예)피그테이블 역삼점"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">대표사진<br/>
            <PointButton bgColor="gray">추가</PointButton></div>
            <Image url='https://mamadips.com/wp-content/uploads/2016/11/defimage.gif'/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">메뉴이름</div><input type="text" name="eatMenu" placeholder="예)소금구이 2인"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">할인 전 가격</div><input type="text" name="eatCost" placeholder="예)25000원"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">할인율</div><input type="text" name="eatDiscount" placeholder="예)25"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">날짜</div>
            
          <DatePicker/>
          </EatdealInput>
          
          
          <EatdealInput>
            <div className="title">상세내용</div><textarea  rows="10" placeholder="예)피그테이블은 240시간 침지숙성 그리고 3일간의 드라이에이징으로 교차숙성을 진행하여 고객분들에게 극강의 숙성육을 제공합니다."></textarea>
          </EatdealInput>
          <EatdealInput>
            <div className="title"></div>
            <ButtonArea>


            <PointButton>등록</PointButton>
            </ButtonArea>
          </EatdealInput>
        </>

    )
  }


export default EatdealEnroll;