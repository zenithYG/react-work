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
import { updateResume } from './UpdateData';

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
  CardContainer
} from './ResumeStyles';



const Resume = () => {

  const contentRef = useRef();

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

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
        fetchUserData(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <Container style={{ marginTop: '60px', overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
      <UpdateButton onClick={handleUpdateData}>Update User Data</UpdateButton>
      <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
      <UpdateButton onClick={handleExportDocx}>Export docx</UpdateButton>
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
            <Avatar />
          </InfoContainer>
        </Card>
      </CardContainer>
      <Section>
        <ExecutiveSummary listItems={userData.executiveSummary} />
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