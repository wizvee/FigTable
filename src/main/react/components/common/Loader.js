import React from 'react';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';
import palette from '../../lib/styles/Palette';

const override = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Loader = () => {
  return <ScaleLoader css={override} color={palette.primary} margin="3px" />;
};

export default React.memo(Loader);
