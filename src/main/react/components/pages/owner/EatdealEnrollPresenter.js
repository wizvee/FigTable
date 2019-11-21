import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
import DatePicker from './EatdealDetail/DatePicker';

const EnrollWrapper = styled.div`
  height:45rem;
  @media (max-width: 1024px) {
  height:60rem;
  }
`;
const EatdealDateInput= styled.div`

    margin:0.5rem 0;
    padding:0 3rem;
    .wrap{
      display:inline-block;
      width:60%;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      outline: none;
  @media (max-width: 1024px) {
    width: 100%;
  }
      :focus{
        border: 1px solid ${palette.primary};
        transition-duration:0.5s;
      }
    }
    .title{
      display:inline-block;
      width:8rem;
      text-align:right;
      margin-right:1rem;
      vertical-align:top;
    }
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
         @media (max-width: 1024px) {
          text-align:left;
           }
    }
    input{
      width:60%;
      border-radius: 5px;
      border: 1px solid ${palette.borderGray};
      font-size: 0.8rem;
      outline: none;
      
  @media (max-width: 1024px) {
      width:100%;
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
         @media (max-width: 1024px) {
           width:100%;}
      :focus{
        border: 1px solid ${palette.primary};
        transition-duration:0.5s;
      }
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
         @media (max-width: 1024px) {
           width:100% !important;
           }
  `;
  const ButtonArea = styled.div`
      font-size: 0.8rem;
      outline: none;
  `;
  const PointButton= styled(Button)`
      display:inline-block;
      float:right;
      margin-top: 0.5rem;
      font-size: 0.8rem;
  `;
  const FileButton = styled.div`
   /*인풋 파일버튼*/
    margin:0.5rem 0;
    padding:0 3rem;
  
    .title{
      display:inline-block;
      width:8rem;
      text-align:right;
      margin-right:1rem;
      vertical-align:top;
    }
.fileinput {
  height: 0;
  overflow: hidden;
  width: 0;
  display:none;
}

.changePhoto{
	
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  background: #868e96;
  font-size: 0.8rem;
  font-weight:normal;
  font-family: 'NanumSquareRound', sans-serif;
  color: white;
  opacity: 0.8;
  outline: none;
  transition: opacity 0.2s linear;
  cursor: pointer;
  margin-top:0.3rem;
  display:inline-block;
}
.changePhoto:hover{
  opacity: 1;
}

`;

const ErrorMsg = styled.div`
  margin-top: 1rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;
const EatdealEnrollPresenter =({ 
  form, onChange, onChangeFile, onSetValue, onSubmit, error, restaurant
 })=>{
  const {
    resNo,
  } = restaurant;
  const path = process.env.PATH;

    return(
        <>
        
       <EnrollWrapper>
         <form onSubmit={onSubmit}>
           <EatdealInput>
            <div className="title">Eatdeal 메뉴이름</div>
            <input 
              type="text" 
              name="eatFoodName" 
              value={form.eatFoodName}
              onChange={onChange}
              placeholder="예)소금구이 2인"/>
          </EatdealInput>
          <FileButton>
            <div className="title">대표사진<br/>
            <input 
                className="fileinput"
                type="file" 
                id="file"
                name="thumb" 
                onChange={onChangeFile}
              />
              <label htmlFor="file" className="changePhoto">
                사진변경</label>
            </div>
            
            {(form.thumb) ?
              ( <Image url={`${path}/resources/upload/eatdeal/${form.thumb}`}/>)
              : (
                <Image url='https://mamadips.com/wp-content/uploads/2016/11/defimage.gif'/>
              )}
            
            </FileButton>
         
          <EatdealInput>
            <div className="title">할인 전 가격</div>
            <input 
              type="number" 
              name="eatOriginPrice" 
              value={form.eatOriginPrice}
              onChange={onChange}
              placeholder="예)25000원"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">할인율</div>
            <input 
              type="number" 
              name="eatDiscount" 
              value={form.eatDiscount}
              onChange={onChange}
              placeholder="예)25% => 0.25"/>
          </EatdealInput>
          <EatdealInput>
            <div className="title">개수</div>
            <input 
              type="number" 
              name="eatCount" 
              value={form.eatCount}
              onChange={onChange}
              placeholder="n개"/>
          </EatdealInput>
          <EatdealDateInput>
            <div className="title">날짜</div>
            <div className="wrap">
               <DatePicker onSetValue={onSetValue}/>
           {/* <input type="hidden" name="eatStartDate" value={form.eatStartDate}/>
           <input type="hidden" name="eatEndDate" value={form.eatEndDate}/> */}
            </div>
          </EatdealDateInput>
          
          
          <EatdealInput>
            <div className="title">상세내용</div>
            <textarea  
              rows="10" 
              name="eatContent"
              value={form.eatContent}
              onChange={onChange}
              placeholder="예)피그테이블은 240시간 침지숙성 그리고 3일간의 드라이에이징으로 교차숙성을 진행하여 고객분들에게 극강의 숙성육을 제공합니다."
              
              ></textarea>
          </EatdealInput>
          <EatdealInput>
            <div className="title"></div>
            <ButtonArea>

            {error && <ErrorMsg>{error}</ErrorMsg>}
            <PointButton>등록</PointButton>
            </ButtonArea>
          </EatdealInput>
          </form>
         </EnrollWrapper>
        </>

    );
  };


export default React.memo(EatdealEnrollPresenter);