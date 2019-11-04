import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import {
  MdSentimentVerySatisfied,
  MdSentimentSatisfied,
  MdSentimentNeutral,
} from 'react-icons/md';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.width};
  color: ${palette.primary};
  svg {
    font-size: ${props => props.fontSize};
  }
  span {
    font-size: 0.8rem;
  }
`;

const RatingIcon = props => {
  return (
    <Icon {...props}>
      {props.rating == 5 && (
        <>
          <MdSentimentVerySatisfied />
          <span>맛있어</span>
        </>
      )}
      {props.rating == 3 && (
        <>
          <MdSentimentSatisfied />
          <span>괜찮아</span>
        </>
      )}
      {props.rating == 1 && (
        <>
          <MdSentimentNeutral />
          <span>별로야</span>
        </>
      )}
    </Icon>
  );
};

export default React.memo(RatingIcon);
