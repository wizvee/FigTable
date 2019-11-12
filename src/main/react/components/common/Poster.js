import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { MdRemoveRedEye, MdCreate } from 'react-icons/md';
import { insertRecentAsync } from '../../modules/guest';

const Image = styled.div`
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  height: 12.5rem;
  transition: all 0.2s linear;
`;

const Waiting = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 0.2rem;
  border-bottom-right-radius: 3px;
  background: #212529;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 3px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 3px;
  font-size: 1.23rem;
`;

const Rating = styled.span`
  color: ${palette.primary};
`;

const Location = styled.span`
  display: block;
  margin-top: 0.2rem;
  padding: 0 3px;
  color: ${palette.textGray};
  font-size: 0.9rem;
`;

const Icon = styled.span`
  margin-top: 0.2rem;
  margin-left: 1px;
  padding: 0 3px;
  color: ${palette.textGray};
  font-size: 0.85rem;
  svg {
    margin-right: 2px;
    transform: translateY(2px);
  }
`;

const Container = styled.div`
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
  }
`;

const Poster = ({ restaurant }) => {
  const {
    resNo,
    resThumb,
    resName,
    resLocationKeyword,
    resViews,
    resReviews,
    resRating,
    resWaiting,
    resWaitCnt,
  } = restaurant;
  const dispatch = useDispatch();
  const onInsert = useCallback(view => dispatch(insertRecentAsync(view)), [
    dispatch,
  ]);

  return (
    <Link to={`/figtable/restaurant/${resNo}`}>
      <Container onClick={() => onInsert(restaurant)}>
        <ImageContainer>
          <Image url={resThumb} />
          {resWaiting && <Waiting>대기 {resWaitCnt}팀</Waiting>}
        </ImageContainer>
        <Title>
          {resName.length > 9 ? `${resName.substring(0, 9)}...` : resName}
          <Rating>
            {isNaN(resRating / resReviews)
              ? '0.0'
              : (resRating / resReviews).toFixed(1)}
          </Rating>
        </Title>
        <Location>{resLocationKeyword}</Location>
        <Icon>
          <MdRemoveRedEye />
          {resViews}
        </Icon>
        <Icon>
          <MdCreate />
          {resReviews}
        </Icon>
      </Container>
    </Link>
  );
};

export default React.memo(Poster);
