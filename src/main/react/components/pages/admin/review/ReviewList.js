import React, { useState } from 'react';
import RevModal from './RevModal';
import '../TableStyle.css';
import Button from '../../../../lib/styles/Button';

const ReviewList = ({ reviews }) => {
  const [modal, setModal] = useState(false);
  const [rev, setRev] = useState(null);

  //모달 키는 function
  const onClickOpenModal = rev => {
    setRev(rev);
    setModal(true);
  };

  //모달 닫는 function
  const onClickCloseModal = () => {
    setModal(false);
  };

  if (reviews.length <= 0) {
    return (
      <>
        <tr style={{ height: 100 }}>
          <td colSpan="4" className="resNullTd">
            신고 내역이 존재하지 않습니다.
          </td>
        </tr>
        <tr style={{ height: 330 }}></tr>
      </>
    );
  }

  return (
    <>
      {modal && <RevModal review={rev} closeModal={onClickCloseModal} />}
      {reviews.map((row, index) => {
        return (
          <tr key={index} className="revTr">
            <td key={`${index}+name`}>{row.memName}</td>
            <td key={`${index}+content`}>{row.rvContent}</td>
            <td key={`${index}+date`}>{row.rvDate}</td>
            <td key={`${index}+resName`}>{row.resName}</td>
            <td key={`${index}+resAddr`}>{row.resAddr}</td>
            <td key={`${index}+del`}>
              <Button onClick={onClickOpenModal}>삭제</Button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ReviewList;
