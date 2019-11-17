import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import client, { path } from '../../../../lib/api/client';
import { check } from '../../../../modules/member';
import ModalAlert from '../../../common/ModalAlert';

const StyledForm = styled.form`
  margin: 0 auto;
  width: 290px;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const EditProfilePresenter = ({ member }) => {
  const dispatch = useDispatch();
  const [tempMember, setTempMember] = useState(member);
  const [isModal, setModal] = useState(false);

  const openModal = useCallback(() => {
    setModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback(() => {
    setModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  const onChange = useCallback(
    ({ target }) => {
      setTempMember({ ...tempMember, [target.name]: target.value });
    },
    [tempMember],
  );
  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      await client
        .patch(`${path}/api/member/profile`, tempMember)
        .then(() => dispatch(check(member.memNo)))
        .then(openModal)
        .catch(err => console.log(err));
    },
    [tempMember],
  );

  useEffect(() => {
    return () => setTempMember(null);
  }, []);

  return (
    <>
      {isModal && (
        <ModalAlert
          title="프로필"
          msg="프로필이 저장되었습니다. ✍"
          closeModal={closeModal}
        />
      )}
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          autoComplete="memEmail"
          name="memEmail"
          placeholder="이메일 입력"
          value={tempMember.memEmail}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="memPhone"
          name="memPhone"
          placeholder="휴대전화 입력"
          value={tempMember.memPhone}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="memName"
          name="memName"
          placeholder="이름 입력"
          value={tempMember.memName}
          onChange={onChange}
        />
        <ButtonWithMarginTop fullwidth>저장</ButtonWithMarginTop>
      </StyledForm>
    </>
  );
};

export default React.memo(EditProfilePresenter);
