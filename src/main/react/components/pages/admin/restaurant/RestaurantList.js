import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResModal from './ResModal';
import '../TableStyle.css';
import { MdRestaurant } from 'react-icons/md';

const RestaurantList = ({ restaurants, loading, error, keyword }) => {
  //에러 발생시
  if (error) {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="4" className="resNullTd">
            에러가 발생했습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
    );
  }
  const restaurant =
    keyword != ''
      ? restaurants.filter(s => s.resName.includes(keyword))
      : restaurants;

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

  if (restaurant === '' && MdRestaurant === null) {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="4" className="resNullTd">
            신청내역이 존재하지 않습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
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

      {!loading &&
        restaurants &&
        restaurant.map((row, index) => {
          return (
            <tr
              key={index}
              onClick={() => onClickOpenModal(row)}
              className="resTr"
            >
              <td key={`${index}+name`}>{row.resName}</td>
              <td key={`${index}+addr`}>{row.resAddress}</td>
              <td key={`${index}+tel`}>{row.resTel}</td>
              <td key={`${index}+own`}>{row.resLocationKeyword}</td>
            </tr>
          );
        })}
    </>
  );
};

export default RestaurantList;
