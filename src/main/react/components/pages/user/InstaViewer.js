import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import {
  MdModeEdit,
  MdPeople,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import RatingIcon from './RatingIcon';

const Overlay = styled.div`
  z-index: 55;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 60;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 90%;
  border-radius: 5px;
  overflow: hidden;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .img {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ReviewSection = styled.div`
  padding: 1rem;
  width: 330px;
  background: white;
  .comment {
    padding: 1rem 0;
  }
  .date {
    font-size: 0.9rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  img {
    width: auto;
    height: 90%;
  }
  svg {
    font-size: 3rem;
    color: white;
    cursor: pointer;
  }
`;

const ThumbSection = styled.div`
  display: flex;
  padding: 0 1.5rem;
  width: 100%;
  height: 70px;
  div + div {
    margin-left: 5px;
  }
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  background: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  opacity: 0.3;
  transition: all 0.2s linear;
  cursor: pointer;
  &.selected,
  &:hover {
    border: 2px solid white;
    opacity: 1;
  }
`;

const Title = styled.div`
  height: 50px;
  font-size: 1.5rem;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  height: 60px;
  border-bottom: 1px solid ${palette.borderGray};
`;

const path = process.env.PATH;
const Profile = styled.div`
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const User = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
`;

const Nickname = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: ${palette.textGray};
  svg {
    margin-right: 2px;
    font-size: 0.9rem;
    transform: translateY(2px);
  }
  span + span {
    margin-left: 5px;
  }
`;

const InstaViewer = ({ title, reviews, viewInsta, openInsta, closeInsta }) => {
  const { selectImage, isView } = viewInsta;

  if (!reviews) return null;

  // 리뷰의 이미지url만 따온 배열 생성
  const images = reviews.flatMap(review => review.rvImages);
  // 이전 이미지와 다음 이미지
  const prev =
    images[
      images.indexOf(selectImage) === 0
        ? images.length - 1
        : images.indexOf(selectImage) - 1
    ];
  const next =
    images[
      images.indexOf(selectImage) === images.length - 1
        ? 0
        : images.indexOf(selectImage) + 1
    ];

  // 선택한 이미지의 리뷰
  const selectReview = reviews.filter(review =>
    review.rvImages.includes(selectImage),
  )[0];

  return (
    isView &&
    selectReview && (
      <>
        <Overlay onClick={closeInsta} />
        <Container>
          <div className="img">
            <ImageSection>
              <MdNavigateBefore onClick={() => openInsta(prev)} />
              <img src={selectImage} alt={`${title} 리뷰사진`} />
              <MdNavigateNext onClick={() => openInsta(next)} />
            </ImageSection>
            <ThumbSection>
              {images.map((img, index) => (
                <Thumbnail
                  key={index}
                  url={img}
                  className={selectImage === img && 'selected'}
                  onClick={() => openInsta(img)}
                />
              ))}
            </ThumbSection>
          </div>
          <ReviewSection>
            <Title>{title}</Title>
            <UserWrapper>
              <Profile url={selectReview.profile} />
              <User>
                <Nickname>{selectReview.memName}</Nickname>
                <Data>
                  <span>
                    <MdModeEdit />
                    {selectReview.memRvCnt}
                  </span>
                  <span>
                    <MdPeople />
                    {selectReview.flCnt}
                  </span>
                </Data>
              </User>
              <RatingIcon
                width="50px"
                fontSize="2rem"
                rating={selectReview.rvRating}
              />
            </UserWrapper>
            <div className="comment">{selectReview.rvContent}</div>
            <div className="date">{selectReview.rvDate}</div>
          </ReviewSection>
        </Container>
      </>
    )
  );
};

export default React.memo(InstaViewer);
