import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import client, { path } from '../../../../lib/api/client';
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

const ErrorMsg = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const EditPasswordPresenter = () => {
  const [tempPassword, setTempPassword] = useState({
    oldPassword: '',
    memPassword: '',
    PasswordConfirm: '',
    error: null,
  });
  const [isPassModal, setPassModal] = useState(false);

  const openPassModal = useCallback(() => {
    setPassModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closePassModal = useCallback(() => {
    setPassModal(false);
    document.body.style.overflow = 'unset';
  }, []);

  const onPassChange = useCallback(
    ({ target }) => {
      setTempPassword({ ...tempPassword, [target.name]: target.value });
    },
    [tempPassword],
  );
  const onValidate = useCallback(
    e => {
      e.preventDefault();
      const { oldPassword, memPassword, PasswordConfirm } = tempPassword;
      const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;

      if ([oldPassword, memPassword, PasswordConfirm].includes('')) {
        setTempPassword({ ...tempPassword, error: '빈 칸을 모두 입력하세요' });
        return;
      }
      if (!reg.test(memPassword)) {
        // 비밀번호가 유효하지 않는다면
        setTempPassword({
          ...tempPassword,
          error: '새 비밀번호가 유효하지 않습니다',
        });
        return;
      }
      if (memPassword != PasswordConfirm) {
        // 비밀번호가 일치하지 않는다면
        setTempPassword({
          ...tempPassword,
          error: '새 비밀번호가 일치하지 않습니다',
        });
        return;
      }
      onSubmit();
    },
    [tempPassword],
  );

  const onSubmit = useCallback(async () => {
    const { oldPassword, memPassword } = tempPassword;
    await client
      .patch(`${path}/api/member/password`, { oldPassword, memPassword })
      .then(
        setTempPassword({
          oldPassword: '',
          memPassword: '',
          PasswordConfirm: '',
          error: null,
        }),
      )
      .then(openPassModal)
      .catch(() =>
        setTempPassword({
          ...tempPassword,
          error: '이전 비밀번호가 일치하지 않습니다',
        }),
      );
  }, [tempPassword]);

  useEffect(() => {
    return () => setTempPassword(null);
  }, []);

  return (
    <>
      {isPassModal && (
        <ModalAlert
          title="비밀번호"
          msg="비밀번호가 변경되었습니다. ✍"
          closeModal={closePassModal}
        />
      )}
      <StyledForm onSubmit={onValidate}>
        <StyledInput
          autoComplete="new-password"
          name="oldPassword"
          placeholder="이전 비밀번호"
          value={tempPassword.oldPassword}
          onChange={onPassChange}
          type="password"
        />
        <StyledInput
          autoComplete="new-password"
          name="memPassword"
          placeholder="새 비밀번호  (8자 이상)"
          value={tempPassword.memPassword}
          onChange={onPassChange}
          type="password"
        />
        <StyledInput
          autoComplete="new-password"
          name="PasswordConfirm"
          placeholder="새 비밀번호 확인  (8자 이상)"
          value={tempPassword.PasswordConfirm}
          onChange={onPassChange}
          type="password"
        />
        {tempPassword.error && <ErrorMsg>{tempPassword.error}</ErrorMsg>}
        <ButtonWithMarginTop fullwidth>변경</ButtonWithMarginTop>
      </StyledForm>
    </>
  );
};

export default React.memo(EditPasswordPresenter);
