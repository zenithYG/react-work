import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import exportSeparatedPdf from '../utils/exportSeparatedPdf';
import ExecutiveSummary from '../components/ResumeUI/ExecutiveSummary'
import EducationInfos from './ResumeUI/EducationInfos'
import LicenseInfos from './ResumeUI/LicenseInfos'
import MilitaryInfo from './ResumeUI/MilitaryInfo'
import SchoolInfos from './ResumeUI/SchoolInfos'
import WorkingExperience from './ResumeUI/WorkingExperience';
import ResearchProject from './ResumeUI/ResearchProjects';
import { updateResume } from './UpdateData';
import { useLocation } from "react-router-dom";
import avatar from '../images/yg.jpg';

import { calculateKoreanAge } from '../utils/dateUtils';

import {
  UpdateButton, Card, Info, InfoContainer, Item, Avatar,
  MainTitle, Container, Section,
  CardContainer, AdminContainer
} from './ResumeStyles';

const Resume = () => {

  const contentRef = useRef();

  /** ⭐ PDF용 페이지 분리 ref */
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);

  const location = useLocation();

  const [token, setGeneratedToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  /** ======================
   *  🔥 Export PDF
   * ====================== */
  const handleExportPdf = async () => {
    await exportSeparatedPdf(page1Ref.current, "resume.pdf");
  };


  /** ======================
   * Firebase Auth
   * ====================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setAdmin(true);
        fetchUserData(u.uid);
      } else {
        if (location.state?.token) restoreToken(location.state.token);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const docSnap = await getDoc(doc(db, 'Users', uid));
      if (docSnap.exists()) setUserData(docSnap.data().resume);
    } catch (e) { }
    setLoading(false);
  };

  function restoreToken(key) {
    try {
      const decoded = JSON.parse(atob(key));
      fetchUserDataUsingToken(decoded.k);
    } catch (e) { }
  }

  const fetchUserDataUsingToken = async (uid) => {
    const docSnap = await getDoc(doc(db, 'Users', uid));
    if (docSnap.exists()) {
      setUserData(docSnap.data().resume);
      setUser({ uid, isTokenLogin: true });
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>데이터 없음</div>;


  return (
    <Container style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>

      {/* ⭐⭐ UI 그대로 유지 — 버튼 손대지 않음 ⭐⭐ */}
      <AdminContainer>
        <UpdateButton onClick={() => updateResume(user, () => { })}>Update User Data</UpdateButton>
        <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
      </AdminContainer>

      {/* ⭐ 기존 UI (절대 수정 ❌) ⭐ */}
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
                <Item>{userData.name} ({userData.chineseCharacter})</Item>
                <Item>{userData.birthday} (만 {calculateKoreanAge(userData.birthday)}세)</Item>
                <Item>{userData.email}</Item>
                <Item>{userData.mobile}</Item>
              </Info>

              <Avatar image={avatar} />
            </InfoContainer>

          </Card>
        </CardContainer>

        <Section><ExecutiveSummary listItems={userData.executiveSummary} /></Section>
        <Section><SchoolInfos listItems={userData.schoolInfo} /></Section>
        <Section><EducationInfos listItems={userData.educationInfo} /></Section>
        <Section><LicenseInfos listItems={userData.licenseInfo} /></Section>
        <Section><MilitaryInfo item={userData.militaryInfo} /></Section>

        <Section><WorkingExperience listItems={userData.workingExperience} /></Section>

        <Section>
          <ResearchProject researchProject={userData.researchProject} />
        </Section>

      </div>



      {/* ⭐⭐⭐ PDF 전용 DOM (UI에 절대 영향 없음) ⭐⭐⭐ */}
      <div
        style={{
          position: "fixed",       // 화면 밖 고정 (absolute ❌)
          top: 0,
          left: 0,
          width: "100%",
          opacity: 0,              // 숨기되 DOM 크기는 유지 (visibility:hidden ❌)
          pointerEvents: "none",
          zIndex: -1               // 화면 클릭 방지 + 맨 뒤로
        }}
      >

        {/* 📄 PAGE 1 */}
        <div ref={page1Ref}>
          <CardContainer>
            <Card>
              <div>
                <MainTitle>{userData.title}</MainTitle>
                <MainTitle style={{ fontSize: '18px' }}>{userData.jobTitle}</MainTitle>
              </div>
              <InfoContainer>
                <Info>
                  <Item>{userData.name} ({userData.chineseCharacter})</Item>
                  <Item>{userData.birthday} (만 {calculateKoreanAge(userData.birthday)}세)</Item>
                  <Item>{userData.email}</Item>
                  <Item>{userData.mobile}</Item>
                </Info>
                <Avatar image={avatar} />
              </InfoContainer>
            </Card>
          </CardContainer>

          <Section><ExecutiveSummary listItems={userData.executiveSummary} /></Section>
          <Section><SchoolInfos listItems={userData.schoolInfo} /></Section>
          <Section><EducationInfos listItems={userData.educationInfo} /></Section>
          <Section><LicenseInfos listItems={userData.licenseInfo} /></Section>
          <Section><MilitaryInfo item={userData.militaryInfo} /></Section>


          <Section><WorkingExperience listItems={userData.workingExperience} /></Section>
          <Section><ResearchProject researchProject={userData.researchProject} /></Section>
        </div>
      </div>

    </Container>
  );
};

export default Resume;
