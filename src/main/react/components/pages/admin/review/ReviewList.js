import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import client, { path } from '../../../../lib/api/client';
import { removeReview, returnReview } from '../../../../modules/adminReviews';
import RevModal from './RevModal';
import '../TableStyle.css';
import moment from 'moment';
import ConfirmModal from '../restaurant/confirmModal';
import styled from 'styled-components';
import Loader from '../../../common/Loader';

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 460px;
`;

const NoneData = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: #868e96;
  font-size: 1.3em;
`;

const ErrorBlock = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: red;
  font-size: 1.3rem;
`;

const ReviewList = ({ reviews, loading, error }) => {
  const dispatch = useDispatch();
  //에러 발생시
  if (error) {
    return (
      <>
        return <ErrorBlock>에러가 발생했습니다. 다시 시도해주세요.</ErrorBlock>;
      </>
    );
  }

  const [modal, setModal] = useState(false);
  const [rev, setRev] = useState(null);
  const [target, setTarget] = useState('');
  const [confirm, setConfirm] = useState(false);

  //모달 키는 function
  const onClickOpenModal = useCallback(rev => {
    setRev(rev);
    setTarget(rev.rvNo);
    setModal(true);
  }, []);

  //컨펌 모달 끄기
  const onCloseModal = () => {
    setConfirm(false);
  };

  //리뷰 복구
  const onReturn = useCallback(async () => {
    setModal(false);
    setConfirm(true);
    await client
      .post(`${path}/api/adminReturnReview/${target}`)
      .then(() => dispatch(returnReview(target)));
  }, [target]);

  //리뷰 삭제
  const onRemove = useCallback(async () => {
    setModal(false);
    setConfirm(true);
    await client
      .patch(`${path}/api/adminRemoveReview/${target}`)
      .then(() => dispatch(removeReview(target)));
  }, [target]);

  if (!loading && (reviews == null || reviews == '')) {
    return (
      <>
        <NoneData>신청내역이 존재하지 않습니다.</NoneData>;
      </>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>작성자</th>
              <th>내용</th>
              <th>작성일</th>
              <th>매장명</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </TableWrapper>

      {modal && (
        <RevModal review={rev} onReturn={onReturn} onRemove={onRemove} />
      )}
      {confirm && (
        <ConfirmModal
          msg="정상적으로 처리되었습니다."
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default ReviewList;
