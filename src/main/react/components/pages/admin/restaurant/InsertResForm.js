import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import InsertButton from './InsertButton';

const FormBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  position: relative;
  height: auto;
  min-height: 500px;
  margin-top: -1rem;
  width: 350px;
`;

const InputWrapper = styled.div`
  & + & {
    margin-top: 0.5rem;
  }
`;
const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 300px;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
`;

const Span = styled.span`
  color: red;
  width: 10%;
  margin-right: 0.6rem;
`;

const ButtonBlock = styled.div`
  width: 80px;
  margin-top: 0.5rem;
  margin-left: 1.2rem;
`;

const StyledButton = styled.div`
  padding: 0.5rem;
  width: auto;
  height: 35px;
  background: red;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background: ${palette.primary};
  font-size: 1rem;
  font-weight: 500;
  font-family: 'NanumSquareRound', sans-serif;
  color: white;
  opacity: 0.8;
  outline: none;
  transition: opacity 0.2s linear;
  cursor: pointer;
  text-align: center;
  align-item: center;
  display: flex;
  &:hover {
    opacity: 1;
  }
`;

const ImgUploadBlock = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 1px;
  input[type='file'] {
    outline: none;
    display: none;
    pointer-events: none;
    user-select: none;
  }
  label {
    display: inline-block;
    width: 50px;
    height: 35px;
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;

const Preview = styled.div`
  display: inline-block;
  width: 90px;
  height: 90px;
  margin-right: 5px;
  border-radius: 2px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const InsertResForm = ({
  resName,
  resAddress,
  resTel,
  ownName,
  resLocationKeyword,
  resFoodKeyword,
  resOpenDay,
  resCloseTime,
  resThumb,
  onChange,
  onChangeFile,
}) => {
  const [modal, setModal] = useState(false);

  //주소 검색 모달 열기
  // const toggleModal = () => {
  //   setModal(modal === false ? true : false);
  // };

  return (
    <>
      <FormBlock>
        <InputWrapper>
          <Span>*</Span>
          <StyledInput
            type="text"
            name="resName"
            placeholder="매장명"
            onChange={onChange}
          />
        </InputWrapper>
        {/* <ButtonBlock>
            <StyledButton onClick={toggleModal}>
              <div style={{ width: 80 }}>주소 찾기</div>
            </StyledButton>
            {modal && <Postcode />}
          </ButtonBlock> */}
        <InputWrapper>
          <Span>*</Span>
          <StyledInput
            type="text"
            name="resAddress1"
            placeholder="매장 주소"
            onChange={onChange}
          />
        </InputWrapper>
        {/* <InputWrapper>
            <Span>*</Span>
            <StyledInput
              type="text"
              name="resAddress2"
              placeholder="매장 상세주소"
              onChange={onChange}
            />
          </InputWrapper> */}
        <InputWrapper>
          <Span>*</Span>
          <StyledInput
            type="tel"
            name="resTel"
            placeholder="매장 전화번호"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Span>*</Span>
          <StyledInput
            type="text"
            name="resLocationKeyword"
            placeholder="위치 키워드"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Span>*</Span>
          <StyledInput
            type="text"
            name="resFoodKeyword"
            placeholder="음식 키워드"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Span>&nbsp;</Span>
          <StyledInput
            type="text"
            name="ownName"
            placeholder="대표자명"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Span>&nbsp;</Span>
          <StyledInput
            type="text"
            name="resOpenDay"
            placeholder="영업일"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Span>&nbsp;</Span>
          <StyledInput
            type="text"
            name="resCloseTime"
            placeholder="운영시간"
            onChange={onChange}
          />
        </InputWrapper>
        <InputWrapper>
          <ImgUploadBlock>
            <StyledButton style={{ marginLeft: 13 }}>
              <label htmlFor="thumbUpload">썸네일</label>
            </StyledButton>
            <StyledInput
              id="thumbUpload"
              style={{ marginLeft: '76px' }}
              type="file"
              name="resThumb"
              multiple="multiple"
              onChange={onChangeFile}
            />
            {resThumb.length != 0 && <Preview url={img} />}
          </ImgUploadBlock>
          <InputWrapper>
            <Span> </Span>
            <InsertButton />
          </InputWrapper>
        </InputWrapper>
      </FormBlock>
    </>
  );
};

export default InsertResForm;
