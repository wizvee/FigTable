import React, { useState, useCallback, useSelector } from 'react';
import RevModal from './RevModal';
import '../TableStyle.css';
import moment from 'moment';

const ReviewList = ({ reviews, loading, error, actionButtons }) => {
  //에러 발생시
  if (error) {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="5" className="resNullTd">
            에러가 발생했습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
    );
  }

  const [modal, setModal] = useState(false);
  const [rev, setRev] = useState(null);

  //모달 키는 function
  const onClickOpenModal = rev => {
    setRev(rev);
    setModal(true);
  };

  //모달 닫는 function
  const onReturn = () => {
    setModal(false);
  };

  if (reviews == null || reviews == '') {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="5" className="resNullTd">
            신고 내역이 존재하지 않습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
    );
  }

  return (
    <>
      {!loading &&
        reviews &&
        reviews.map((rev, index) => {
          return (
            <tr
              key={index}
              className="revTr"
              onClick={() => onClickOpenModal(rev)}
            >
              <td key={`${index}+name`}>{rev.memName}</td>
              <td key={`${index}+content`}>{rev.rvContent}</td>
              <td key={`${index}+date`}>
                {moment(rev.rvDate).format('YYYY-MM-DD')}
              </td>
              <td key={`${index}+resName`}>{rev.resName}</td>
            </tr>
          );
        })}
      {modal && (
        <RevModal
          review={rev}
          onReturn={onReturn}
          actionButtons={actionButtons}
        />
      )}
    </>
  );
};

export default ReviewList;
