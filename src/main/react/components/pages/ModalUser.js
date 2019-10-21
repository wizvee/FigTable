import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalHeader from '../common/ModalHeader';
import styled from 'styled-components';
import Button from '../../lib/styles/Button';
import PosterSmall from '../common/PosterSmall';

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalUser = () => {
  const recent = useSelector(({ recent }) => recent);
  const dispatch = useDispatch();

  const menu = ['최근 본 맛집', '가고싶다'];
  return (
    <>
      <ModalHeader menu={menu} />
      {recent.map(v => (
        <PosterSmall
          key={v.id}
          id={v.id}
          title={v.title}
          location={v.location}
          rating={v.rating}
        />
      ))}
      <ModalFooter>
        <Button>로그인</Button>
      </ModalFooter>
    </>
  );
};

export default ModalUser;
