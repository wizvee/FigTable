import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import path from '../Path';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { FiStar, FiEye, FiEdit3 } from 'react-icons/fi';
import { insertRecentAsync } from '../../modules/recent';

const Image = styled.div`
  border-radius: 3px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  height: 12.5rem;
  transition: all 0.2s linear;
`;

const Like = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  right: 5px;
  width: 1.7rem;
  height: 1.7rem;
  border: 1.5px solid white;
  border-radius: 50%;
  font-size: 1.3rem;
  color: white;
  transition: all 0.3s ease-in-out;
  &:hover {
    border: 1.5px solid ${palette.secondary};
    background: ${palette.secondary};
  }
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
  color: ${palette.textGray};
  font-size: 0.9rem;
`;

const Views = styled.span`
  color: ${palette.textGray};
  font-size: 0.85rem;
  margin-right: 0.85rem;
  svg {
    margin-right: 3px;
  }
`;

const Reviews = styled.span`
  color: ${palette.textGray};
  font-size: 0.85rem;
  svg {
    margin-right: 3px;
  }
`;

const Container = styled.div`
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
  }
`;

const Poster = props => {
  const { id, thumb, title, location, views, reviews, rating } = props;

  const dispatch = useDispatch();
  const onInsert = useCallback(view => dispatch(insertRecentAsync(view)), [
    dispatch,
  ]);

  return (
    <Link to={`/figtable/restaurants/${id}`}>
      <Container onClick={() => onInsert(props)}>
        <ImageContainer>
          <Image url={thumb} />
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
