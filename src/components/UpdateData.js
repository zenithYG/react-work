import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { 
    WorkPeriod,
    createDate, 
    calculateDuration,
    calculateDurationCurrent,
    calculateTotalDuration,
    getCurrentTime
  } from '../utils/dateUtils';

  export const handleUpdate = async (user, callback) => {
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
            position: '통신병',
            rank: '병장',
            militaryExperience: '군필',
            type: '육군'
          },
          schoolInfo: [
            {
              type: '대학교',
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
              type: '고등학교',
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
                {
                  title: '신한 슈퍼 SOL iOS 앱 고도화(선도개발)',
                  siStartDate: createDate('2024-02-29'),
                  siEndDate: createDate('2024-06-30'),
                  siPeriod: calculateDuration('2024-02-29', '2024-06-30'),
                  subject: '\'신한 슈퍼 SOL\' 서비스 \'신한SOL뱅크\' 앱 기반으로 개선 7월에 진행될 슈퍼 SOL 전면개편 프로젝트의 기반으로 사용될 선도개발 프로젝트 진행',
                  work :[
                    '기존에 유지보수 중이던 \'신한SOL뱅크\' fork 및 개발 진행에 필요한 환경 설정',
                    '변경된 프로젝트 bundle id 에 맞는 Third-party 라이브러리 수정',
                    '신한 슈퍼 SOL 기동, 메인, 홈 로직 및 UI 개선'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: [ '프로젝트 완료 (선도 개발 완료된 버전 그룹장 시연)' ]
                },
                {
                  title: '신한 쏠뱅크 앱 개발',
                  siStartDate: createDate('2022-05-23'),
                  siEndDate: createDate('2023-12-06'),
                  seStartDate: createDate('2023-12-06'),
                  seEndDate: '진행중',
                  siPeriod: calculateDuration('2022-05-23', '2023-12-06'),
                  sePeriod: calculateDurationCurrent('2023-12-06'),
                  subject: '하이브리드 앱으로 구현되어있는 SOL 앱 Native 앱으로 전면 개편',
                  work :[
                    '신한 SOL뱅크 전면 개편 개발 (전체메뉴, 상품, 혜택, 머니버스(마이데이터 서비스), 쏠패스(QR인증), STAX 담당)',
                    'RIBs 아키텍처, Clean 아키텍처를 활용한 Native 앱 개발',
                    'Concurrency, Combine를 활용한 비동기 프로그래밍 개발',
                    'DiffableDataSource를 활용한 Collection, Table개발',
                    'Flex, Pin 을 이용한 Code 기반 UI 개발',
                    '프로토콜지향 프로그래밍(POP) 전면 활용', 
                    'Tuist 를 활용한 Xcode 프로젝트 유지관리'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: [ '프로젝트 완료 MAU(월간활성사용자수) 52만 유지중 ( Android 유저는 제외 )' ] 
                },
                {
                  title: '신한 쏠미니 앱 개발',
                  siStartDate: createDate('2023-04-19'),
                  siEndDate: createDate('2024-02-28'),
                  seStartDate: createDate('2024-02-28'),
                  seEndDate: '진행중',
                  siPeriod: calculateDuration('2023-04-19', '2024-02-28'),
                  sePeriod: calculateDurationCurrent('2024-02-28'),
                  subject: 'B2B 휴먼클라우드 서비스 뉴워커 iOS 앱 개발',
                  work :[
                    '기존 ‘알바콜’ 앱을 ‘뉴워커’ 앱으로 전환 프로젝트 담당',
                    '\'알바생/사장님\'파트 중 \'알바생\'파트 전반 담당',
                    'MVC 디자인 패턴 사용',
                    'SwiftLint 활용, 코드 컨벤션 관리',
                    'Feature단위 모듈화 개발'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: [
                    'SOL앱이 지원하지 못하는 유저를 위한 저사양 폰 유저 대응용 앱 개발 (SOL 앱과 병행으로 개발 및 유지보수 되면서 고사양, 저사양 유저 모두 은행 서비스 이용에 문제가 없도록 관리)',
                    '- MAU(월간활성사용자수) 5천 유지중 ( Android 유저는 제외 )'
                  ]
                },
              ]
            },
            {
              company: '인크루트(주)',
              employmentType: '정규직',
              part: '휴먼클라우드본부 앱개발팀',
              majorWork: '인크루트에서 운영중인 iOS앱 개발 및 유지보수 (취업비서, 취업운세, 알바콜, 뉴워커)',
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
                  result: [ '앱 개발 완료, 서비스 런칭 성공' ]
                },
                {
                  title: '알바콜 앱 개선',
                  seStartDate: createDate('2020-01-02'),
                  seEndDate: createDate('2021-04-30'),
                  sePeriod: calculateDuration('2020-01-02', '2021-04-30'),
                  subject: '인크루트알바콜에서 제공하는 iOS 앱 알바콜 유지보수 및 기능개선',
                  work :[
                    '4.5.0 ~ 4.7.0 버전 버그 대응 및 업데이트',
                    'MVC 디자인 패턴 사용',
                    'DynamicLink 사용한 딥 링크 추가',
                    'SNS 로그인 (구글플러스, 페이스북, 네이버, 카카오, 트위터, 페이코) 기능 개선',
                    'iOS13 버전 대응 UI 개선 및 버그 수정',
                    'Firebase 실시간 DB 활용, 채팅 면접, 영상 면접 기능 추가',
                    'AI챗봇 기능 개발',
                    '변경된 ATT정책 대응'
                  ],
                  workPercent: '30%',
                  technology: 'Swift4, GitLab',
                  result: [ '앱 기능 및 속도 개선, 기능 및 코드 관리에 필요한 문서화 완료' ]
                },
                {
                  title: '인크루트 - 취업 비서 앱 개선',
                  seStartDate: createDate('2020-01-02'),
                  seEndDate: createDate('2022-05-22'),
                  sePeriod: calculateDuration('2020-01-02', '2022-05-22'),
                  subject: '구인, 구직 서비스 앱 \'인크루트-취업비서\' 유지 보수, 기능 개선',
                  work :[
                    '3.4.2 ~ 3.7.0 버전 버그 대응 및 업데이트',
                    'MVC 디자인 패턴 사용',
                    '기존에 이메일 중복 가입 여부에 따른 별도의 화면들을 공통 사용 로그인 부분 모듈화하여 통합 Private Pod 라이브러리로 관리',
                    'Firebase Crashlytics 체크 버그 수정 및 문제점 개선',
                    '하이브리드 앱 기능 추가 및 관리',
                    '휴대폰 본인인증 기능 추가',
                    'WHOIS OpenAPI사용 , 해외 유저 IP를 통해 구분하여  UI 수정',
                    '애플 로그인 기능 추가',
                    '통계용 라이브러리 AirBridge 추가',
                    '변경된 ATT정책 대응',
                  ],
                  workPercent: '70%',
                  technology: 'Objective-C, GitLab',
                  result: [ '앱 기능 및 속도 개선, 기능 및 코드 관리 편의성 개선' ]
                },
                {
                  title: '인크루트 - 취업운세 앱 개발 및 개선',
                  seStartDate: createDate('2020-01-02'),
                  seEndDate: createDate('2022-05-22'),
                  sePeriod: calculateDuration('2020-01-02', '2022-05-22'),
                  subject: '운세별 맟춤 구직 정보 제공 앱 \'인크루트-취업운세\' 앱을 유지 보수, 기능 개선',
                  work :[
                    '2.2.8 ~ 2.4.0 버전 버그 대응 및 업데이트',
                    'MVC 디자인 패턴 사용',
                    '기존에 이메일 중복 가입 여부에 따른 별도의 화면들을 공통 사용 로그인 부분 모듈화하여 통합 Private Pod 라이브러리로 관리',
                    'Firebase Crashlytics 체크 버그 수정 및 문제점 개선'
                  ],
                  workPercent: '70%',
                  technology: 'Objective-C, GitLab',
                  result: [ '앱 기능 및 속도 개선, 기능 및 코드 관리 편의성 개선' ]
                },
              ]
            },
            {
              company: '(주)인라이플',
              employmentType: '정규직',
              part: '서비스사업부',
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
                {
                  title: '스타일 터치 앱 개발',
                  siStartDate: createDate('2019-04-01'),
                  siEndDate: createDate('2019-12-31'),
                  siPeriod: calculateDuration('2019-04-01', '2019-12-31'),
                  subject: '쇼핑몰을 파싱하여 이미지 추출, 그 이미지를 잠금 화면에 띄워 구매 유도 및 홍보할 수 있는 앱을 개발',
                  work :[
                    'MVVM 디자인 패턴을 활용',
                    'Foreground Service를 이용한 락스크린화면 구현',
                    'Realm DB를 이용한 앱 내 데이터 관리',
                    'Retrofit2를 이용한 서버 통신',
                    '웹뷰 리다이렉팅 광고 기술 접목',
                    'SNS로그인(네이버, 카카오, 구글, 페이스북)',
                    'FCM 이용한 Push 알림 기능 개발',
                    '다이나믹 링크를 이용한 딥 링크 기능개발'
                  ],
                  workPercent: '100%',
                  technology: 'Android(JAVA), GitLab',
                  result: [ '앱 개발 완료' ]
                }
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
                {
                  title: 'LG U+ 스마트상담 (소호)',
                  siStartDate: createDate('2018-11-13'),
                  siEndDate: createDate('2019-01-25'),
                  siPeriod: calculateDuration('2018-11-1', '2019-01-25'),
                  subject: 'LG U+에서 운영 중인 스마트상담 모바일 앱 (소규모 기업용) 기능 추가 프로젝트',
                  work :[
                    'Android 8.0버전에 호환되지 않는 보완 및 버그 수정',
                    '날씨, 미세먼지 정보 조회관련 공공데이터포털(DATA.GO.KR) API사용',
                    '보안 솔루션(자이로이드) 적용',
                    'Android 버전 소스 난독화'
                  ],
                  workPercent: '100%',
                  technology: 'Android(JAVA), iOS(Objective-C)',
                  result: [ '짧은 기간 내 Android , iOS앱 개발 테스트 및 상용화' ]
                },
                {
                  title: 'LG U+ 그룹웨어 iOS 메신저 개발',
                  siStartDate: createDate('2018-06-01'),
                  siEndDate: createDate('2018-10-30'),
                  siPeriod: calculateDuration('2018-06-01', '2018-10-30'),
                  subject: '미디어로그에서 운영중인 LG U+그룹웨어 서비스 중 iOS앱 메신저 기능 개발',
                  work :[
                    'XML에 기반인 통신 프로토콜 XMPP를 이용하여 iOS메신저 기능 개발',
                    'Realm DB를 이용한 데이터 관리',
                    '사내 조직도 부분 Tree구조 UI 구현',
                    '보안 솔루션 (자이로이드) 적용'
                  ],
                  workPercent: '100%',
                  technology: 'Swift4, XMPP, RealmDB',
                  result: [ '기간 내 iOS 메신저 앱 상용서비스 개발 완료 및 상용화' ]
                },
                {
                  title: 'LG U+ 스마트 가입 앱 기능개선',
                  siStartDate: createDate('2018-05-01'),
                  siEndDate: createDate('2018-05-30'),
                  siPeriod: calculateDuration('2018-05-01', '2018-05-30'),
                  subject: '기존 운영되고 있는 하이브리드앱 ‘스마트 가입’ 기능 수정',
                  work :[
                    '웹 기반 앱을 Websquare 기반 앱으로 통합 개발',
                    'Native에서 호출하던 기능들을 모듈화',
                    '서식 관련 외부 솔루션 (OZ e-Form) 문제확인, 최신버전 업데이트',
                    '버그 수정 및 코드 리펙토링'
                  ],
                  workPercent: '100%',
                  technology: 'Android, Websquare (Cordova)',
                  result: [ 'Websquare 개발 부분 테스트 케이스를 모두 만듬. 유지 보수 관리 할 수 있도록 모듈화 작업 완료 및 기간 내 인수인계' ]
                },
                {
                  title: 'LG U+ 스마트 상담 앱 개발',
                  siStartDate: createDate('2018-01-02'),
                  siEndDate: createDate('2018-05-01'),
                  siPeriod: calculateDuration('2018-01-02', '2018-05-01'),
                  subject: '휴대폰을 구매하기 전 고객과 상담하면서 핸드폰을 구매할 때 요금 측정 및 혜택을 미리 산출할 수 있는 Websquare 기반 하이브리드 앱개발',
                  work :[
                    'Websquare 기반 앱 개발',
                    'OZ-eform 라이브러리를 활용, 상담 결과값을 문서화하여 바로 프린트하는 기능 추가',
                    '상담 결과값 이미지 변환 및 공유 기능 추가',
                    'App Group을 활용한 타앱 자동로그인 기능 추가(상담 결과값 데이터를 스마트 개통 앱으로 전달하여 바로 개통서비스를 이용할 수 있도록 연동)',
                    '위치 기반 날씨 정보 조회 개발',
                    '일반 계산기, 만 나이 계산기, 띠 계산기 개발'
                  ],
                  workPercent: '100%',
                  technology: 'Android, Websquare (Cordova)',
                  result: [ '기간 내 개발 및 상용화' ]
                },
                {
                  title: 'LG U+고객센터 앱 – 위젯, APNs 구현',
                  siStartDate: createDate('2017-08-21'),
                  siEndDate: createDate('2017-12-14'),
                  siPeriod: calculateDuration('2017-08-21', '2017-12-14'),
                  subject: '하이브리드 앱 으로 구현되어 있는 LG U+고객센터 iOS앱의 위젯과 Push알림 기능을 구현',
                  work :[
                    'Git 형상관리화',
                    'weather extension을 이용한 위젯 기능 추가',
                    'Push Notification (알림) 기능 추가',
                    'Push서비스 담당 협력사의 API 연동',
                    '해킹방지 용 보안 소스 추가'
                  ],
                  workPercent: '100%',
                  technology: 'Objective-C',
                  result: [ '기간 내 개발 완료 및 배포' ]
                }
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
                {
                  title: 'PUFF 앱 개발',
                  siStartDate: createDate('2017-02-05'),
                  siEndDate: createDate('2017-08-14'),
                  siPeriod: calculateDuration('2017-02-05', '2017-08-14'),
                  subject: '실시간 모바일 방송 플랫폼 앱 개발',
                  work :[
                    'React-Native 기반 Android, iOS 앱 개발',
                    'C++로 되어있는 사내 라이브러리를 적용하여 얼굴 인식, 필터 기능 구현',
                    'WebSocket을 이용한 게임 인터랙션 기능 구현',
                    'Wowza 기반 Streaming서비스 구현',
                    'Firebase Realtime DB 를 이용한 채팅 서비스 구현',
                    '모바일 기기용 영상합성앱 기술 적용'
                  ],
                  workPercent: '50%',
                  technology: 'React-Native(Android, iOS), Wowza, Firebase Realtime DB, Github',
                  result: [ 'ES6 활용, React-Native의 장단점을 이해하고 활용하는 데 도움됨' ]
                },
                {
                  title: 'OMG (Oh My Gif) 앱 개발',
                  siStartDate: createDate('2016-05-23'),
                  siEndDate: createDate('2016-11-14'),
                  siPeriod: calculateDuration('2016-05-23', '2016-11-14'),
                  subject: 'Gif 에디터 앱 개발',
                  work :[
                    'Swift 기반 iOS 앱 개발',
                    'YYKit 라이브러리 활용 Gif 디코딩 및 인코딩',
                    'Gif를 편집할수 있는 타임라인 UI 개발',
                    'Giphy 에서 제공해주는 Open API 데이터 활용',
                    'Alamofire를 이용한 네트워크 모듈 개발',
                    '사진 및 영상을 이용하여 Gif를 생성',
                    'SNS 공유기능 개발',
                    'UndoManager를 활용, 편집 기록 Redo, Undo 기능 구현',
                    'In App Purchases 를 이용한 앱내 아이템 구매 기능 개발'
                  ],
                  workPercent: '100%',
                  technology: 'Swfit2.0, Github',
                  result: [ 'iOS 앱, 개발부터 배포까지 전담하여 개발 할 수 있었던 경험' ]
                },
                {
                  title: 'Boodl 앱 개발',
                  siStartDate: createDate('2015-11-04T00:00:00'),
                  siEndDate: createDate('2016-09-08T00:00:00'),
                  siPeriod: calculateDuration('2015-11-04', '2016-09-08'),
                  subject: '자신만의 이미지 및 애니메이션 이모티콘 생성 앱 개발',
                  work :[
                    '클린아키텍쳐 구조를 갖고 MVP 패턴이 적용',
                    'C++로 되어있는 폰트 렌더링 관련 Native 소스를 안드로이드에 적용',
                    '이미지 애니메이션 기능 적용 ',
                    '사진에 편집, 필터 기능 적용'
                  ],
                  workPercent: '30%',
                  technology: 'Android, Github',
                  result: [ '앱 개발 완료, 10만 사용자 수와 초기 새로운 영화 홍보에 계약을 맺는 등 긍정적인 성과' ]
                },
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
            '10년차 모바일 개발자',
            'Swift, Objective-C, Android, Java, React-Native 언어 활용',
            'MVC, MVVM, RIBs, Clean Architecture 적용 경험',
            '코드의 안정성과 품질, 그리고 빠른 개발속도를 위한 유닛테스트, 통합테스트 작성 및 활용'
          ],
          educationInfo: [
            {
              title: '정보보안전문가 인포섹(주) 채용연계 과정',
              organization: '한국정보기술연구원',
              contents: '정보보호 시스템 운영, 침해사고 대응, 시스템 구축방법론, 시스템 진단, 웹 취약점 진단, 컨설팅',
              period: '2014.02.24 - 2014.06.05(560 h)'
            },
            {
              title: '자바기반 스마트 웹 & 앱 콘텐츠 개발자',
              organization: '한국정보과학진흥협회',
              contents: 'JAVA, JSP, Oracle SQL, Sping, Android, HTML5',
              period: '2013.06.24 - 2013.08.22(320 h)'
            }
          ],
          licenseInfo: [
            {
              name: '정보처리기사',
              licenseNumber: '132020504590',
              organization: '한국산업인력공단',
              date: '2013.08.16'
            }
          ]
        });
        
        callback();
        alert('User data updated successfully!');
      } catch (error) {
        console.error('Error updating document:', error);
        alert('Failed to update user data.');
      }
    }
  };