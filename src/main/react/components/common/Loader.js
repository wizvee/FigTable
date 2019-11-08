import React from 'react';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';
import palette from '../../lib/styles/Palette';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {
  return <ScaleLoader css={override} color={palette.primary} margin="4px" />;
};

export default Loader;
