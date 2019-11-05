import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalHeader from '../../common/ModalHeader';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Button from '../../../lib/styles/Button';
import PosterSmall from '../../common/PosterSmall';
import { FaTimes } from 'react-icons/fa';
import { removeRecentAsync } from '../../../modules/guest';
import ModalLogin from './ModalLogin';
import { getRes } from '../../../modules/guest';

const Container = styled.div`
  height: 320px;
  overflow-y: auto;
  .nullText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    height: 100%;
    span {
      display: block;
      text-align: center;
    }
    .big {
      font-size: 1.5rem;
    }
    .small {
      color: ${palette.primary};
    }
  }
`;

// clear all div
const ClearAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2rem;
  padding-right: 1rem;
  font-size: 0.9rem;
  color: ${palette.textGray};
  span {
    cursor: pointer;
  }
  svg {
    margin-left: 3px;
    transform: translateY(1px);
  }
`;

// 로그인, 로그아웃 푸터
const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  height: 3rem;
  border-top: 1px solid ${palette.borderGray};
`;

const ButtonWithPadding = styled(Button)`
  padding: 0.5rem;
`;

const ModalUser = ({ closeModal, member, onLogout }) => {
  const [select, setSelect] = useState('recent');

  const { recent, likes, recentLoading } = useSelector(
    ({ guest, member, loading }) => ({
      recent: guest.recent,
      likes: member.likes,
      recentLoading: loading['recent/GET_RES'],
    }),
  );
  const dispatch = useDispatch();
  const onRemove = useCallback(() => dispatch(removeRecentAsync()), [dispatch]);

  const menu = [
    { key: 'recent', text: '최근 본 맛집' },
    { key: 'likes', text: '가고싶다' },
  ];

  // 처음 마운트 될 때 레스토랑 정보 갱신
  useEffect(() => {
    dispatch(getRes(Array.from(recent)));
  }, [dispatch]);

  if (recentLoading) return null;

  return (
    <>
      <ModalHeader menu={menu} select={select} setSelect={setSelect} />
      <Container>
        {select === 'recent' && recent.length === 0 && (
          <div className="nullText">
            <span className="big">거기가 어디였지?</span>
            <span className="small">
              내가 둘러 본 식당이 이 곳에 순서대로 기록됩니다.
            </span>
          </div>
        )}
        {select === 'recent' && recent.length !== 0 && (
          <>
            <ClearAll>
              <span onClick={onRemove}>clear all</span>
              <FaTimes />
            </ClearAll>
            {recent.map(r => (
              <PosterSmall
                key={r.resNo}
                resNo={r.resNo}
                resThumb={r.resThumb}
                resName={r.resName}
                resReviews={r.resReviews}
                resRating={r.resRating}
                resLocationKeyword={r.resLocationKeyword}
                closeModal={closeModal}
              />
            ))}
          </>
        )}
        {select === 'likes' && member && (
          <div className="nullText">
            <span className="big">격하게 가고싶다..</span>
            <span className="small">
              식당의 ‘별’ 아이콘을 누르면 가고싶은 곳을 쉽게 저장할 수 있습니다.
            </span>
          </div>
        )}
        {select === 'likes' && !member && (
          <ModalLogin msg="like" closeModal={() => setSelect('recent')} />
        )}
      </Container>
      {member ? (
        <ModalFooter>
          <ButtonWithPadding onClick={onLogout} fullwidth>
            로그아웃
          </ButtonWithPadding>
        </ModalFooter>
      ) : (
        <ModalFooter onClick={closeModal}>
          <ButtonWithPadding to="/figtable/login" fullwidth>
            로그인
          </ButtonWithPadding>
        </ModalFooter>
      )}
    </>
  );
};

export default React.memo(ModalUser);
