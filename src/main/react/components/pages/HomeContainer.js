import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import HomePresenter from './HomePresenter';
import Footer from '../common/Footer';

const HomeContainer = () => {
  const [localPlates, setLocalPlates] = useState(null);
  const [loading, setLoading] = useState(false);

  return loading ? null : (
    <>
      <HomePresenter localPlates={localPlates} loading={loading} />
      <Footer />
    </>
  );
};

export default HomeContainer;
