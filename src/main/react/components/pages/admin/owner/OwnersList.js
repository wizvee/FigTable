import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OwnerModal from './OwnerModal';
import '../TableStyle.css';

const OwnersList = ({ owners, keyword, error, loading }) => {
  const dispatch = useDispatch();

  const owner =
    keyword != '' ? owners.filter(o => o.ownName.includes(keyword)) : owners;

  //디테일 확인 모달
  const [modal, setIsModal] = useState(false);
  const [own, setOwn] = useState(null);

  //모달 키는 function
  const onClickOpenModal = own => {
    setOwn(own);
    setIsModal(true);
  };

  //모달 닫는 function
  const onReturn = () => {
    setIsModal(false);
  };

  if (owner === '') {
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
      {modal && <OwnerModal owner={own} onReturn={onReturn} />}

      {!loading &&
        owners &&
        owner.map((row, index) => {
          return (
            <tr
              key={index}
              onClick={() => onClickOpenModal(row)}
              className="resTr"
            >
              <td key={`${index}+ownResName`}>{row.resName}</td>
              <td key={`${index}+ownResAddr`}>{row.resAddress}</td>
              <td key={`${index}+ownerName`}>{row.ownName}</td>
              <td key={`${index}+ownerEmail`}>{row.ownEmail}</td>
            </tr>
          );
        })}
    </>
  );
};

export default OwnersList;
