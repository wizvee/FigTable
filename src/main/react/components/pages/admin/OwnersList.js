import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import OwnerModal from './OwnerModal';
import './TableStyle.css';

const OwnersList = ({ owners, match }) => {
  const { ownNo } = match.params;
  const owner = owners.find(o => o.ownNo === ownNo);

  const [modal, setIsModal] = useState(false);
  const [own, setOwn] = useState(null);

  //모달 키는 function
  const onClickOpenModal = own => {
    setOwn(own);
    setIsModal(true);
  };

  //모달 닫는 function
  const onClickCloseModal = () => {
    setIsModal(false);
  };

  const onClcikChangePage = () => {
    setIsModal(false);
    console.log('submit!');
  };

  const onSubmit = e => {
    e.prevenDefault();
  };

  if (!owner) {
    <tr>
      <td colSpan="4" className="resNullTd">
        신청내역이 존재하지 않습니다.
      </td>
    </tr>;
  }

  return (
    <>
      {modal && (
        <OwnerModal
          owner={own}
          closeModal={onClickCloseModal}
          changePage={onClcikChangePage}
          onSubmit={onSubmit}
        />
      )}
      {owners.map((row, index) => {
        return (
          <tr
            key={index}
            onClick={() => onClickOpenModal(row)}
            className="resTr"
          >
            <td key={`${index}+ownResName`}>{row.ownResName}</td>
            <td key={`${index}+ownResAddr`}>{row.ownResAddress}</td>
            <td key={`${index}+ownerName`}>{row.ownName}</td>
            <td key={`${index}+ownerEmail`}>{row.ownEmail}</td>
          </tr>
        );
      })}
    </>
  );
};

export default withRouter(OwnersList);
