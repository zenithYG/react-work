import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Resume from './components/Resume';
import Admin from './components/Admin';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const NavLinks = styled.div`
  margin-bottom: 20px;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const App = () => {
  return (
    <Router>
      <Container>
        <Title>WelCome, Zenith-Work</Title>
        <NavLinks>
          <Link to="/signup">회원가입</Link>
          <Link to="/signin">로그인</Link>
        </NavLinks>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
