// src/components/TokenLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase'; // Firebase가 필요하면 설정 추가
import { signInWithCustomToken } from 'firebase/auth'; // Custom Token 로그인을 위한 Firebase 메서드
import { doc, getDoc } from "firebase/firestore"; // Firestore 관련 메서드
import { db } from "../firebase";

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
  max-width: 600px;
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

const TokenLogin = () => {
  const [token, setToken] = useState(''); // 토큰 입력 필드
  const navigate = useNavigate();

  const handleTokenLogin = async (event) => {
    event.preventDefault();
    try {
      // Firebase Custom Token 디코딩
      const decodedData = JSON.parse(atob(token));
      console.log("Decode Token:", decodedData);
  
      const userRef = doc(db, "Users", decodedData.k); // decodedData.k는 디코딩된 사용자 키
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        console.log("해당 키가 존재합니다:", userSnapshot.data());
  
        // 토큰 생성 날짜 추출
        const tokenDate = new Date(decodedData.p[0]); // decodedData.p[0]은 생성 날짜
        const currentDate = new Date();
  
        // 날짜 차이 계산
        const timeDifference = currentDate - tokenDate; // 현재 날짜와 생성 날짜의 차이
        const daysDifference = timeDifference / (1000 * 3600 * 24); // 밀리초 -> 일 변환
  
        // 토큰 만료 여부 확인
        if (daysDifference > 3) {
          alert("로그인 실패: 토큰 생성 후 3일이 지나 만료되었습니다.");
          return; // 로그인 진행 중단
        }
  
        // 유효한 토큰인 경우 로그인 진행
        navigate("/resume", { state: { token } });
      } else {
        console.log("해당 키가 존재하지 않습니다.");
        alert("로그인 실패: 키가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("토큰 로그인 에러:", error);
      alert("로그인 실패, 토큰을 확인해주세요");
    }
  };

  return (
    <Form onSubmit={handleTokenLogin}>
      <h2>로그인</h2>
      <Input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="토큰을 입력해 주세요"
      />
      <Button type="submit">로그인</Button>
    </Form>
  );
};

export default TokenLogin;
