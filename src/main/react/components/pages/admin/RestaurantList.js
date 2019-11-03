import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ResModal from './ResModal';
import './TableStyle.css';

const RestaurantList = ({ restaurants, match }) => {
  const { resNo } = match.params;
  const restaurant = restaurants.find(r => r.id === resNo);

  const [modal, setIsModal] = useState(false);
  const [res, setRes] = useState(null);

  //모달 키는 function
  const onClickOpenModal = res => {
    setRes(res);
    setIsModal(true);
  };

  //모달 닫는 function
  const onClickCloseModal = () => {
    setIsModal(false);
  };

  const onClcikChangePage = () => {
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
      {modal && (
        <ResModal
          restaurant={res}
          closeModal={onClickCloseModal}
          changePage={onClcikChangePage}
        />
      )}
      {restaurants.map((row, index) => {
        return (
          <tr
            key={index}
            onClick={() => onClickOpenModal(row)}
            className="resTr"
          >
            <td key={`${index}+name`}>{row.resName}</td>
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
