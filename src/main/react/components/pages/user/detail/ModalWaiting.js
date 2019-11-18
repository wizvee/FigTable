import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1.5rem;
  width: 310px;
  height: 270px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  h3 {
    margin: 0;
  }
  small {
    color: ${palette.textGray};
    margin-bottom: 1.7rem;
  }
  .waited {
    font-size: 0.9rem;
    text-align: right;
    margin-right: 0.5rem;
  }
`;

const SetPeople = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  width: 100%;
  svg {
    margin: 0 0.4rem;
    color: ${palette.textGray};
    transform: translateY(3px);
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: auto;
  padding: 0.5rem;
`;

const ErrorMsg = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const ModalWaiting = ({ onModal }) => {
  const { member, restaurant } = useSelector(({ member, restaurant }) => ({
    member: member.member,
    restaurant: restaurant.restaurant,
  }));

  const [people, setPeople] = useState(0);
  const [error, setError] = useState('');

  const onIncrease = useCallback(() => setPeople(people + 1), [people]);
  const onDecrease = useCallback(() => setPeople(people - 1), [people]);

  const onSubmit = useCallback(async () => {
    if (people == 0) {
      setError('0명은 줄을 설 수 없어요! 😥');
      return;
    }
  });

  return (
    <>
      <Overlay onClick={onModal} />
      <Container>
        <h3>원격 줄서기</h3>
        <small>3km 이내에 있는 매장만 대기가 가능합니다.</small>
        <div className="waited">현재 0팀 대기</div>
        <SetPeople>
          <span>인원 👨‍👩‍👧‍👦</span>
          <div>
            <MdRemoveCircleOutline onClick={onDecrease} />
            <span>{people}</span>
            <MdAddCircleOutline onClick={onIncrease} />
          </div>
        </SetPeople>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <ButtonWithMarginTop onClick={onSubmit} fullwidth>
          줄서기
        </ButtonWithMarginTop>
      </Container>
    </>
  );
};

export default React.memo(ModalWaiting);