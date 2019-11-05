import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 80%;
  height: 200px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  margin-left: 10%;
  margin-top: 10%;
`;

const WaitingForm = () => {
  return <FormContainer>폼</FormContainer>;
};

export default WaitingForm;
