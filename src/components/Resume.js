import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import {
    Card,
    Info,
    InfoContainer,
    Item,
    Avatar,
    MainTitle,
    SubTitle,
    Container,
    Divider,
    ListItem
} from './ResumeStyles';


const Resume = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      const docRef = doc(db, 'Users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
    <Container>
        <Card>
        <MainTitle>iOS Developer</MainTitle>
        <InfoContainer>
        <Info>
            <Item>someone@email.com</Item>
            <Item>mobile: +852 xxxxxxxxx</Item>
            <Item>Nationality: Chinese</Item>
        </Info>
        <Avatar />
        </InfoContainer>
    </Card>
      <section>
        <SubTitle>Executive Summary</SubTitle>
        <Divider />
        <ul>
          <ListItem>10 years project/team management experience</ListItem>
          <ListItem>PMP, OCP, AWS Certification</ListItem>
          <ListItem>Hand-on experience in oracle database</ListItem>
          <ListItem>Proficient in JavaScript, Java, Powerbuilder</ListItem>
        </ul>
      </section>
      
      <section>
        <SubTitle>Working Experience</SubTitle>
        <Divider />
        <div>
          <h3>Current Company (Project Manager, 2015/08 - present)</h3>
          <ul>
            <li>Lead team of 10 to oversee conception, requirement gathering, documentation and rollout.</li>
            <li>Conduct troubleshooting, analysis and support. Gather user feedback, document bugs and change requests.</li>
          </ul>
        </div>

        <div>
          <h3>Second Company (System Analyst, 2011/06 - 2015/07)</h3>
          <ul>
            <li>Led team of 5 for application development</li>
            <li>Coordinated with developers, support staff and vendors across Hong Kong, China, Taiwan</li>
          </ul>
        </div>

        <div>
          <h3>My first Company (Analyst Programmer, 2005/01 - 2011/05)</h3>
          <ul>
            <li>Develop multiple applications using Javascript, Java, PHP, Powerbuilder, Oracle</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        <ul>
          <li><a href="https://github.com/casualwriter/casual-markdown">Casual-Markdown</a> - a lightweight markdown parser</li>
          <li><a href="https://github.com/casualwriter/powerpage">Powerpage</a> - a lightweight browser for html applications</li>
        </ul>
      </section>

      <section>
        <h2>Education & Qualifications</h2>
        <ul>
          <li>AWS Certification (2021/12)</li>
          <li>Oracle Certified Professional (2020/02)</li>
          <li>Project Management Professional (PMP) (2018/10)</li>
          <li>Bachelor of Computer Science (Sep 2004)</li>
          <li>The Chinese University of Hong Kong (2000 - 2004)</li>
        </ul>
      </section>

      <section>
        <h2>Misc. Information</h2>
        <ul>
          <li>Languages: English (good), Cantonese (fluent/native), Mandarin (good)</li>
          <li>Availability: 1 month's notice</li>
        </ul>
      </section>
    </Container>
  );
};

export default Resume;