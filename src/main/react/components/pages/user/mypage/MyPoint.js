import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { TiArrowRightThick } from 'react-icons/ti';
import PointItem from './PointItem';
import client, { path } from '../../../../lib/api/client';
import palette from '../../../../lib/styles/Palette';
import Button from '../../../../lib/styles/Button';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import Loader from '../../../common/Loader';

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
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    b {
      font-size: 1.4rem;
      color: ${palette.primary};
    }
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

const Message = styled.div`
  width: 100%;
  text-align: center;
`;

const MyPoint = ({ currentPoint }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(moment());
  const [focused, setFocused] = useState({ start: null, end: null });

  const [loading, setLoading] = useState(true);
  const [history, SetHistory] = useState([]);

  // 마운트 시 포인트 내역 불러오기
  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = useCallback(async () => {
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
      <h3>나의 포인트 내역</h3>
      <Total>
        <div className="header">
          <span>현재 내 포인트는 </span>
          <b>{new Intl.NumberFormat().format(currentPoint)}😻</b>
        </div>
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
      {loading && <Loader />}
      {history.length > 0
        ? history.map((point, index) => <PointItem key={index} point={point} />)
        : !loading && <Message>조회 결과가 없습니다. 😥</Message>}
    </div>
  );
};

export default React.memo(MyPoint);
