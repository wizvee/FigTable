import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { MdSearch, MdClose } from 'react-icons/md';
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 10rem;
  width: 24rem;
  height: auto;
  border-radius: 5px;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding-top: 0.8rem;
  padding-left: 2rem;
  text-align: left;
  border-bottom: 1px solid rgba(134, 142, 150, 0.2);

  svg {
    font-size: 25px;
    float: right;
    margin-right: 1rem;
    opacity: 0.5;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 85%;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  outline: none;

  margin: 10px;
`;

const ButtonWrapper = styled.div`
  width: auto;
  height: auto;
`;

const ModalSearch = styled.div`
  display: flex;

  svg {
    font-size: 25px;
    position: relative;
    top: 16px;
    color: ${palette.textGray};
  }
`;

const ModalContent = styled.div`
  max-height: 200px;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${palette.textGray};
      border-radius: 10px;
    }
  }
`;

const ResItem = styled.div`
  width: 380px;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  float: left;
  text-align: left;
  padding-top: 7px;
  padding-left: 12px;

  &:hover {
    background-color: rgba(134, 142, 150, 0.1);
    cursor: pointer;
  }
  .resNm {
    font-weight: 900;
  }
  .resAddr {
    font-size: 12px;
    color: ${palette.textGray};
  }
`;

const NewButton = styled.div`
  width: 80%;
  height: 2rem;
  margin: 0 auto;
  background: #f67280;
  color: white;
  opacity: 0.8;
  padding-top: 6px;
  margin-top: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ShopSearchModal = ({
  shopSearchClose,
  onSearch,
  restaurants,
  isSearch,
  selectRes,
}) => {
  const [keyword, setKeyword] = useState('');
  const onChange = useCallback(({ target: { value } }) => {
    setKeyword(value);
  }, []);

  console.log(isSearch);
  return (
    <ModalWrapper>
      <Modal>
        <ModalTitle>
          매장 검색
          <MdClose onClick={shopSearchClose} />
        </ModalTitle>
        <ModalSearch>
          <StyledInput
            type="text"
            name={keyword}
            onChange={onChange}
            placeholder="찾으실 매장 이름을 검색하세요"
            onKeyPress={() => onSearch(keyword)}
          />
          <ButtonWrapper onClick={() => onSearch(keyword)}>
            <MdSearch />
          </ButtonWrapper>
        </ModalSearch>
        {restaurants != null && restaurants.length > 0 && (
          <>
            <ModalContent>
              {restaurants.map((r, index) => (
                <ResItem key={r.resNo} onClick={selectRes}>
                  <div className="resNm">{r.resName}</div>
                  <div className="resAddr">{r.resAddress}</div>
                </ResItem>
              ))}
            </ModalContent>
          </>
        )}
        {isSearch && restaurants.length === 0 && (
          <>
            <div style={{ paddingTop: '10px' }}>검색 결과가 없습니다.</div>
            <NewButton>새로입력하기</NewButton>
          </>
        )}
      </Modal>
      /
    </ModalWrapper>
  );
};

export default ShopSearchModal;
