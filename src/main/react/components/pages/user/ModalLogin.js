import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';
import client, { path } from '../../../lib/api/client';
import { setMember } from '../../../modules/member';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 3rem;
  width: 310px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  .msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
  padding: 0.5rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const ModalLogin = ({ msg, closeModal }) => {
  const dispatch = useDispatch();
  const { member } = useSelector(({ member }) => ({ member: member.member }));

  const onKakao = useCallback(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    window.document.body.appendChild(kakaoScript);

    kakaoScript.addEventListener('load', () => {
      Kakao.init(`${process.env.KAKAO_APIKEY}`);

      Kakao.Auth.login({
        success: function({ access_token }) {
          client
            .post(`${path}/api/auth/kakao`, access_token)
            .then(({ data }) => {
              sessionStorage.setItem('member', JSON.stringify(data));
              dispatch(setMember(data));
            });
        },
        fail: function(err) {
          console.log(err);
        },
      });
    });
  }, []);

  return (
    <>
      <Overlay onClick={closeModal} />
      <Container>
        <h3>로그인</h3>
        <div className="msg" onClick={closeModal}>
          {msg == 'review' && '로그인하시면 리뷰를 작성할 수 있어요. 😘'}
          {msg == 'like' && '로그인하시면 가고싶은 식당을 저장할 수 있어요. 😘'}
          {msg == 'love' && '로그인하시면 리뷰에 공감할 수 있어요. 😘'}
          {msg == 'comment' && '로그인하시면 리뷰에 댓글을 달 수 있어요. 😘'}
          {msg == 'payment' && '로그인하시면 잇딜을 구매할 수 있어요. 😘'}
          {msg == 'waiting' && '로그인하시면 원격 줄서기를 할 수 있어요. 😘'}
          {msg == 'question' && '로그인하시면 문의를 남기실 수 있어요. 😊'}
          <ButtonWithMarginTop to={`${process.env.PATH}/login`} fullwidth>
            로그인
          </ButtonWithMarginTop>
          <ButtonWithMarginTop onClick={onKakao} fullwidth bgColor="#fed330">
            카카오톡으로 로그인
          </ButtonWithMarginTop>
        </div>
      </Container>
    </>
  );
};

export default React.memo(ModalLogin);
