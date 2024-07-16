import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입 성공!');
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
      <h2>회원가입</h2>
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
      <Button type="submit">회원가입</Button>
      <Link to="/signin">이미 계정이 있으신가요? 로그인</Link>
    </Form>
  );
};

export default SignUp;
