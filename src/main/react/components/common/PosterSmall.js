import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import LikeButton from './LikeButton';

const Container = styled.div`
  display: flex;
  padding: 0.8rem;
  width: 100%;
`;

const FlexLink = styled(Link)`
  flex: 1;
  display: flex;
`;

const Image = styled.div`
  border-radius: 3px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  width: 65px;
  height: 65px;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0.7rem;
`;

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
    likesArr,
    setLikesArr,
    closeModal,
  } = props;
  return (
    <Container>
      <FlexLink to={`${process.env.PATH}/restaurant/${resNo}`}>
        <Image url={resThumb} onClick={closeModal} />
        <TextWrapper onClick={closeModal}>
          <span>
            {resName.length > 9 ? `${resName.substring(0, 9)}...` : resName}
            <Rating>
              {isNaN(resRating / resReviews)
                ? '0.0'
                : (resRating / resReviews).toFixed(1)}
            </Rating>
          </span>
          <Location>{resLocationKeyword}</Location>
        </TextWrapper>
      </FlexLink>
      <span>
        <LikeButton
          restaurant={props}
          likesArr={likesArr}
          setLikesArr={setLikesArr}
        />
      </span>
    </Container>
  );
};

export default React.memo(PosterSmall);
