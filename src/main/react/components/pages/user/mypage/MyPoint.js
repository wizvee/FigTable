import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { TiArrowRightThick } from 'react-icons/ti';
import client, { path } from '../../../../lib/api/client';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 0 2rem;
  width: 90%;
  font-weight: 600;
  .header {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .total {
    font-size: 1.3rem;
    color: ${palette.primary};
  }
  .datePicker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 1rem;
    font-weight: normal;
    input {
      text-align: center;
      font-size: 0.9rem !important;
      border-radius: 4px;
      background: #f1f3f5;
      transition: font 0.2s linear;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
    button {
      margin-left: 0.5rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
    }
    svg {
      margin: 0 0.5rem;
      font-size: 1rem;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 90%;
  margin: 0 auto;
  & + & {
    border-top: 1px dashed ${palette.borderGray};
  }
`;

const State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &.plus {
    border: 1px solid #38d9a9;
    color: #38d9a9;
  }
  &.minus {
    border: 1px solid #ff8787;
    color: #ff8787;
  }
`;

const Info = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1fr 1fr;
  small {
    color: ${palette.textGray};
  }
`;

const Point = styled.div`
  &.plus {
    color: #38d9a9;
  }
  &.minus {
    color: #ff8787;
  }
`;

const PointItem = ({ point }) => {
  const isPlus = point.poHistory > 0;

  return (
    <Container>
      <State className={isPlus ? 'plus' : 'minus'}>
        {isPlus ? '적립' : '사용'}
      </State>
      <Info>
        <small>{point.poDate}</small>
        <span>{point.poContent}</span>
      </Info>
      <Point className={isPlus ? 'plus' : 'minus'}>
        {isPlus
          ? `+${new Intl.NumberFormat().format(point.poHistory)}😽`
          : `${new Intl.NumberFormat().format(point.poHistory)}😹`}
      </Point>
    </Container>
  );
};

const MyPoint = ({ currentPoint }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(moment());
  const [focused, setFocused] = useState({ start: null, end: null });

  const [loading, setLoading] = useState(false);
  const [history, SetHistory] = useState([]);

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    await client
      .post(`${path}/api/member/point`, {
        startDate: startDate && startDate.format('YYYY-MM-DD'),
        endDate: endDate && endDate.format('YYYY-MM-DD'),
      })
      .then(({ data }) => SetHistory(data));
    setLoading(false);
  }, [startDate, endDate]);

  return (
    <div>
      {history.length > 0 && (
        <>
          <h3>나의 포인트 내역</h3>
          <Total>
            <span className="header">총 포인트</span>
            <span className="total">
              {new Intl.NumberFormat().format(currentPoint)}😻
            </span>
            <div className="datePicker">
              <SingleDatePicker
                date={startDate}
                onDateChange={date => setStartDate(date)}
                focused={focused.start}
                onFocusChange={({ focused }) =>
                  setFocused({ ...focused, start: focused })
                }
                id="startDate"
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                numberOfMonths={1}
                displayFormat="YYYY.MM.DD"
                withPortal
                noBorder
              />
              <TiArrowRightThick />
              <SingleDatePicker
                date={endDate}
                onDateChange={date => {
                  if (isInclusivelyBeforeDay(startDate, date)) setEndDate(date);
                }}
                focused={focused.end}
                onFocusChange={({ focused }) =>
                  setFocused({ ...focused, end: focused })
                }
                id="endDate"
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                numberOfMonths={1}
                displayFormat="YYYY.MM.DD"
                withPortal
                noBorder
              />
              <Button onClick={onSubmit}>조회</Button>
            </div>
          </Total>
          {history.map((point, index) => (
            <PointItem key={index} point={point} />
          ))}
        </>
      )}
    </div>
  );
};

export default MyPoint;
