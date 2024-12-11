import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #8b4513;
  font-size: 48px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const HomeButton = styled(Button)`
  background-color: #8b4513;
  border-color: #8b4513;
  color: #fff;

  &:hover {
    background-color: #a0522d;
    border-color: #a0522d;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear user session, tokens, etc.
    alert("You have been logged out.");
    navigate('/login'); // Redirect to login page
  };

  return (
    <HomeContainer>
      <Title>Welcome to the Scholarship Management System</Title>
      <Description>
        Here you can manage your scholarships, applications, and more.
      </Description>
      <HomeButton onClick={handleLogout}>Logout</HomeButton>
    </HomeContainer>
  );
};

export default Home;
