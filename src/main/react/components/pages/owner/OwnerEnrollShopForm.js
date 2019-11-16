import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import AddressModal from './Modal/AddressModal';
import Geocode from 'react-geocode';
import ShopSearchModal from './Modal/ShopSearchModal';

const FormConatiner = styled.div`
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
  .thumbButton {
    width: 150px;
    height: 100px;
    border-radius: 5px;
    background: ${palette.primary};
    opacity: 0.8;
    color: white;
    padding: 0.4rem 1.5rem 0.4rem 1.5rem;
    margin-left: 3rem;
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
  addressModal,
  addressModalClose,
  addressModalOpen,
  shopSearchModal,
  shopSearchOpen,
  shopSearchClose,
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

  return (
    <>
      <FormConatiner>
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
            onClick={shopSearchOpen}
            readOnly={true}
            //   onChange={onChange}
            //   defaultValue={resName}
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
            //   onChange={onChange}
            //   value={resAddress}
            readOnly
          />
        </div>
        <div className="label">
          전화번호
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="tel"
            name="resTel"
            placeholder="매장 전화번호"
            //   onChange={onChange}
            //   defaultValue={resTel}
          />
        </div>

        <div className="label">
          위치 키워드
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resLocationKeyword"
            placeholder="위치 키워드"
            //   onChange={onChange}
            //   defaultValue={resLocationKeyword}
          />
        </div>
        <div className="label">
          음식 키워드
          <StyledInput
            style={{ marginLeft: '45px' }}
            type="text"
            name="resFoodKeyword"
            placeholder="음식 키워드"
            //   onChange={onChange}
            //   defaultValue={resFoodKeyword}
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
            //   onChange={onChangeFile}
          />
          <Preview
            url={
              `${path}/resources/images/ownerDefault.png`
              // resThumb.substring(0, 4) == 'http'
              //   ? resThumb
              //   : `${path}/resources/upload/restaurant/${resThumb}`
            }
          />
        </div>
      </FormConatiner>
      {!addressModal ? null : (
        <AddressModal
          handleData={handleData}
          addressModalClose={addressModalClose}
        />
      )}
      {!shopSearchModal ? null : (
        <ShopSearchModal shopSearchClose={shopSearchClose} />
      )}
    </>
  );
};

export default OwnerEnrollShopForm;
