import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { MdSearch, MdClose } from 'react-icons/md';

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
  top: 14rem;
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
  max-height: 100px;
`;

const ShopSearchModal = ({ shopSearchClose }) => {
  const [keyword, setKeyword] = useState('');
  const onChange = useCallback(({ target: { value } }) => {
    setKeyword(value);
  }, []);

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
            placeholder="찾으실 매장 이름을 검색하세요"
          />
          <MdSearch />
        </ModalSearch>
        <ModalContent></ModalContent>
      </Modal>
    </ModalWrapper>
  );
};

export default ShopSearchModal;
