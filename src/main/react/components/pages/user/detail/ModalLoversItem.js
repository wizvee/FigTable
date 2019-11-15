import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import client, { path } from '../../../../lib/api/client';
import Button from '../../../../lib/styles/Button';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
  .name {
    flex: 1;
  }
`;

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

  const [isFollowing, setFollowing] = useState(lover.following);

  const following = useCallback(async memNo => {
    await client
      .post(`${path}/api/member/following`, {
        memNo: member.memNo,
        targetMemNo: memNo,
      })
      .then(() => setFollowing(true));
  }, []);

  const unFollowing = useCallback(async memNo => {
    await client
      .patch(`${path}/api/member/following`, {
        memNo: member.memNo,
        targetMemNo: memNo,
      })
      .then(() => setFollowing(false));
  }, []);

  return (
    <Container>
      <Profile url={lover.memProfile} />
      <span className="name">{lover.memName}</span>
      {member && !isFollowing && lover.memNo != member.memNo && (
        <SmallButton onClick={() => following(lover.memNo)}>팔로우</SmallButton>
      )}
      {member && isFollowing && lover.memNo != member.memNo && (
        <SmallButton outline onClick={() => unFollowing(lover.memNo)}>
          팔로잉
        </SmallButton>
      )}
    </Container>
  );
};

export default React.memo(ModalLoversItem);
