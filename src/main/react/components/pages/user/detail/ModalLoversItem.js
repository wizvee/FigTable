import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .name {
    flex: 1;
  }
`;

const path = process.env.PATH;
const Profile = styled.div`
  margin-right: 0.7rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: url(${props => `${path}/resources/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const SmallButton = styled(Button)`
  font-size: 0.9rem;
  padding: 0.4rem;
`;

const ModalLoversItem = ({ lover }) => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  return (
    <Container>
      <Profile url={lover.memProfile} />
      <span className="name">{lover.memName}</span>
      <SmallButton>팔로우</SmallButton>
    </Container>
  );
};

export default React.memo(ModalLoversItem);
