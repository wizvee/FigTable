import React from 'react';
import { Link } from 'react-router-dom';
import path from '../Path';
import styled from 'styled-components';
import { FiStar, FiEye, FiEdit3 } from 'react-icons/fi';

const Container = styled.div``;

const Image = styled.div`
  border-radius: 3px;
  background: url(${props => `${path}/upload/thumbnail/${props.url}.jpg`});
  background-size: cover;
  background-position: center center;
  height: 12.5rem;
`;

const Like = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.3rem;
  color: white;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Title = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 1rem;
`;

const Location = styled.span`
  display: block;
  color: #868e96;
  font-size: 0.9rem;
`;

const Views = styled.span`
  color: #868e96;
  font-size: 0.85rem;
  margin-right: 0.85rem;
  svg {
    margin-right: 3px;
  }
`;

const Reviews = styled.span`
  color: #868e96;
  font-size: 0.85rem;
  svg {
    margin-right: 3px;
  }
`;

const Poster = ({ id, title, location, views, reviews }) => {
  return (
    <Link to={`/figtable/restaurants/${id}`}>
      <Container>
        <ImageContainer>
          <Image url={id} />
          <Like>
            <FiStar />
          </Like>
        </ImageContainer>
        <Title>{title}</Title>
        <Location>{location}</Location>
        <Views>
          <FiEye />
          {views}
        </Views>
        <Reviews>
          <FiEdit3 />
          {reviews}
        </Reviews>
      </Container>
    </Link>
  );
};

export default Poster;
