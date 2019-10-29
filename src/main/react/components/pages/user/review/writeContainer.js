import React from 'react';
import { useSelector } from 'react-redux';

const writeContainer = () => {
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));
  return <div></div>;
};

export default writeContainer;
