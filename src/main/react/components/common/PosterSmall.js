import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { FiStar } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  padding: 0.8rem;
`;

const Image = styled.div`
  border-radius: 3px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  width: 65px;
  height: 65px;
`;

const Like = styled.span`
  font-size: 1.5rem;
  color: ${palette.textGray};
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0.7rem;
`;

const Title = styled.span``;

const Location = styled.span`
  color: ${palette.textGray};
  font-size: 0.8rem;
`;

const Rating = styled.span`
  margin-left: 0.5rem;
  color: ${palette.primary};
`;

const PosterSmall = props => {
  const {
    resNo,
    resThumb,
    resName,
    resReviews,
    resRating,
    resLocationKeyword,
    closeModal,
  } = props;
  return (
    <Link to={`/figtable/restaurant/${resNo}`}>
      <Container onClick={closeModal}>
        <Image url={resThumb} />
        <TextWrapper>
          <Title>
            {resName}
            <Rating>{(resRating / resReviews).toFixed(1)}</Rating>
          </Title>
          <Location>{resLocationKeyword}</Location>
        </TextWrapper>
        <Like>
          <FiStar />
        </Like>
      </Container>
    </Link>
  );
};

export default PosterSmall;
