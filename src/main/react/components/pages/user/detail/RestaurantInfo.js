import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { FiMapPin, FiPhone, FiTag } from 'react-icons/fi';

const InfoData = styled.div`
  padding: 1rem 0;
  border-top: 1px solid ${palette.borderGray};
  border-bottom: 1px solid ${palette.borderGray};
  div {
    display: flex;
    align-items: center;
    height: 1.9rem;
    font-size: 0.95rem;
    svg {
      margin-right: 5px;
      transform: translateY(1px);
    }
  }
`;

const RestaurantInfo = ({ info }) => {
  const { resAddress, resTel, resFoodKeyword, resOpenDay, resMenuTitle } = info;
  return (
    <InfoData>
      {resAddress && (
        <div>
          <FiMapPin />
          {resAddress}
        </div>
      )}
      {resTel && (
        <div>
          <FiPhone />
          {resTel}
        </div>
      )}
      {resFoodKeyword && (
        <div>
          <FiTag />
          {resFoodKeyword}
        </div>
      )}
      {resOpenDay && <div>영업시간</div>}
      {resMenuTitle && <div>메뉴정보</div>}
    </InfoData>
  );
};

export default RestaurantInfo;
