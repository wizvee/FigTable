import React, { useState, useCallback } from 'react';
import { IoIosArrowBack, IoMdSend } from 'react-icons/io';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 3rem;
  background: #14cbb2;
  color: #fff;
  svg {
    font-size: 1.3rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  span {
    display: inline-block;
    padding: 0.5rem 0.7rem;
    max-width: 90%;
    border-radius: 30px;
    text-align: right;
    font-size: 0.9rem;
  }
  span + span {
    margin-top: 0.5rem;
  }
  .category {
    border: 1px solid ${palette.borderGray};
    transition: background 0.2s linear;
    cursor: pointer;
    &:hover {
      background: ${palette.borderLightGray};
    }
  }
  .admin {
    align-self: flex-start;
    text-align: left;
    background: ${palette.borderLightGray};
  }
`;

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  button {
    position: absolute;
    top: 50%;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background: transparent;
    transform: translateY(-50%);
    font-size: 1rem;
    color: ${palette.textGray};
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const StyledInput = styled.input`
  padding: 1rem;
  width: 100%;
  height: 3rem;
  border-top: 1px solid ${palette.borderGray};
  font-size: 0.9rem;
`;

const QuestionPresenter = () => {
  const [category, setCategory] = useState('all');

  const onSelect = useCallback(type => {
    setCategory(type);
  }, []);

  return (
    <>
      <Header>
        {category != 'all' && (
          <IoIosArrowBack onClick={() => onSelect('all')} />
        )}
        문의하기
      </Header>
      <Container>
        {category == 'all' && (
          <>
            <span className="category" onClick={() => onSelect('enroll')}>
              맛집을 등록해주세요! 🤩
            </span>
            <span className="category" onClick={() => onSelect('delete')}>
              폐업한 맛집이 있어요. 😭
            </span>
            <span className="category" onClick={() => onSelect('etc')}>
              다른 문의가 있어요. 😮
            </span>
          </>
        )}
        {category == 'enroll' && (
          <>
            <span className="admin">
              안녕하세요, 피그테이블에 방문해주셔서 감사합니다. 😊
              <br />
              <br />
              등록을 원하시는 맛집의
            </span>
          </>
        )}
        {category == 'delete' && (
          <>
            <span className="admin">
              안녕하세요, 피그테이블에 방문해주셔서 감사합니다. 😊
              <br />
              <br />
              폐업한 맛집이
            </span>
          </>
        )}
        {category == 'etc' && (
          <>
            <span className="admin">
              안녕하세요, 피그테이블에 방문해주셔서 감사합니다. 😊
              <br />
              <br />
              문의를 남겨주시면 운영시간 내에 순차적으로 답변 드리겠습니다! 🤗
            </span>
          </>
        )}
      </Container>
      {category != 'all' && (
        <StyledForm>
          <StyledInput />
          <button>
            <IoMdSend />
          </button>
        </StyledForm>
      )}
    </>
  );
};

export default React.memo(QuestionPresenter);
