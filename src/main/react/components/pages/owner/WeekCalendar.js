import React, { useState } from 'react';
import styled from 'styled-components';
import { RFC_2822 } from 'moment';
import palette from '../../../lib/styles/Palette';

const Container = styled.table`
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  /* border-spacing: 0 0; */
  border-collapse: collapse;
  .th {
    background: ${palette.textGray};
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .blockItem {
    border: 1px solid ${palette.borderGray};
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
  const count = ['', '', '', '', '', '', ''];
  {
    console.log(time);
  }
  return (
    <Container>
      <thead>
        <th></th>
        {week.map((w, index) => (
          <th className="th" key={index}>
            {w}
          </th>
        ))}
      </thead>
      <tbody>
        {time.map((t, index) => (
          <tr className="tr">
            <td className="td tdItem" key={index}>
              {t}
            </td>
            {count.map(c => (
              <td className="td blockItem">1</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Container>
  );
};

export default WeekCalendar;
