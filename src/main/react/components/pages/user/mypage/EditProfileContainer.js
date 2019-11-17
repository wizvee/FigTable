import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import EditProfilePresenter from './EditProfilePresenter';
import EditPasswordPresenter from './EditPasswordPresenter';

const SubMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  margin: 1rem auto 1.5rem;
  width: 290px;
  color: ${palette.textGray};
  span {
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
  .selected {
    border-bottom: 2px solid ${palette.text};
    font-weight: 600;
    color: ${palette.text};
  }
`;

const EditProfileContainer = ({ member }) => {
  const [subMenu, setSubMenu] = useState('profile');

  const setMenu = useCallback(type => {
    setSubMenu(type);
  }, []);

  return (
    <div>
      <SubMenu>
        <span
          className={subMenu == 'profile' ? 'selected' : ''}
          onClick={() => setMenu('profile')}
        >
          프로필 편집
        </span>
        <span
          className={subMenu != 'profile' ? 'selected' : ''}
          onClick={() => setMenu('password')}
        >
          비밀번호 변경
        </span>
      </SubMenu>
      {subMenu == 'profile' && <EditProfilePresenter member={member} />}
      {subMenu == 'password' && <EditPasswordPresenter />}
    </div>
  );
};

export default React.memo(EditProfileContainer);
