import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Message = styled.h1`
  font-size: 24px;
  color: #333;
`;

const TeamOptions = () => {
  return (
    <HomeContainer>
      <Message>팀의 옵션을 설정합니다.</Message>
    </HomeContainer>
  );
};

export default TeamOptions;
