import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import AddressModal from '../../owner/Modal/AddressModal';
import Geocode from 'react-geocode';
import ConfirmModal from './confirmModal';

const FormBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: auto;
  min-height: calc(100vh - 16rem);
  margin-top: -1rem;
  form {
    width: 290px;
    .check {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: ${palette.textGray};
      a {
        text-decoration: underline;
        transition: color 0.2s linear;
      }
      a:hover {
        color: ${palette.primary};
      }
    }
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

const ErrBlock = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Error = styled.span`
  color: red;
  margin-bottom: 0.5rem;
`;

const ButtonBlock = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.div`
  padding: 0.5rem;
  width: auto;
  height: 35px;
  background: red;
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
  text-align: center;
  align-item: center;
  display: flex;
  &:hover {
    opacity: 1;
  }
`;

const ButtonStyle = styled(Button)`
  display: inline;
  padding: 0.5rem;
  width: 100px;
  & + & {
    margin: 1rem;
  }
`;

const ImgUploadBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1px;
  input[type='file'] {
    outline: none;
    display: none;
    pointer-events: none;
    user-select: none;
  }
  label {
    cursor: pointer;
    width: 50px;
    height: 35px;
    transition: all 0.2s linear;
  }
`;
const path = process.env.PATH;
const Preview = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 30px;
  border-radius: 2px;
  background: url(${props =>
    `${path}/resources/upload/restaurant/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const InsertResForm = ({
  form,
  onChange,
  onChangeFile,
  onCancel,
  onSubmit,
  restaurant,
  selectAddr,
  addressModal,
  addressModalOpen,
  addressModalClose,
  errorMsg,
}) => {
  const path = process.env.PATH;
  Geocode.setApiKey('AIzaSyCKi8T8JWKVOvFwgJGEf61hwpDcFSOBYyI');
  Geocode.setLanguage('kr');
  const handleData = data => {
    Geocode.fromAddress(data.jibunAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        selectAddr(data.jibunAddress, lat, lng);
      },
      error => {
        console.error(error);
      },
    );
    addressModalClose();
  };

  return (
    <>
      <FormBlock>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <StyledInput
              type="text"
              name="resName"
              placeholder="매장명"
              onChange={onChange}
              value={form.resName}
            />
          </InputWrapper>

          <InputWrapper>
            <StyledInput
              type="text"
              name="resAddress1"
              placeholder="매장 주소"
              onChange={onChange}
              onClick={addressModalOpen}
              value={form.resAddress}
              readOnly
            />
          </InputWrapper>

          <InputWrapper>
            <StyledInput
              type="tel"
              name="resTel"
              placeholder="매장 전화번호"
              onChange={onChange}
              value={form.resTel}
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="text"
              name="resLocationKeyword"
              placeholder="위치 키워드"
              onChange={onChange}
              value={form.resLocationKeyword}
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="text"
              name="resFoodKeyword"
              placeholder="음식 키워드"
              onChange={onChange}
              value={form.resFoodKeyword}
            />
          </InputWrapper>

          <InputWrapper>
            <ImgUploadBlock>
              <StyledButton>
                <label htmlFor="thumbUpload">썸네일</label>
              </StyledButton>
              <StyledInput
                id="thumbUpload"
                type="file"
                name="resThumb"
                multiple="multiple"
                onChange={onChangeFile}
              />
              {form.resThumb && <Preview url={form.resThumb} />}
            </ImgUploadBlock>
          </InputWrapper>

          <ErrBlock>{errorMsg && <Error>{errorMsg}</Error>}</ErrBlock>
          <ButtonBlock>
            <ButtonStyle onClick={onCancel}>취소</ButtonStyle>
            <ButtonStyle>등록</ButtonStyle>
          </ButtonBlock>
        </form>
      </FormBlock>
      {!addressModal ? null : (
        <AddressModal
          handleData={handleData}
          addressModalClose={addressModalClose}
        />
      )}
    </>
  );
};

export default withRouter(InsertResForm);
