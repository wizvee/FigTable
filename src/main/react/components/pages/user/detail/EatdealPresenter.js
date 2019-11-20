import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const Image = styled.div`
  border-radius: 3px;
  background: url(${props => `${props.url}`});
  background-size: cover;
  background-position: center center;
  height: 12.5rem;
  transition: all 0.2s linear;
`;

const Item = styled(Link)`
  position: relative;
  display: block;
  cursor: pointer;
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
    .name {
      color: ${palette.text};
    }
  }
  .name {
    display: block;
    width: 100%;
    margin-top: 0.3rem;
    font-size: 0.95rem;
    color: ${palette.textGray};
    transition: color 0.2s linear;
  }
  .discount {
    position: absolute;
    right: 0;
    top: 1rem;
    padding: 0.2rem 0.5rem;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: rgba(20, 203, 178, 0.6);
    font-size: 1.5rem;
    font-family: 'Patua One';
    text-shadow: 2px 2px 0 ${palette.textGray};
    color: #fff;
  }
  .original {
    position: absolute;
    right: 0.5rem;
    top: 8rem;
    color: #fff;
    font-size: 1.2rem;
    text-decoration: line-through;
  }
  .savePrice {
    position: absolute;
    right: 0rem;
    top: 9.5rem;
    padding: 0.2rem 0.5rem;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: rgba(241, 196, 15, 0.7);
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    text-shadow: 2px 2px 0 ${palette.textGray};
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.563rem;
  padding-bottom: 1rem;
  margin-bottom: 1.3rem;
  width: 100%;
  border-bottom: 1px solid ${palette.borderGray};
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.2rem;
  }
  @media (max-width: 426px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  span {
    margin-left: 1rem;
    font-size: 0.95rem;
    font-weight: normal;
    color: ${palette.textGray};
  }
  @media (max-width: 768px) {
    padding-top: 1.3rem;
    border-top: 1px solid ${palette.borderGray};
  }
`;

const EatdealPresenter = ({ eatdealArr }) => {
  return (
    <>
      <Title>
        잇딜
        <span>할인된 가격으로 인기 메뉴를! 🤩</span>
      </Title>
      <Container>
        {eatdealArr.map(deal => (
          <Item
            key={deal.EAT_NO}
            to={`${process.env.PATH}/eatdeal/${deal.EAT_NO}`}
          >
            <Image
              url={
                deal.THUMB.substring(0, 4) == 'http'
                  ? deal.THUMB
                  : `${process.env.PATH}/resources/upload/eatdeal/${deal.THUMB}`
              }
            />
            <span className="name">{deal.EAT_FOOD_NAME}</span>
            <span className="discount">-{deal.EAT_DISCOUNT * 100}%</span>
            <span className="original">
              \{new Intl.NumberFormat().format(deal.EAT_ORIGINPRICE)}
            </span>
            <div className="savePrice">
              \
              {new Intl.NumberFormat().format(
                deal.EAT_ORIGINPRICE * (1 - deal.EAT_DISCOUNT),
              )}
            </div>
          </Item>
        ))}
      </Container>
    </>
  );
};

export default React.memo(EatdealPresenter);
