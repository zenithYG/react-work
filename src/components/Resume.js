import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  WorkPeriod,
  createDate, 
  calculateDuration,
  calculateDurationCurrent,
  calculateTotalDuration,
  getCurrentTime,
} from '../utils/DateUtils';

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
    ListItem
} from './ResumeStyles';



const Resume = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
  
  const handleUpdate = async () => {
    if (user) {
      const userDocRef = doc(db, 'Users', user.uid);
      try {
        await updateDoc(userDocRef, {
          title: 'iOS developer',
          name: '송연근',
          mobile: '+82-10-8725-8120',
          address: '경기도 부천시 원미구 부흥로 49',
          chineseCharacter: '宋淵根',
          birthday: '1989.01.10',
          jobTitle: 'Updated Job Title', 
          disabilityStatus: '없음',
          veteransStatus: '없음',
          totalPeriod: calculateTotalDuration(
            [
              new WorkPeriod('2022-05-23T00:00:00', getCurrentTime()),
              new WorkPeriod('2020-01-02T00:00:00', '2022-05-20T00:00:00'),
              new WorkPeriod('2019-03-13T00:00:00', '2019-12-31T00:00:00'),
              new WorkPeriod('2017-08-21T00:00:00', '2019-03-15T00:00:00'),
              new WorkPeriod('2014-07-14T00:00:00', '2017-08-14T00:00:00')
            ]
          ),
          militaryInfo: { 
            discharger: '만기제대',
            startDate: createDate('2008-10-28T00:00:00'),
            endDate: createDate('2010-09-07T00:00:00'),
            positon: '보병',
            rank: '병장',
            militaryExperience: '군필',
            type: '육군'
          },
          schoolInfo: [
            {
              school: '수원대학교 / 본교',
              startDate: createDate('2007-03-02T00:00:00'),
              endDate: createDate('2014-02-12T00:00:00'),
              endType: '졸업',
              major: '정보미디어학',
              entireRating: '3.69 / 4.5',
              majorRating: '3.91 / 4.5',
              entireGrades: '133',
              majorGrades: '70'
            },
            {
              school: '중흥고등학교 / 부천',
              startDate: createDate('2004-03-02T00:00:00'),
              endDate: createDate('2007-02-14T00:00:00'),
              endType: '졸업',
              major: '',
              entireRating: '',
              majorRating: '',
              entireGrades: '',
              majorGrades: ''
            }
          ],
          workingExperience: [
            {
              company: '(주)신한은행',
              employmentType: '정규직',
              part: '디지털서비스개발부',
              majorWork: '신한은행에서 운영중인 iOS앱 개발 및 유지보수 (슈퍼쏠, 쏠뱅크, 쏠미니)',
              rank: '팀원 / 선임',
              position: 'iOS Application Developer',
              address: '서울특별시 중구 세종대로9길',
              startDate: createDate('2022-05-23T00:00:00'),
              endDate: '재직중',
              period: calculateDurationCurrent('2022-05-23T00:00:00'),
              businessInfo: '국내은행',
              employeesCount: '12,932명(2023.12 기준)',
              revenue: '35조 7,517억 9,800만 (2023.12.IFRS 연결)',
              projects: [
                
              ]
            },
            {
              company: '인크루트(주)',
              employmentType: '정규직',
              part: '휴먼클라우드본부 앱개발팀',
              majorWork: '인크루트에서 운영중인 iOS앱 개발 및 유지보수 (취업비서, 취업운세, 공채달력, 뉴워커)',
              rank: '팀원 / 없음',
              position: 'iOS Application Developer',
              address: '서울특별시 중구 중림로 49 (우)04507',
              startDate: createDate('2020-01-02T00:00:00'),
              endDate: createDate('2022-05-20T00:00:00'),
              period: calculateDuration('2020-01-02T00:00:00', '2022-05-20T00:00:00'),
              businessInfo: '데이터베이스 및 온라인정보 제공업',
              employeesCount: '227명(2024.4 기준)',
              revenue: '333억 8,132만 (2023.12.IFRS 개별)',
              projects: [
                {
                  title: '뉴워커 앱 개발',
                  siStartDate: createDate('2021-10-01T00:00:00'),
                  siEndDate: createDate('2022-04-30T00:00:00'),
                  seStartDate: createDate('2022-04-30T00:00:00'),
                  seEndDate: createDate('2022-05-22T00:00:00'),
                  siPeriod: calculateDuration('2021-10-01T00:00:00', '2022-04-30T00:00:00'),
                  sePeriod: calculateDuration('2022-04-30T00:00:00', '2022-05-22T00:00:00'),
                  subject: 'B2B 휴먼클라우드 서비스 뉴워커 iOS 앱 개발',
                  work :[
                    '기존 ‘알바콜’ 앱을 ‘뉴워커’ 앱으로 전환 프로젝트 담당',
                    '\'알바생/사장님\'파트 중 \'알바생\'파트 전반 담당',
                    'MVC 디자인 패턴 사용',
                    'SwiftLint 활용, 코드 컨벤션 관리'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, GitLab',
                  result: '앱 개발 완료, 서비스 런칭 성공'
                },
              ]
            },
            {
              company: '(주)인라이플',
              employmentType: '정규직',
              part: '서비스 사업부',
              majorWork: '광고플랫폼 기반 모바일 앱 개발 및 개선',
              rank: '팀원 / 대리',
              position: 'Android Application Developer',
              address: '서울특별시 구로구 디지털로 272 501호~504호',
              startDate: createDate('2019-03-13T00:00:00'),
              endDate: createDate('2019-12-31T00:00:00'),
              period: calculateDuration('2019-03-13T00:00:00', '2019-12-31T00:00:00'),
              businessInfo: '응용 소프트웨어 개발 및 공급업',
              employeesCount: '237명 (2023. 12 기준)',
              revenue: '503억 4,651만 (2023.12.GAAP 개별)',
              projects: [
                
              ]
            },
            {
              company: '(주)엠텔레텍',
              employmentType: '정규직',
              part: '스마트웹앱개발팀',
              majorWork: 'LGU+, 미디어로그(주) SI프로젝트 진행',
              rank: '팀원 / 대리',
              position: 'Mobile Application Developer(Android, iOS)',
              address: '서울특별시 금천구 가산디지털로1로 181, 811호(가산동, 가산W센터)',
              startDate: createDate('2017-08-21T00:00:00'),
              endDate: createDate('2019-03-15T00:00:00'),
              period: calculateDuration('2017-08-21T00:00:00', '2019-03-15T00:00:00'),
              businessInfo: '기타 정보기술 및 컴퓨터운영 관련 서비스업',
              employeesCount: '40명 ~ 70명 미만 (2019. 10 기준)',
              revenue: '50억 ~ 100억 미만 (2022.12.GAAP 개별)',
              projects: [
                
              ]
            },
            {
              company: '(주)스타십벤딩머신',
              employmentType: '정규직',
              part: 'MINT LAB',
              majorWork: '사내 이미지프로세싱 모듈을 활용한 앱 개발',
              rank: '팀원 / 연구원',
              position: 'Mobile Application Developer(Android, iOS)',
              address: '서울특별시 마포구 성암로 330 DMC첨단산업센터 B동 613호 (우)03920',
              startDate: createDate('2014-07-14T00:00:00'),
              endDate: createDate('2017-08-14T00:00:00'),
              period: calculateDuration('2014-07-14T00:00:00', '2017-08-14T00:00:00'),
              businessInfo: '응용 소프트웨어 개발 및 공급업',
              employeesCount: '50명 미만 (2017. 10 기준)',
              revenue: '10억 ~ 50억 미만 (2022.12.GAAP 개별)',
              projects: [
                
              ]
            }
          ],
          researchProject: [
            {
              title: 'NUI 기기 기반 얼굴 모션을 포함한 캐릭터 애니메이션 제작 시스템 개발',
              number: '1425090706',
              researchNumber: 'S2245576',
              organization: '스타십벤딩머신(주)',
              leadingInstitution: '중소기업기술정보진흥원',
              percent: '27%',
              startDate: createDate('2014-11-26T00:00:00'),
              endDate: createDate('2015-11-25T00:00:00'),
              period: '1년',
            },
            {
              title: 'NUI 기기를 활용한 손 애니메이션 캡쳐 시스템 개발',
              number: '1425088471',
              researchNumber: 'C0213351',
              organization: '연세대학교산학협력단',
              leadingInstitution: '한국산학연협회',
              percent: '51%',
              startDate: createDate('2014-08-01T00:00:00'),
              endDate: createDate('2015-07-31T00:00:00'),
              period: '1년',
            }
          ],
          executiveSummary: [
            '10년차 모바일 개발',
            'Swift, Objective-C, Android, Java, React-Native 언어 활용',
            'MVC, MVVM, RIBs, Clean Architecture 적용 경험',
            '코드의 안정성과 품질, 그리고 빠른 개발속도를 위한 유닛테스트, 통합테스트 작성 및 활용'
          ]
        });
        // 업데이트 후 다시 데이터를 가져와서 상태를 갱신
        fetchUserData(user.uid);
        alert('User data updated successfully!');
      } catch (error) {
        console.error('Error updating document:', error);
        alert('Failed to update user data.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <Container>
      <UpdateButton onClick={handleUpdate}>Update User Data</UpdateButton>
        <Card>
        <MainTitle>{userData.title}</MainTitle>
        <InfoContainer>
        <Info>
            <Item>{userData.email}</Item>
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