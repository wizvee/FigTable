import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { lovesRv, unlovesRv } from '../../../../modules/member';
import ModalLogin from '../ModalLogin';
import client from '../../../../lib/api/client';

const Container = styled.div`
  padding-top: 0.8rem;
  width: 100%;
  color: ${palette.textGray};
`;

const Icon = styled.span`
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s linear;
  &:hover {
    color: ${palette.primary};
  }
  svg {
    margin-right: 0.2rem;
    font-size: 1.2rem;
    transform: translateY(4px);
    &.loves {
      color: ${palette.primary};
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Comment = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 0.7rem;
  font-size: 0.95rem;
  color: ${palette.text};
  & + & {
    margin: 0.1rem 0;
  }
  span + span {
    margin-left: 1.5rem;
  }
  .delBtn {
    position: absolute;
    right: 1.5rem;
    margin-left: 3rem;
    color: ${palette.textGray};
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const CommentForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin: 1rem 0 0;
  width: 100%;
  max-width: 400px;
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

const path = process.env.PATH;
const Profile = styled.div`
  margin-right: 0.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: url(${props => `${path}/upload/profiles/${props.url}`});
  background-size: cover;
  background-position: center center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-radius: 2rem;
  border: 1px solid ${palette.borderGray};
  font-size: 0.95rem;
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

const ReviewActionButtons = ({ review }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({
    member: member.member,
  }));

  const [lovesCount, setLovesCount] = useState(review.rvLove);
  const [isLoved, setLoved] = useState(review.loved);
  const [cmtArr, setCmtArr] = useState(review.comments);
  const [cmtInput, setCmtInput] = useState(false);
  const [cmtContent, setCmtContent] = useState('');
  const [isViewAllCmt, setViewAllCmt] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [msg, setMsg] = useState('review'); // login modal용 msg 설정 state

  // 모달을 열고 닫는 이벤트 핸들링
  const openModal = useCallback(type => {
    setMsg(type);
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  // 좋아요 제어 이벤트 핸들러
  const onLove = useCallback(() => {
    setLoved(true);
    setLovesCount(lovesCount + 1);
    dispatch(lovesRv({ member, review }));
  }, [dispatch, isLoved, setLoved, lovesCount, setLovesCount]);
  const onUnlove = useCallback(() => {
    setLoved(false);
    setLovesCount(lovesCount - 1);
    dispatch(unlovesRv({ member, review }));
  }, [dispatch, isLoved, setLoved, lovesCount, setLovesCount]);

  // 코멘트 창 제어 이벤트 핸들러
  const onCmtToggle = useCallback(() => {
    if (cmtInput) {
      setCmtInput(false);
      setCmtContent('');
    } else setCmtInput(true);
  }, [cmtInput, setCmtInput]);

  // 코멘트 내용 state
  const onChange = useCallback(
    ({ target }) => {
      setCmtContent(target.value);
    },
    [cmtContent, setCmtContent],
  );

  // 코멘트 등록
  const onSubmit = useCallback(async e => {
    e.preventDefault();
    await client
      .post('/figtable/api/comment', {
        rvNoRef: review.rvNo,
        memNo: member.memNo,
        rvcContent: cmtContent,
      })
      .then(({ data }) => setCmtArr(data));
    setCmtContent('');
  });

  // 코멘트 삭제
  const onDelete = useCallback(async rvcNo => {
    await client.patch(`/figtable/api/comment/${rvcNo}`);
    setCmtArr(cmtArr.filter(cmt => cmt.rvcNo != rvcNo));
  });

  // 코멘트 모두 보기
  const onViewAllCmt = useCallback(() => setViewAllCmt(true), []);

  return (
    <>
      {isModal && <ModalLogin msg={msg} closeModal={closeModal} />}
      <Container>
        {isLoved ? (
          <Icon>
            <AiFillHeart className="loves" onClick={onUnlove} />
            <span onClick={() => console.log('z')}>좋아요 {lovesCount}개</span>
          </Icon>
        ) : (
          <Icon>
            <AiOutlineHeart
              onClick={member ? onLove : () => openModal('love')}
            />
            <span onClick={() => console.log('z')}>좋아요 {lovesCount}개</span>
          </Icon>
        )}
        {member ? (
          <Icon onClick={onCmtToggle}>
            <AiOutlineMessage />
            댓글 {cmtArr.length}개
          </Icon>
        ) : (
          <Icon onClick={() => openModal('comment')}>
            <AiOutlineMessage />
            댓글 {cmtArr.length}개
          </Icon>
        )}
        {cmtInput && (
          <CommentForm onSubmit={onSubmit}>
            <Profile url={member.memProfile} />
            <StyledInput
              type="text"
              value={cmtContent}
              onChange={onChange}
              placeholder="댓글 달기..."
            />
            <button>게시</button>
          </CommentForm>
        )}
        {isViewAllCmt
          ? cmtArr.map(comment => (
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
          : cmtArr.map((comment, index) => {
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
        {cmtArr.length > 2 && !isViewAllCmt && (
          <AllCmtView>
            <span onClick={onViewAllCmt}>
              댓글 <b>{cmtArr.length}</b>개 모두 보기
            </span>
          </AllCmtView>
        )}
      </Container>
    </>
  );
};

export default React.memo(ReviewActionButtons);
