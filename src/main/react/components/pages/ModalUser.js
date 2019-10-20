import React from 'react';
import ModalHeader from '../common/ModalHeader';
import styled from 'styled-components';
import Button from '../../lib/styles/Button';

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalUser = () => {
  const menu = ['최근 본 맛집', '가고싶다'];
  return (
    <>
      <ModalHeader menu={menu} />
      <div>모달 내용</div>
      <ModalFooter>
        <Button>로그인</Button>
      </ModalFooter>
    </>
  );
};

export default ModalUser;
