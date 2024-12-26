import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import exportToPdf from '../utils/PDFExportor';
import exportToDocx from '../utils/docxExportor';
import ExecutiveSummary from '../components/ResumeUI/ExecutiveSummary'
import EducationInfos from './ResumeUI/EducationInfos'
import LicenseInfos from './ResumeUI/LicenseInfos'
import MilitaryInfo from './ResumeUI/MilitaryInfo'
import SchoolInfos from './ResumeUI/SchoolInfos'
import WorkingExperience from './ResumeUI/WorkingExperience';
import { updateResume, updateToken } from './UpdateData';
import { useLocation } from "react-router-dom";
import avatar from '../images/yg.jpg';

import {
  calculateKoreanAge
} from '../utils/dateUtils';

import {
  UpdateButton,
  Card,
  Info,
  InfoContainer,
  Item,
  Avatar,
  MainTitle,
  SubTitle,
  Container,
  Divider,
  Section,
  CardContainer,
  AdminContainer
} from './ResumeStyles';



const Resume = () => {

  const contentRef = useRef();
  const location = useLocation();
  const [token, setGeneratedToken] = useState(''); // 생성된 토큰을 상태로 관리
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // 토큰 생성 함수
  const generateToken = () => {

    const currentDate = new Date(); // 현재 날짜
    const expiredDate = new Date(currentDate); // 새로운 Date 객체 생성
    expiredDate.setDate(currentDate.getDate() + 3); // 3일 추가
    // 날짜를 ISO 형식으로 변환 (YYYY-MM-DD)
    const formattedExpiredDate = expiredDate.toISOString().split('T')[0];

    const data = {
      k: user.uid, // 예시 사용자 키
      p: [formattedExpiredDate], // 권한 정보에 날짜 추가
    };
    const newToken = btoa(JSON.stringify(data)).replace(/=+$/, ""); // Base64로 인코딩된 토큰
    setGeneratedToken(newToken); // 생성된 토큰을 상태에 저장
    console.log("Generated Token:", newToken);
  };


  const handleExportPdf = () => {
    const content = contentRef.current;
    exportToPdf(content, 'example.pdf');
  };

  const handleExportDocx = () => {
    const content = contentRef.current.innerText;
    exportToDocx(content, 'example.docx');
  };

  const handleUpdateData = () => {
    updateResume(user, handleUpdateDataCallback)
  }

  const handleUpdateDataCallback = () => {
    fetchUserData(user.uid)
  }

  const updateAdminState = (isAdmin) => {
    setAdmin(isAdmin);
  };

  // 클립보드 복사 함수
  const saveToken = () => {
    const decodedData = JSON.parse(atob(token));
    const expiredDate = new Date(decodedData.p[0]);
    updateToken(token, expiredDate);
  };

  function restoreToken(key) {
    try {
      const uidFromToken = JSON.parse(atob(key));
      fetchUserDataUsingToken(uidFromToken.k);
    } catch (error) {
      console.error("키 복원 실패:", error);
      return null;
    }
  }

  const fetchUserDataUsingToken = async (token) => {
    const docRef = doc(db, 'Users', token);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data().resume;
      console.log(data);
      setUserData(data);
    } else {
      console.log('No such document!');
    }
    setLoading(false);
  };

  const fetchUserData = async (uid) => {
    const docRef = doc(db, 'Users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data().resume);
    } else {
      console.log('No such document!');
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        updateAdminState(true);
        fetchUserData(user.uid);
      } else {
        if (location.state?.token) {
          restoreToken(location.state?.token);
          updateAdminState(false); 
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div></div>;
  }

  return (
    <Container style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>
      {/* 관리자 기능 표시 */}
      {admin && (
        <AdminContainer>
          <UpdateButton onClick={handleUpdateData}>Update User Data</UpdateButton>
          <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
          <UpdateButton onClick={handleExportDocx}>Export docx</UpdateButton>
          <UpdateButton onClick={generateToken}>MakeToken</UpdateButton>
          {token && (
            <div>
              <p>Generated Token: {token}</p>
              <UpdateButton onClick={saveToken}>SaveToken</UpdateButton>
            </div>
          )}
        </AdminContainer>
      )}
      {/* 사용자 정보 표시 */}
      <div ref={contentRef}>
        <CardContainer>
          <Card>
            <MainTitle>{userData.title}</MainTitle>
            <InfoContainer>
              <Info>
                <Item>
                  {userData.name} ({userData.chineseCharacter})
                </Item>
                <Item>
                  {userData.birthday} (만 {calculateKoreanAge(userData.birthday)}세)
                </Item>
                <Item>{userData.email}</Item>
                <Item>{userData.mobile}</Item>
              </Info>
              <Avatar image={avatar} />
            </InfoContainer>
          </Card>
        </CardContainer>
        <Section>
          <ExecutiveSummary listItems={userData.executiveSummary} />
        </Section>
        <Section>
          <SchoolInfos listItems={userData.schoolInfo} />
        </Section>
        <Section>
          <EducationInfos listItems={userData.educationInfo} />
        </Section>
        <Section>
          <LicenseInfos listItems={userData.licenseInfo} />
        </Section>
        <Section>
          <MilitaryInfo item={userData.militaryInfo} />
        </Section>
        <Section>
          <WorkingExperience listItems={userData.workingExperience} />
        </Section>
      </div>
    </Container>
  );
};

export default Resume;