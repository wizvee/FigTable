import React from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';
import palette from '../../../../lib/styles/Palette';
import Poster from '../../../common/Poster';

const Container = styled(Responsive)`
  min-height: calc(100vh - 12rem);
  h4 {
    margin: 0.5rem 0;
  }
`;

const Header = styled.div`
  h3 {
    margin-top: 0;
    padding-top: 1.5rem;
    font-size: 1.3rem;
    color: ${palette.primary};
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 0.5rem;
  .ad {
    padding: 0.5rem;
    background: red;
  }
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  padding: 0.7rem 0.2rem;
  border: 1px solid ${palette.borderGray};
  font-size: 0.9rem;
  color: ${palette.textGray};
  @media (max-width: 768px) {
    grid-template-columns: (5, 1fr);
  }
  div {
    text-align: center;
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.primary};
    }
  }
  div + div {
    border-left: 1px solid ${palette.borderGray};
  }
`;

const Section = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
`;

const SearchPresenter = ({ keyword, restaurants, error, loading }) => {
  const menus = [
    '전체',
    '한식',
    '분식',
    '양식',
    '세계',
    '뷔페',
    '카페',
    '술집',
    '치킨',
    '브런치',
  ];

  if (error) return null;
  if (loading || !restaurants) return null;

  return (
    <Container>
      <Header>
        <h3>{keyword} 맛집 인기 검색순위</h3>
      </Header>
      <Body>
        {restaurants.length === 0 && (
          <div className="none">
            <h4>'{keyword}'에 대한 검색 결과가 없습니다.</h4>
            <span>검색한 식당이 피그테이블에 보이지 않을 땐?</span>
            <span>등록할 식당의 정보를 입력한 후 등록 완료!</span>
          </div>
        )}
        {restaurants.length !== 0 && (
          <div>
            <Menu>
              {menus.map(menu => (
                <div key={menu}>{menu}</div>
              ))}
            </Menu>
            <Section>
              {restaurants.map(r => (
                <Poster key={r.resNo} restaurant={r} />
              ))}
            </Section>
          </div>
        )}
        <div className="ad">
          <h4>관련콘텐츠</h4>
        </div>
      </Body>
    </Container>
  );
};

export default React.memo(SearchPresenter);
