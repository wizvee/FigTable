import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMessage } from 'react-icons/ai';
import styled from 'styled-components';
import { writeComment, deleteComment } from '../../../../modules/reviews';
import palette from '../../../../lib/styles/Palette';
import ModalLogin from '../ModalLogin';

const Icon = styled.span`
  margin-left: 1rem;
  font-size: 0.95rem;
  color: ${palette.textGray};
  transition: color 0.2s linear;
  cursor: pointer;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    margin-right: 0.3rem;
    font-size: 1.2rem;
    transform: translateY(4px);
    &.loves {
      color: ${palette.primary};
    }
  }
`;

const CommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Comment = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 0.7rem;
  font-size: 0.95rem;
  color: ${palette.text};
  & + & {
    margin: 0.5rem 0 0;
  }
  span + span {
    margin-left: 1.5rem;
  }
  .delBtn {
    position: absolute;
    right: 1.5rem;
    bottom: 0;
    margin-left: 3rem;
    color: ${palette.textGray};
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const path = process.env.PATH;
const Profile = styled.div`
  margin-right: 0.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: url(${props => `${path}/resources/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-radius: 2rem;
  border: 1px solid ${palette.borderGray};
  font-size: 0.95rem;
  @media (max-width: 426px) {
    width: 200px;
  }
`;

const CommentForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin: 1rem 0 0;
  width: 100%;
  max-width: 400px;
  @media (max-width: 426px) {
    ${Profile} {
      display: none;
    }
  }
  button {
    position: absolute;
    right: 1rem;
    margin-left: 0.3rem;
    border: none;
    background: transparent;
    font-family: 'NanumSquareRound', sans-serif;
    color: ${palette.textGray};
    font-size: 1rem;
    outline: none;
    transition: color 0.2s linear;
    cursor: pointer;
  }
`;

const AllCmtView = styled.div`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  span {
    cursor: pointer;
    transition: color 0.3s linear;
    &:hover {
      color: ${palette.primary};
    }
  }
`;

const ReviewActionButtonCmts = ({ review }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [isModal, setIsModal] = useState(false);
  const [viewInput, setViewInput] = useState(false);
  const [cmtInput, setCmtInput] = useState('');
  const [isViewAllCmt, setViewAllCmt] = useState(false);

  // 모달을 열고 닫는 이벤트 핸들링
  const openModal = useCallback(() => {
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  // 코멘트 창 제어 이벤트 핸들러
  const onCmtToggle = useCallback(() => {
    if (viewInput) {
      setViewInput(false);
      setCmtInput('');
    } else setViewInput(true);
  }, [viewInput, setViewInput]);

  // 코멘트 input value state
  const onChange = useCallback(
    ({ target }) => {
      setCmtInput(target.value);
    },
    [cmtInput, setCmtInput],
  );

  // 코멘트 등록
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        writeComment({
          rvNoRef: review.rvNo,
          memNo: member.memNo,
          rvcContent: cmtInput,
        }),
      );
      setCmtInput('');
    },
    [dispatch, cmtInput, setCmtInput],
  );

  // 코멘트 삭제
  const onDelete = useCallback(
    rvcNo => {
      dispatch(deleteComment({ rvNo: review.rvNo, rvcNo }));
    },
    [dispatch],
  );

  // 코멘트 모두 보기
  const onViewAllCmt = useCallback(() => setViewAllCmt(true), []);

  return (
    <>
      {member ? (
        <Icon onClick={onCmtToggle}>
          <AiOutlineMessage />
          {review.comments.length}
        </Icon>
      ) : (
        <Icon onClick={openModal}>
          <AiOutlineMessage />
          {review.comments.length}
        </Icon>
      )}
      <CommentBlock>
        {member && viewInput && (
          <CommentForm onSubmit={onSubmit}>
            <Profile url={member.memProfile} />
            <StyledInput
              type="text"
              value={cmtInput}
              onChange={onChange}
              placeholder="댓글 달기..."
            />
            <button>게시</button>
          </CommentForm>
        )}
        {isViewAllCmt
          ? review.comments.map(comment => (
              <Comment key={comment.rvcNo}>
                <span>
                  <b>{comment.memName}</b>
                </span>
                <span>{comment.rvcContent}</span>
                {member && member.memNo == comment.memNo && (
                  <span
                    className="delBtn"
                    onClick={() => onDelete(comment.rvcNo)}
                  >
                    삭제
                  </span>
                )}
              </Comment>
            ))
          : review.comments.map((comment, index) => {
              if (index < 2)
                return (
                  <Comment key={comment.rvcNo}>
                    <span>
                      <b>{comment.memName}</b>
                    </span>
                    <span>{comment.rvcContent}</span>
                    {member && member.memNo == comment.memNo && (
                      <span
                        className="delBtn"
                        onClick={() => onDelete(comment.rvcNo)}
                      >
                        삭제
                      </span>
                    )}
                  </Comment>
                );
            })}
        {review.comments.length > 2 && !isViewAllCmt && (
          <AllCmtView>
            <span onClick={onViewAllCmt}>
              댓글 <b>{review.comments.length}</b>개 모두 보기
            </span>
          </AllCmtView>
        )}
      </CommentBlock>
      {isModal && <ModalLogin msg="comment" closeModal={closeModal} />}
    </>
  );
};

export default React.memo(ReviewActionButtonCmts);
