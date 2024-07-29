// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  width: 100%;
  max-width: 320px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/bridge');
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 실패: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSignIn}>
      <h2>로그인</h2>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <Button type="submit">로그인</Button>
      <Link to="/signup">계정이 없으신가요? 회원가입</Link>
    </Form>
  );
};

export default SignIn;
