import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const categories = [
  {
    name: 'applyRes',
    text: '매장신청',
  },

  {
    name: 'closeRes',
    text: '매장폐업',
  },
  {
    name: 'etc',
    text: '기타',
  },
];

const SubMenu = styled.div`
  display: inline-block;
  font-size: 2rem;
  font-weight: 0;
  margin: 0 0.5rem;
  padding: 0.2rem 1rem;
  color: ${palette.textGray};
  margin-left: 1.2rem;
`;

const CategoriesBlock = styled.div`
  display: flex;
  padding: 0.3rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;
const Category = styled.div`
  font-size: 1.3rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  ${props =>
    props.active &&
    css`
      font-weight: 600;
      color: ${palette.primary};
      &:hover {
        color: ${palette.primary};
      }
    `}

  &+& {
    margin-left: 1rem;
  }
`;

const QnaCategories = ({ category, onSelect }) => {
  return (
    <SubMenu>
      <CategoriesBlock>
        {categories.map(c => (
          <Category
            key={c.name}
            active={category === c.name}
            onClick={() => onSelect(c.name)}
          >
            {c.text}
          </Category>
        ))}
      </CategoriesBlock>
    </SubMenu>
  );
};
export default QnaCategories;
