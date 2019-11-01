import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ModalTemplate from './ModalTemplate';

const RestaurantList = ({ restaurants, match }) => {
  const { resNo } = match.params;
  const restaurant = restaurants.find(r => r.resNo === resNo);
  const [modal, setIsModal] = useState(false);

  const onClickOpenModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  if (!restaurant) {
    return <div>존재하지 않습니다.</div>;
  }
  return (
    <>
      {restaurants.map((row, index) => {
        return (
          <tr key={index}>
            <td key={`${index}+name`}>
              <Link onClick={() => onClickOpenModal()}>{row.resName}</Link>
              {!modal ? null : <ModalTemplate />}
            </td>
            <td key={`${index}+addr`}>{row.resAddr}</td>
            <td key={`${index}+tel`}>{row.resTel}</td>
            <td key={`${index}+own`}>{row.ownName}</td>
          </tr>
        );
      })}
    </>
  );
};

export default withRouter(RestaurantList);
