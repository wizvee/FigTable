import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import AddressModal from './Modal/AddressModal';
import Geocode from 'react-geocode';
import ShopSearchModal from './Modal/ShopSearchModal';

const FormContainer = styled.div`
  width: 80%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

  .label {
    display: inline-block;
    width: 100%;
    padding-top: 0.5rem;
    text-align: right;
    line-height: 2;
  }
  .imgLabel {
    text-align: left;
    margin-left: 7.3rem;
    @media (max-width: 1024px) {
      margin-left: 3.5rem;
    }
  }
  .fileLabel {
    text-align: left;
    margin-left: 4.5rem;
    @media (max-width: 1024px) {
      margin-left: 1rem;
    }
  }
  .thumbButton {
    width: 150px;
    height: 100px;
    border-radius: 5px;
    background: ${palette.primary};
    opacity: 0.8;
    color: white;
    padding: 0.4rem 1.5rem 0.4rem 1.5rem;
    margin-left: 3rem;
    letter-spacing: 1px;
  }

  input[type='file'] {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .fileNameSpan {
    padding-top: 10px;
    position: relative;
    left: -30px;
    font-size: 13px;
  }
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  padding-bottom: 20px;
  font-weight: 900;
  font-size: 17px;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 70%;
  float: right;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  margin-left: 45px;
  & + & {
    margin-top: 0.5rem;
  }
`;

const Preview = styled.div`
  display: block;
  width: 250px;
  height: 250px;
  background: url(${props => props.url});
  background-size: 250px 250px;
  border-radius: 5px;
  margin-left: 5.8rem;
  margin-top: 0.5rem;
`;

const OwnerEnrollShopForm = ({
  restaurant,
  selectAddr,
  addressModal,
  addressModalClose,
  addressModalOpen,
  shopSearchModal,
  shopSearchOpen,
  shopSearchClose,
  onSearch,
  isSearch,
  restaurants,
  onSelectRes,
  newInput,
  isNewInput,
  onChange,
  onChangeFile,
  onChangeAuthFile,
  fileName,
}) => {
  const path = process.env.PATH;

  Geocode.setApiKey('AIzaSyCKi8T8JWKVOvFwgJGEf61hwpDcFSOBYyI');
  Geocode.setLanguage('kr');
  const handleData = data => {
    Geocode.fromAddress(data.jibunAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        selectAddr(data.jibunAddress, lat, lng);
      },
      error => {
        console.error(error);
      },
    );
    addressModalClose();
  };

  useEffect(() => {
    if (isNewInput) {
      document.getElementById('resN').readOnly = false;
    }
  }, [isNewInput]);

  return (
    <>
      <FormContainer>
        <SubTitle>가게 정보</SubTitle>
        <input type="hidden" name="resLat" /*  value={resLat} */ />
        <input type="hidden" name="resLong" /* value={resLong} */ />
        <div className="label">
          매장명
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resName"
            placeholder="매장명"
            id="resN"
            readOnly={true}
            onClick={() => !isNewInput && shopSearchOpen()}
            onChange={onChange}
            defaultValue={restaurant.resName}
          />
        </div>
        <div className="label">
          매장 주소
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resAddress"
            placeholder="매장 주소"
            onClick={addressModalOpen}
            onChange={onChange}
            value={restaurant.resAddress}
            readOnly
          />
        </div>
        <div className="label">
          전화번호
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="tel"
            name="resTel"
            placeholder="매장 전화번호(- 포함하여 입력)"
            onChange={onChange}
            defaultValue={restaurant.resTel}
          />
        </div>

        <div className="label">
          위치 키워드
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resLocationKeyword"
            placeholder="위치 키워드"
            onChange={onChange}
            defaultValue={restaurant.resLocationKeyword}
          />
        </div>
        <div className="label">
          음식 키워드
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resFoodKeyword"
            placeholder="음식 키워드"
            onChange={onChange}
            defaultValue={restaurant.resFoodKeyword}
          />
        </div>
        <div className="label imgLabel">
          썸네일
          <label htmlFor="thumbUpload" className="thumbButton">
            변경
          </label>
          <input
            id="thumbUpload"
            style={{ marginLeft: '45px' }}
            type="file"
            name="resThumb"
            multiple="multiple"
            onChange={onChangeFile}
          />
          <Preview
            url={
              restaurant.resThumb == ''
                ? `${path}/resources/images/ownerDefault.png`
                : restaurant.resThumb.substring(0, 4) == 'http'
                ? restaurant.resThumb
                : `${path}/resources/upload/restaurant/${restaurant.resThumb}`
            }
          />
        </div>
        <div className="label fileLabel">
          사업자등록증
          <label htmlFor="authFileUpload" className="thumbButton">
            등록
          </label>
          <input
            id="authFileUpload"
            style={{ marginLeft: '45px' }}
            type="file"
            name="authFile"
            multiple="multiple"
            onChange={onChangeAuthFile}
          />
          <span className="fileNameSpan">{fileName}</span>
        </div>
      </FormContainer>

      {!addressModal ? null : (
        <AddressModal
          handleData={handleData}
          addressModalClose={addressModalClose}
        />
      )}
      {!shopSearchModal ? null : (
        <ShopSearchModal
          shopSearchClose={shopSearchClose}
          onSearch={onSearch}
          isSearch={isSearch}
          restaurants={restaurants}
          onSelectRes={onSelectRes}
          newInput={newInput}
        />
      )}
    </>
  );
};

export default OwnerEnrollShopForm;
