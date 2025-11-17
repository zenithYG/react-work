import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import exportToPdf from '../utils/PDFExportor';
import exportToDocx from '../utils/docxExportor';
import ExecutiveSummary from '../components/ResumeUI/ExecutiveSummary'
import EducationInfos from './ResumeUI/EducationInfos'
import LicenseInfos from './ResumeUI/LicenseInfos'
import MilitaryInfo from './ResumeUI/MilitaryInfo'
import SchoolInfos from './ResumeUI/SchoolInfos'
import WorkingExperience from './ResumeUI/WorkingExperience';
import ResearchProject from './ResumeUI/ResearchProjects';
import { updateResume, updateToken } from './UpdateData';
import { useLocation } from "react-router-dom";
import avatar from '../images/yg.jpg';

import { calculateKoreanAge } from '../utils/dateUtils';

import {
  UpdateButton, Card, Info, InfoContainer, Item, Avatar,
  MainTitle, SubTitle, Container, Divider, Section,
  CardContainer, AdminContainer
} from './ResumeStyles';



const Resume = () => {

  console.log("▶️ Resume Component Rendered");

  const contentRef = useRef();
  const location = useLocation();

  const [token, setGeneratedToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // 🔥 렌더링 시 userData 상태 로깅
  console.log("🔍 loading:", loading, "user:", user, "admin:", admin, "userData:", userData);

  /** ===========================
   *  Firebase 데이터 로딩 함수
   *  =========================== */

  const fetchUserData = async (uid, userObj) => {
    console.log("📡 fetchUserData 실행 → uid:", uid);

    try {
      const docRef = doc(db, 'Users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setLoading(false);
        return;
      }

      setUserData(docSnap.data().resume);

      // 🔥 user가 비어 있으면 강제로 주입
      if (!user) {
        setUser(userObj);
      }

    } catch (e) {
      console.error("🔥 fetchUserData ERROR:", e);
    }

    setLoading(false);
  };


  const handleUpdateData = () => {
    console.log("🟦 [handleUpdateData] 버튼 클릭됨!");
    console.log("🟦 전달되는 user:", user);

    updateResume(user, () => {
      console.log("🟩 [handleUpdateData] updateResume 콜백 실행됨!");
    });
  };

  const handleExportPdf = () => {
    if (!contentRef.current) {
      console.error("❌ PDF 변환할 DOM 요소가 없습니다!");
      return;
    }

    exportToPdf(contentRef.current, "resume.pdf");
  };

  const fetchUserDataUsingToken = async (uid) => {
    console.log(`📌 Token 기반 사용자 데이터 로딩 → uid: ${uid}`);
    try {
      const docRef = doc(db, 'Users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn("❌ Token 기반: 문서 없음");
        setLoading(false);
        return;
      }

      console.log("📄 Token 기반 DB 데이터:", docSnap.data());

      // 🔥 UserData 세팅
      setUserData(docSnap.data().resume);

      // 🔥 여기서 user도 갱신
      // Firebase Auth User 객체가 없으므로 최소 structure 직접 생성
      setUser({
        uid: uid,
        email: docSnap.data().email ?? null,
        displayName: docSnap.data().name ?? null,
        isTokenLogin: true,   // 디버깅용 flag (선택)
      });

      // admin 여부도 Token 로그인에서는 false 처리
      setAdmin(false);

    } catch (e) {
      console.error("🔥 fetchUserDataUsingToken ERROR:", e);
    }

    setLoading(false);
  };



  /** ===========================
   *  토큰 복원
   *  =========================== */
  function restoreToken(key) {
    console.log("🔐 restoreToken 실행:", key);

    try {
      const decoded = JSON.parse(atob(key));
      console.log("🔓 Token Decoded:", decoded);

      fetchUserDataUsingToken(decoded.k);
    } catch (error) {
      console.error("🔥 restoreToken 실패:", error);
      return null;
    }
  }


  /** ===========================
   *  Firebase Auth 감시
   *  =========================== */
  useEffect(() => {
    console.log("👀 useEffect → Firebase Auth 감시 시작");

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      console.log("📡 onAuthStateChanged → user:", user);

      if (user) {
        console.log("✔️ 로그인 상태");
        setUser(user);
        setAdmin(true);
        fetchUserData(user.uid);
      } else {
        console.log("❗ 로그아웃 상태");

        // Token 로그인 상황
        if (location.state?.token) {
          console.log("🔑 location.state.token 존재:", location.state.token);
          restoreToken(location.state.token);
          setAdmin(false);
        }

        setLoading(false);
      }
    });

    return () => {
      console.log("🧹 Auth Listener cleanup");
      unsubscribe();
    };
  }, []);


  /** ===========================
   *  렌더링 분기
   *  =========================== */

  if (loading) {
    console.log("⏳ 로딩 중 (loading=true)");
    return <div>Loading...</div>;
  }

  if (!userData) {
    console.log("⚠️ userData 없음 → 빈 화면");
    return <div>데이터 없음</div>; // 일단 빈 화면 방지
  }

  /** ===========================
   *  정상 렌더 화면
   *  =========================== */
  console.log("🎉 정상 렌더링 시작 (userData OK)");

  return (
    <Container style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>

      <AdminContainer>
        <UpdateButton onClick={handleUpdateData}>Update User Data</UpdateButton>
        <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
        {/* <UpdateButton onClick={handleUpdateData}>Update User Data</UpdateButton>
          
          <UpdateButton onClick={handleExportDocx}>Export docx</UpdateButton>
          <UpdateButton onClick={generateToken}>MakeToken</UpdateButton> */}
        {/* 
          {token && (
            <div>
              <p>Generated Token: {token}</p>
              <UpdateButton onClick={saveToken}>SaveToken</UpdateButton>
            </div>
          )} */}
      </AdminContainer>

      <div ref={contentRef}>
        <CardContainer>
          <Card>
            <div style={{ marginBottom: 0 }}>
              <MainTitle>{userData.title}</MainTitle>
              <MainTitle style={{ fontSize: '18px' }}>
                {userData.jobTitle}
              </MainTitle>
            </div>
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

        {/* 섹션들 로깅 추가 */}
        <Section>
          {console.log("📌 ExecutiveSummary 렌더링")}
          <ExecutiveSummary listItems={userData.executiveSummary} />
        </Section>

        <Section>
          {console.log("📌 SchoolInfos 렌더링")}
          <SchoolInfos listItems={userData.schoolInfo} />
        </Section>

        <Section>
          {console.log("📌 EducationInfos 렌더링")}
          <EducationInfos listItems={userData.educationInfo} />
        </Section>

        <Section>
          {console.log("📌 LicenseInfos 렌더링")}
          <LicenseInfos listItems={userData.licenseInfo} />
        </Section>

        <Section>
          {console.log("📌 MilitaryInfo 렌더링")}
          <MilitaryInfo item={userData.militaryInfo} />
        </Section>

        <Section>
          {console.log("📌 WorkingExperience 렌더링")}
          <WorkingExperience listItems={userData.workingExperience} />
        </Section>

        <Section>
          {console.log("📌 researchProject 렌더링")}
          {console.log(userData.researchProject.length)}
          <ResearchProject researchProject={userData.researchProject} />
        </Section>
      </div>
    </Container>
  );
};

export default Resume;
