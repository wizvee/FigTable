import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { MdModeEdit, MdPeople } from 'react-icons/md';

const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 110px;
`;

const path = process.env.PATH;
const Profile = styled.div`
  margin-bottom: 0.5rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
  ${props =>
    props.size &&
    css`
      width: ${props.size};
      height: ${props.size};
    `}
`;

const Nickname = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;

const Data = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  color: ${palette.textGray};
  svg {
    margin-right: 2px;
    font-size: 0.9rem;
    transform: translateY(3px);
  }
  span + span {
    margin-left: 5px;
  }
`;

const MemberProfile = ({ picSize, picUrl, name, rvCnt, fwCnt }) => {
  return (
    <User>
      <Profile size={picSize} url={picUrl} />
      <Nickname>{name}</Nickname>
      <Data>
        <span>
          <MdModeEdit />
          {rvCnt}
        </span>
        <span>
          <MdPeople />
          {fwCnt}
        </span>
      </Data>
    </User>
  );
};

export default React.memo(MemberProfile);
