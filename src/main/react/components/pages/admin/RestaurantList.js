import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantList = ({ restaurants }) => {
  return (
    <>
      {restaurants.map((row, index) => {
        return (
          <tr key={index}>
            <td key={`${index}+name`}>{row.resName}</td>
            <td key={`${index}+addr`}>
              <Link onClick="">{row.resAddr}</Link>
            </td>
            <td key={`${index}+tel`}>{row.resTel}</td>
            <td key={`${index}+own`}>{row.ownName}</td>
          </tr>
        );
      })}
    </>
  );
};

export default RestaurantList;
