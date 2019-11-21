import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineAlert, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import ModalConfirm from '../../../common/ModalConfirm';
import client, { path } from '../../../../lib/api/client';
import { warnReview, deleteReview } from '../../../../modules/reviews';
import ModalAlert from '../../../common/ModalAlert';
import { check } from '../../../../modules/member';

const Icon = styled.span`
  position: absolute;
  top: 12px;
  right: 0;
  font-size: 0.95rem;
  color: ${palette.textGray};
  cursor: pointer;
  svg {
    margin-right: 0.2rem;
    font-size: 1.2rem;
    transform: translateY(4px);
    transition: color 0.2s linear;
    &:hover {
      color: ${palette.text};
    }
    &.alert:hover {
      color: red;
    }
  }
`;

const ReviewActionButtonWarn = ({ review }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [isMemerCheck, setMemberCheck] = useState(false);

  const [isWarnPop, setWarnPop] = useState(false);
  const [isDelPop, setDelPop] = useState(false);
  const [isPointPop, setPointPop] = useState(false);
  const [target, setTarget] = useState('');
  // 모달 이벤트 핸들러
  const openDelPop = useCallback(
    rvNo => {
      setDelPop(true);
      setTarget(rvNo);
      document.body.style.overflow = 'hidden';
    },
    [setTarget],
  );
  const closeDelPop = useCallback(() => {
    setDelPop(false);
    document.body.style.overflow = 'unset';
  }, []);
  const openWarnPop = useCallback(
    rvNo => {
      setWarnPop(true);
      setTarget(rvNo);
      document.body.style.overflow = 'hidden';
    },
    [setTarget],
  );
  const closeWarnPop = useCallback(() => {
    setWarnPop(false);
    document.body.style.overflow = 'unset';
  }, []);
  const openPointPop = useCallback(() => {
    setPointPop(true);
    document.body.style.overflow = 'hidden';
  });
  const closePointPop = useCallback(() => {
    setPointPop(false);
    document.body.style.overflow = 'unset';
  });

  const onWarn = useCallback(async () => {
    setMemberCheck(true);
    closeWarnPop();
    await client
      .post(`${path}/api/review/warn/${target}`)
      .then(() => dispatch(warnReview(target)));
  }, [target]);

  const onDel = useCallback(() => {
    setMemberCheck(true);
    closeDelPop();
    if (member.memPoint < 300) {
      openPointPop();
      return;
    }
    dispatch(deleteReview({ rvNo: review.rvNo, memNo: member.memNo }));
  }, []);

  // unmount 시 멤버 정보 DB와 크로스 체크
  useEffect(() => {
    return () => {
      if (isMemerCheck && member) dispatch(check(member.memNo));
    };
  }, [isMemerCheck]);

  return (
    member && (
      <>
        {isWarnPop && (
          <ModalConfirm
            title="리뷰 신고"
            msg="정말 이 리뷰를 신고할까요?👮‍♀️"
            confirm={onWarn}
            closeModal={closeWarnPop}
          />
        )}
        {isDelPop && (
          <ModalConfirm
            title="리뷰 삭제"
            msg="정말 이 리뷰를 삭제할까요? 300😿이 차감됩니다."
            confirm={onDel}
            closeModal={closeDelPop}
          />
        )}
        {isPointPop && (
          <ModalAlert
            title="삭제 실패"
            msg={`😿이 충분하지 않아 리뷰를 삭제할 수 없어요.`}
            closeModal={closePointPop}
          />
        )}
        {member.memNo == review.memNo && (
          <Icon>
            <AiOutlineDelete onClick={() => openDelPop(review.rvNo)} />
          </Icon>
        )}
        {member.memNo != review.memNo && (
          <Icon>
            <AiOutlineAlert
              className="alert"
              onClick={() => openWarnPop(review.rvNo)}
            />
          </Icon>
        )}
      </>
    )
  );
};

export default React.memo(ReviewActionButtonWarn);
