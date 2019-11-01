import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ModalTemplate from './ModalTemplate';
import './TableStyle.css';

const RestaurantList = ({ restaurants, match }) => {
  const { resNo } = match.params;
  const restaurant = restaurants.find(r => r.id === resNo);

  const [modal, setIsModal] = useState(false);

  const onClickOpenModal = () => {
    setIsModal(true);
  };

  const onClickCloseModal = () => {
    setIsModal(false);
  };

  if (!restaurant) {
    return (
      <tr>
        <td colSpan="4" className="resNullTd">
          신청내역이 존재하지 않습니다.
        </td>
      </tr>
    );
  }
  return (
    <>
      {restaurants.map((row, index) => {
        return (
          <tr key={index} onClick={() => onClickOpenModal()} className="resTr">
            <td key={`${index}+name`}>{row.resName}</td>
            <td key={`${index}+addr`}>{row.resAddr}</td>
            <td key={`${index}+tel`}>{row.resTel}</td>
            <td key={`${index}+own`}>{row.ownName}</td>
            {!modal ? null : (
              <ModalTemplate
                restaurant={restaurant}
                onClickCloseModal={onClickCloseModal}
              />
            )}
          </tr>
        );
      })}
    </>
  );
};

export default withRouter(RestaurantList);
