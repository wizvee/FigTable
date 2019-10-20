import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import path from '../Path';
import palette from '../../lib/styles/Palette';
import { FiStar } from 'react-icons/fi';

const Container = styled.div``;

const Image = styled.div``;

const Like = styled.span``;

const TextWrapper = styled.div``;

const Title = styled.span``;

const Location = styled.span``;

const Rating = styled.span``;

const PosterSmall = props => {
  const { id, title, location, rating } = props;
  return (
    <Link to={`/figtable/restaurants/${id}`}>
      <Container>
        <Image url={id} />
        <TextWrapper>
          <Title>
            {title}
            <Rating>{rating}</Rating>
          </Title>
          <Location>{location}</Location>
        </TextWrapper>
        <Like>
          <FiStar />
        </Like>
      </Container>
    </Link>
  );
};

export default PosterSmall;
