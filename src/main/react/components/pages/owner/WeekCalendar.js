import React, { useState } from 'react';
import styled from 'styled-components';
import { RFC_2822 } from 'moment';
import palette from '../../../lib/styles/Palette';

const Container = styled.table`
  border: none;
  width: 100%;
  height: 100%;
  /* border-spacing: 0 0; */
  border-collapse: collapse;
  .th {
    background: rgba(134, 142, 150, 0.7);
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid white;
    width: 58px;
  }

  .blockItem {
    border: 1px solid ${palette.borderGray};
    padding-top: 0;
    padding-bottom: 0;
  }
  .time {
    padding-right: 10px;
    width: 50px;
    text-align: center;
    letter-spacing: 2px;
    border: none;
  }

  .td {
    font-size: 14px;
    padding: 0.1rem;
  }

  .select {
    background: ${palette.primary};
    opacity: 0.8;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

function makeTime() {
  const t = [];
  for (let i = 0; i <= 24; i++) {
    t.push((i < 10 ? '0' + i : i) + ':00');
  }
  return t;
}

const WeekCalendar = ({ week }) => {
  const [time, setTime] = useState(makeTime);
  const count = ['1', '', '', '', '', '', ''];
  {
    console.log(time);
  }
  return (
    <Container>
      <thead>
        <th style={{ border: 'none' }}></th>
        {week.map((w, index) => (
          <th className="th" key={index}>
            {w}
          </th>
        ))}
      </thead>
      <tbody>
        {time.map((t, index) => (
          <tr className="tr">
            <td className="td time" key={index}>
              {t}
            </td>
            {count.map((c, index) => (
              <td
                key={index}
                className={c == 1 ? 'select td blockItem ' : 'td blockItem '}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </Container>
  );
};

export default WeekCalendar;
