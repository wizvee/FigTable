import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import path from '../Path';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3 } from 'react-icons/fi';
import { insertRecent } from '../../modules/recent';

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

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 3px;
  font-size: 1rem;
`;

const Rating = styled.span`
  color: ${palette.primary};
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

const Poster = props => {
  const { id, title, location, views, reviews, rating } = props;

  const dispatch = useDispatch();
  const onInsert = useCallback(view => dispatch(insertRecent(view)), [
    dispatch,
  ]);

  return (
    <Link to={`/figtable/restaurants/${id}`}>
      <Container onClick={() => onInsert(props)}>
        <ImageContainer>
          <Image url={id} />
          <Like>
            <FiStar />
          </Like>
        </ImageContainer>
        <Title>
          {title}
          <Rating>{rating}</Rating>
        </Title>
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
