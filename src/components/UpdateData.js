import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import {
  WorkPeriod,
  createDate,
  calculateDuration,
  calculateDurationCurrent,
  calculateTotalDuration,
  getCurrentTime,
  calculateYearOnly
} from '../utils/dateUtils';

export const updateToken = async (token, expiredDate) => {
  if (token) {
    try {
      const tokenRef = doc(db, "Tokens", token);

      // 문서가 존재하는지 확인
      const tokenSnapshot = await getDoc(tokenRef);

      if (tokenSnapshot.exists()) {
        // 문서가 존재하면 업데이트
        await updateDoc(tokenRef, {
          expiredDate: expiredDate,
        });
        toast.success("토큰 업데이트가 완료되었습니다!");
      } else {
        // 문서가 존재하지 않으면 새로 생성
        await setDoc(tokenRef, {
          expiredDate: expiredDate,
        });
        toast.success("새 토큰이 생성되었습니다!");
      }
    } catch (error) {
      // 오류 처리
      toast.error("토큰 업로드 중 오류가 발생했습니다.");
      console.error("Error updating token:", error);
    }
  } else {
    toast.error("토큰이 없습니다. 업로드 실패!");
  }
};

export const updateTeam = async (user, team, callback) => {
  if (user) {
    const userDocRef = doc(db, 'Users', user.uid);
    try {
      await updateDoc(userDocRef, {
        team: team
      })
      console.log('Data successfully written to Firestore');
      callback();
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }
};

export const updateResume = async (user, callback) => {
  if (user) {
    const userDocRef = doc(db, 'Users', user.uid);
    try {
      await updateDoc(userDocRef, {
        resume: {
          admin: true,
          title: 'Application\nDeveloper(Android, iOS)',
          name: '송연근',
          mobile: '+82-10-8725-8120',
          address: '경기도 부천시 원미구 부흥로 49',
          chineseCharacter: '宋淵根',
          birthday: '1989.01.10',
          jobTitle: '현대오토에버 완성차 앱 개발/운영 지원',
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
              employmentType: '전문계약직',
              part: '디지털서비스개발부',
              majorWork: '신한은행에서 운영중인 iOS앱 개발 및 유지보수 (슈퍼쏠, 쏠뱅크, 쏠미니)',
              rank: '팀원 / 프로',
              position: 'iOS DeX',
              address: '서울특별시 중구 세종대로9길',
              startDate: createDate('2022-05-23T00:00:00'),
              endDate: '재직중',
              period: calculateDurationCurrent('2022-05-23T00:00:00'),
              businessInfo: '국내은행',
              employeesCount: '12,932명(2023.12 기준)',
              revenue: '35조 7,517억 9,800만 (2023.12.IFRS 연결)',
              projects: [
                {
                  title: '슈퍼SOL 개발',
                  totalDate: calculateDurationCurrent('2025-02-01'),
                  siStartDate: createDate('2025-02-01'),
                  siPeriod: '진행중',
                  subject: '기존 ‘신한은행’ 앱 기반으로 그룹사 통합 앱 ‘슈퍼SOL’ 개발',
                  work: [
                    '앱 기동, 라우팅, 공통 영역 개발 담당',
                    '기존 내부 저장소(Keychain / UserDefaults / CoreData 등) 사용 로직을 점검하고 불필요한 동기화, 중복 접근 제거',
                    '안정적인 마이그레이션 로직 개발',
                    '앱 최초 실행 및 로그인 이후 화면 진입 시 소요 시간 측정 및 개선',
                    '주요 API 응답 데이터 분석(Log) 및 Lazy Load 구조 도입',
                    '카드, 증권, 보험 그룹사의 라우팅 화면 구조 정리 및 관리 체계 개발',
                    'Jira를 이용한 이슈, 브랜치, WBS 관리',
                    'Confluence를 이용한 기술문서화, 지식자산화'
                  ],
                  workPercent: '33.3%',
                  technology: 'Swift5, Bitbucket, Jira, Confluence',
                  result: ['개발 진행 중']
                },
                {
                  title: '신한 SOL뱅크, SOL mini 운영',
                  totalDate: calculateDurationCurrent('2023-12-06'),
                  seStartDate: createDate('2023-12-06'),
                  seEndDate: '진행중',
                  sePeriod: calculateDurationCurrent('2023-12-06'),
                  subject: '신한은행 대표 모바일 서비스 ‘신한은행’(구 SOL뱅크), SOL mini 운영',
                  work: [
                    'Firebase Crashlytics를 이용한 크래시 리포트 분석 및 원인 대응',
                    'Firebase Performance 를 활용한 서비스 이상 감지',
                    '고객 민원 및 오류 신고 시 Splunk MINT 로그 분석을 통한 원인 파악 및 조치',
                    '신규 버전 App Store 심사 제출 및 리젝 대응',
                    '운영 배포(Hotfix 포함) 및 버전 관리',
                    '백엔드 API 변경사항 및 신규 API 적용 대응',
                    'iOS 신규 릴리스 시 앱 기능/화면 테스트 및 대응 계획 수립',
                    'QA 및 스테이징 환경 테스트 지원',
                    '신규 OS, 기술 대응을 위한 조직운영',
                    '앱스토어 리뷰 모니터링 및 사용자 피드백 분석'
                  ],
                  workPercent: '8.3%(iOS 개발 팀원 12명)',
                  technology: 'Swift5, Bitbucket, Jira, Confluence',
                  result: ['장애 대응 및 고객 민원 반영하여 정상적인 앱 서비스 제공']
                },
                {
                  title: '신한 슈퍼 SOL iOS 앱 고도화(선도개발)',
                  totalDate: calculateDuration('2024-02-29', '2024-06-30'),
                  siStartDate: createDate('2024-02-29'),
                  siEndDate: createDate('2024-06-30'),
                  siPeriod: calculateDuration('2024-02-29', '2024-06-30'),
                  subject: '\'신한 슈퍼 SOL\' 서비스 \'신한SOL뱅크\' 앱 기반으로 개선 7월에 진행될 슈퍼 SOL 전면개편 프로젝트의 기반으로 사용될 선도개발 프로젝트 진행',
                  work: [
                    '기존에 유지보수 중이던 \'신한SOL뱅크\' fork 및 개발 진행에 필요한 환경 설정',
                    '변경된 프로젝트 bundle id 에 맞는 Third-party 라이브러리 수정',
                    '신한 슈퍼 SOL 기동, 메인, 홈 로직 및 UI 개선'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: ['프로젝트 완료 (선도 개발 완료된 버전 그룹장 시연)', '신한 SOL뱅크를 슈퍼SOL로 대체 개발 진행 가능성 확인']
                },
                {
                  title: '신한 쏠미니 앱 개발',
                  totalDate: calculateDurationCurrent('2023-04-19'),
                  siStartDate: createDate('2023-04-19'),
                  siEndDate: createDate('2024-02-28'),
                  siPeriod: calculateDuration('2023-04-19', '2024-02-28'),
                  subject: 'B2B 휴먼클라우드 서비스 뉴워커 iOS 앱 개발',
                  work: [
                    '신한 SOL mini 신규 개발 (이체, Third-Party 라이브러리 담당)',
                    'MVVM 아키텍처, Clean 아키텍처를 활용한 Full Native 앱 개발',
                    'RxSwift을 활용한 Reactive 구조 활용',
                    'SnapKit 을 이용한 CodeBase UI 개발',
                    '프로토콜지향 프로그래밍(POP) 전면 활용',
                    'Tuist 를 활용한 Xcode 프로젝트 유지관리',
                    'SwiftLint 활용, 코드 컨벤션 관리',
                    'Feature단위 모듈화된 개발'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: [
                    'SOL앱이 지원하지 못하는 유저를 위한 저사양 폰 유저 대응용 앱 개발 (SOL 앱과 병행으로 개발 및 유지보수 되면서 고사양, 저사양 유저 모두 은행 서비스 이용에 문제가 없도록 관리)',
                    '- MAU(월간활성사용자수) 5천 유지중 ( Android 유저는 제외 )'
                  ]
                },
                {
                  title: '신한 SOL 전면 개편',
                  totalDate: calculateDuration('2022-05-23', '2023-12-06'),
                  siStartDate: createDate('2022-05-23'),
                  siEndDate: createDate('2023-12-06'),
                  siPeriod: calculateDuration('2022-05-23', '2023-12-06'),
                  subject: '하이브리드 앱으로 구현되어있는 SOL 앱 Native 앱으로 전면 개편',
                  work: [
                    '신한 SOL뱅크 전면 개편 개발 (전체메뉴, 상품, 혜택, 머니버스(마이데이터 서비스), 쏠패스(QR인증), 세금 납부 기능(STAX) 담당)',
                    'RIBs 아키텍처, Clean 아키텍처를 활용한 Native 앱 개발',
                    'Concurrency, Combine를 조합 활용한 비동기 프로그래밍 개발',
                    'DiffableDataSource를 활용한 Collection, Table개발',
                    'Flex, Pin 을 이용한 CodeBase UI 개발',
                    '프로토콜지향 프로그래밍(POP) 전면 활용',
                    'Tuist 를 활용한 Xcode 프로젝트 유지관리',
                    '비즈니스로직 계층별 모듈화된 개발'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, Bitbucket, Jira',
                  result: ['프로젝트 완료 MAU(월간활성사용자수) 52만 유지중 ( Android 유저는 제외 )']
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
                  totalDate: calculateDuration('2021-10-01T00:00:00', '2022-05-22T00:00:00'),
                  siStartDate: createDate('2021-10-01T00:00:00'),
                  siEndDate: createDate('2022-04-30T00:00:00'),
                  seStartDate: createDate('2022-04-30T00:00:00'),
                  seEndDate: createDate('2022-05-22T00:00:00'),
                  siPeriod: calculateDuration('2021-10-01T00:00:00', '2022-04-30T00:00:00'),
                  sePeriod: calculateDuration('2022-04-30T00:00:00', '2022-05-22T00:00:00'),
                  subject: 'B2B 휴먼클라우드 서비스 뉴워커 iOS 앱 개발',
                  work: [
                    '기존 ‘알바콜’ 앱을 ‘뉴워커’ 앱으로 전환 프로젝트 담당',
                    '\'알바생/사장님\'파트 중 \'알바생\'파트 전반 담당',
                    'MVC 디자인 패턴 사용',
                    'Firebase RealTime DB를 활용한 메신저 기능 개발',
                    'SwiftLint 활용, 코드 컨벤션 관리'
                  ],
                  workPercent: '50%',
                  technology: 'Swift5, GitLab',
                  result: ['앱 개발 완료, 서비스 런칭 성공']
                },
                {
                  title: '알바콜 앱 개선',
                  totalDate: calculateDuration('2020-01-02', '2021-04-30'),
                  siStartDate: createDate('2020-01-02'),
                  siEndDate: createDate('2021-04-30'),
                  siPeriod: calculateDuration('2020-01-02', '2021-04-30'),
                  subject: '인크루트알바콜에서 제공하는 iOS 앱 알바콜 유지보수 및 기능개선',
                  work: [
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
                  result: ['앱 기능 및 속도 개선, 기능 및 코드 관리에 필요한 문서화 완료']
                },
                {
                  title: '인크루트 - 취업 비서 앱 개선',
                  totalDate: calculateDuration('2020-01-02', '2022-05-22'),
                  siStartDate: createDate('2020-01-02'),
                  siEndDate: createDate('2022-05-22'),
                  siPeriod: calculateDuration('2020-01-02', '2022-05-22'),
                  subject: '구인, 구직 서비스 앱 \'인크루트-취업비서\' 유지 보수, 기능 개선',
                  work: [
                    '3.4.2 ~ 3.7.0 버전 버그 대응 및 업데이트',
                    'MVC 디자인 패턴 사용',
                    '공통 사용된 로그인 부분 모듈화하여 통합 Private Pod 라이브러리로 관리',
                    'Firebase Crashlytics 체크 버그 수정 및 문제점 개선',
                    '하이브리드 앱 기능 추가 및 관리',
                    '휴대폰 본인인증 기능 추가',
                    'WHOIS OpenAPI사용 , 해외 유저 IP를 통해 구분하여  UI 수정',
                    'SNS 로그인 기능 추가, 개선(네이버, 카카오, 구글, 페이스북, 애플)',
                    '통계용 라이브러리 AirBridge 추가',
                    '변경된 ATT정책 대응',
                  ],
                  workPercent: '70%',
                  technology: 'Objective-C, GitLab',
                  result: ['앱 기능 및 속도 개선, 기능 및 코드 관리 편의성 개선']
                },
                {
                  title: '인크루트 - 취업운세 앱 개발 및 개선',
                  totalDate: calculateDuration('2020-01-02', '2022-05-22'),
                  siStartDate: createDate('2020-01-02'),
                  siEndDate: createDate('2022-05-22'),
                  siPeriod: calculateDuration('2020-01-02', '2022-05-22'),
                  subject: '운세별 맟춤 구직 정보 제공 앱 \'인크루트-취업운세\' 앱을 유지 보수, 기능 개선',
                  work: [
                    '2.2.8 ~ 2.4.0 버전 버그 대응 및 업데이트',
                    'MVC 디자인 패턴 사용',
                    '공통 사용된 로그인 부분 모듈화하여 통합 Private Pod 라이브러리로 관리',
                    'Firebase Crashlytics 체크 버그 수정 및 문제점 개선'
                  ],
                  workPercent: '70%',
                  technology: 'Objective-C, GitLab',
                  result: ['앱 기능 및 속도 개선, 기능 및 코드 관리 편의성 개선']
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
                  totalDate: calculateDuration('2019-04-01', '2019-12-31'),
                  siStartDate: createDate('2019-04-01'),
                  siEndDate: createDate('2019-12-31'),
                  siPeriod: calculateDuration('2019-04-01', '2019-12-31'),
                  subject: '쇼핑몰을 파싱하여 이미지 추출, 그 이미지를 잠금 화면에 띄워 구매 유도 및 홍보할 수 있는 앱을 개발',
                  work: [
                    'MVVM 디자인 패턴을 활용',
                    'Foreground Service를 이용한 락스크린화면 구현',
                    'Realm DB를 이용한 앱 내 데이터 관리',
                    '웹뷰 리다이렉팅 광고 기술 접목',
                    'SNS로그인(네이버, 카카오, 구글, 페이스북)',
                    'FCM 이용한 Push 알림 기능 개발',
                    '다이나믹 링크를 이용한 딥 링크 기능개발'
                  ],
                  workPercent: '100%',
                  technology: 'Android(JAVA), GitLab',
                  result: ['앱 개발 완료']
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
                  totalDate: calculateDuration('2018-11-1', '2019-01-25'),
                  siStartDate: createDate('2018-11-13'),
                  siEndDate: createDate('2019-01-25'),
                  siPeriod: calculateDuration('2018-11-1', '2019-01-25'),
                  subject: 'LG U+에서 운영 중인 스마트상담 모바일 앱 (소규모 기업용) 기능 추가 프로젝트',
                  work: [
                    'Android 8.0버전에 호환되지 않는 보완 및 버그 수정',
                    '날씨, 미세먼지 정보 조회관련 공공데이터포털(DATA.GO.KR) API사용',
                    'Android 버전 소스 난독화',
                    '보안 솔루션(자이로이드) 적용'
                  ],
                  workPercent: '100%',
                  technology: 'Android(JAVA), iOS(Objective-C)',
                  result: ['짧은 기간 내 Android , iOS앱 개발 테스트 및 상용화']
                },
                {
                  title: 'LG U+ 그룹웨어 iOS 메신저 개발',
                  totalDate: calculateDuration('2018-06-01', '2018-10-30'),
                  siStartDate: createDate('2018-06-01'),
                  siEndDate: createDate('2018-10-30'),
                  siPeriod: calculateDuration('2018-06-01', '2018-10-30'),
                  subject: '미디어로그에서 운영중인 LG U+그룹웨어 서비스 중 iOS앱 메신저 기능 개발',
                  work: [
                    'XML에 기반인 통신 프로토콜 XMPP를 이용하여 iOS메신저 기능 개발',
                    'Realm DB를 이용한 데이터 관리',
                    '사내 조직도 부분 Tree구조 로직화, UI 구현',
                    '보안 솔루션 (자이로이드) 적용'
                  ],
                  workPercent: '100%',
                  technology: 'Swift4, XMPP, RealmDB',
                  result: ['기간 내 iOS 메신저 앱 상용서비스 개발 완료 및 상용화']
                },
                {
                  title: 'LG U+ 스마트 가입 앱 기능개선',
                  totalDate: calculateDuration('2018-05-01', '2018-05-30'),
                  siStartDate: createDate('2018-05-01'),
                  siEndDate: createDate('2018-05-30'),
                  siPeriod: calculateDuration('2018-05-01', '2018-05-30'),
                  subject: '기존 운영되고 있는 하이브리드앱 ‘스마트 가입’ 기능 수정',
                  work: [
                    '웹 기반 앱을 Websquare 기반 앱으로 통합 개발',
                    'Native에서 호출하던 기능들을 모듈화',
                    '서식 관련 외부 솔루션 (OZ e-Form) 적용',
                    '버그 수정 및 코드 리펙토링'
                  ],
                  workPercent: '100%',
                  technology: 'Android, Websquare (Cordova)',
                  result: ['Websquare 개발 부분 테스트 케이스를 모두 만듬. 유지 보수 관리 할 수 있도록 모듈화 작업 완료 및 기간 내 인수인계']
                },
                {
                  title: 'LG U+ 스마트 상담 앱 개발',
                  totalDate: calculateDuration('2018-01-02', '2018-05-01'),
                  siStartDate: createDate('2018-01-02'),
                  siEndDate: createDate('2018-05-01'),
                  siPeriod: calculateDuration('2018-01-02', '2018-05-01'),
                  subject: '휴대폰을 구매하기 전 고객과 상담하면서 핸드폰을 구매할 때 요금 측정 및 혜택을 미리 산출할 수 있는 Websquare 기반 하이브리드 앱개발',
                  work: [
                    'Websquare 기반 앱 개발',
                    'OZ-eform 라이브러리를 활용, 상담 결과값을 문서화하여 바로 프린트하는 기능 추가',
                    '상담 결과값 이미지 변환 및 공유 기능 추가',
                    'App Group을 활용한 타앱 자동로그인 기능 추가(상담 결과값 데이터를 스마트 개통 앱으로 전달하여 바로 개통서비스를 이용할 수 있도록 연동)',
                    '위치 기반 날씨 정보 조회 개발',
                    '일반 계산기, 만 나이 계산기, 띠 계산기 개발'
                  ],
                  workPercent: '100%',
                  technology: 'Android, Websquare (Cordova)',
                  result: ['기간 내 개발 및 상용화']
                },
                {
                  title: 'LG U+고객센터 앱 – 위젯, APNs 구현',
                  totalDate: calculateDuration('2017-08-21', '2017-12-14'),
                  siStartDate: createDate('2017-08-21'),
                  siEndDate: createDate('2017-12-14'),
                  siPeriod: calculateDuration('2017-08-21', '2017-12-14'),
                  subject: '하이브리드 앱 으로 구현되어 있는 LG U+고객센터 iOS앱의 위젯과 Push알림 기능을 구현',
                  work: [
                    '형상관리화 되어 있지 않던 프로젝트 Git을 이용한 형상관리화',
                    'weather extension을 이용한 위젯 기능 추가',
                    'Push Notification (알림) 기능 추가',
                    'Push서비스 담당 협력사의 API 연동',
                    '해킹방지 용 보안 소스 추가'
                  ],
                  workPercent: '100%',
                  technology: 'Objective-C',
                  result: ['기간 내 개발 완료 및 배포']
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
                  totalDate: calculateDuration('2017-02-05', '2017-08-14'),
                  siStartDate: createDate('2017-02-05'),
                  siEndDate: createDate('2017-08-14'),
                  siPeriod: calculateDuration('2017-02-05', '2017-08-14'),
                  subject: '실시간 모바일 방송 플랫폼 앱 개발',
                  work: [
                    'React-Native 기반 Android, iOS 앱 개발',
                    'C++로 되어있는 사내 라이브러리를 적용하여 얼굴 인식, 필터 기능 구현',
                    'WebSocket을 이용한 게임 인터랙션 기능 구현',
                    'Wowza 기반 Streaming 서비스 구현',
                    'Firebase Realtime DB 를 이용한 채팅 서비스 구현',
                    '모바일 기기용 영상합성앱 기술 적용'
                  ],
                  workPercent: '50%',
                  technology: 'React-Native(Android, iOS), Wowza, Firebase Realtime DB, Github',
                  result: ['ES6 활용, React-Native의 장단점을 이해하고 활용하는 데 도움됨']
                },
                {
                  title: 'OMG (Oh My Gif) 앱 개발',
                  totalDate: calculateDuration('2016-05-23', '2016-11-14'),
                  siStartDate: createDate('2016-05-23'),
                  siEndDate: createDate('2016-11-14'),
                  siPeriod: calculateDuration('2016-05-23', '2016-11-14'),
                  subject: 'Gif 에디터 앱 개발',
                  work: [
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
                  result: ['iOS 앱, 개발부터 배포까지 전담하여 개발 할 수 있었던 경험']
                },
                {
                  title: 'Boodl 앱 개발',
                  totalDate: calculateDuration('2015-11-04', '2016-09-08'),
                  siStartDate: createDate('2015-11-04T00:00:00'),
                  siEndDate: createDate('2016-09-08T00:00:00'),
                  siPeriod: calculateDuration('2015-11-04', '2016-09-08'),
                  subject: '자신만의 이미지 및 애니메이션 이모티콘 생성 앱 개발',
                  work: [
                    'Clean Architecture, MVP 패턴 적용',
                    'C++로 되어있는 폰트 렌더링 관련 Native 소스를 안드로이드에 적용',
                    '이미지 애니메이션 기능 적용',
                    '사진에 편집, 필터 기능 적용'
                  ],
                  workPercent: '30%',
                  technology: 'Android, Github',
                  result: ['앱 개발 완료, 10만 사용자 수와 초기 새로운 영화 홍보에 계약을 맺는 등 긍정적인 성과']
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
            `${calculateYearOnly('2014-07-14T00:00:00')}차 모바일 개발자`,
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
          ],
          Introduction: {
            company: '현대오토에버',
            part: '완성차 앱 개발/운영 지원',
            contents: [
              {
                title: 'AI 시대 개발자가 갖춰야 할 기술 선택의 기준',
                content: '빠르게 변화하는 기술 환경 속에서 개발자는 새로운 도구를 익히는 것만으로는 충분하지 않다고 생각합니다. 특히 최근 몇 년간 AI 기술이 눈에 띄게 발전하면서, 단순한 기능 개발조차도 여러 접근 방식이 존재하고 그 선택이 사용자 경험에 직접적인 영향을 주는 시대가 되었습니다.\n예를 들어 ‘즐겨찾기’처럼 간단해 보이는 기능도 클릭 시 로딩을 통해 화면을 잠그는 기존 방식이 있고, 반대로 낙관적 업데이트를 적용해 먼저 UI를 갱신한 뒤 서버 오류가 발생하면 롤백하는 방식도 있습니다. 또 RxSwift나 Combine의 debounce를 활용해 짧은 시간에 발생하는 과도한 요청을 제어하면서도 즉각적인 UI 응답성을 유지하는 방법도 있습니다. 각 방식마다 장단점이 분명히 존재하며, 상황에 맞게 선택할 수 있는 능력이 지금 필요한 역량이라고 생각합니다.\niOS 개발 경험도 이러한 고민과 함께 넓어졌습니다. Objective-C와 UIKit 중심의 개발부터 Swift 기반 구조, 그리고 최근에는 SwiftUI를 이용한 선언형 UI까지 자연스럽게 이어지며, 기술 스택에 따라 어떤 아키텍처가 적합한지 직접 적용해 보았습니다. RIBs처럼 구조적 안정성이 필요한 환경도 있었고, MVVM이나 Clean Architecture처럼 테스트성과 유지보수성을 강조하는 방식이 빛을 발하는 프로젝트도 있었습니다.\n이 과정에서 단순히 “어떤 패턴을 썼다”가 아니라, 왜 이 방식이 지금 우리 팀과 서비스에 맞는지를 판단하고 설명하는 능력을 키울 수 있었습니다. 결국 개발은 기술 자체보다도, 사용자 경험을 최우선으로 두고 적절한 방식을 선택하는 판단력이 중요하다고 생각합니다.\n그리고 그런 판단을 할 수 있으려면 언어와 프레임워크의 특성을 이해하고, 다양한 시도를 통해 장단점을 직접 느껴보는 경험이 꼭 필요합니다. 저는 그동안의 프로젝트를 통해 이러한 경험을 꾸준히 쌓아왔고, 앞으로도 기술 변화 속에서 팀과 서비스에 실질적인 도움이 되는 개발자로 성장하고 싶습니다.',
              },
              {
                title: '개발 환경을 개선하는 개발자',
                content: '개발자로 일하면서 가장 크게 배운 순간은, 누구나 할 수 있는 개발처럼 보이지만 정작 아무도 하지 않았던 개선이 얼마나 큰 가치를 만들어 낼 수 있는지 깨달았을 때였습니다. 현업에 입사한 지 1년쯤 되었을 때, 테스트를 위해 매번 동일한 10자리 번호를 직접 입력해 로그인하던 기존 방식을 아무 의심 없이 따라가고 있었습니다. 그 과정이 비효율적이라는 사실조차 인지하지 못한 채 “원래 다 이렇게 해왔겠지”라는 익숙함 속에서 작업을 반복하고 있었습니다.\n하지만 새로 입사한 신입 개발자는 그 과정을 불편하다고 판단했고, 개발 환경에서 고객번호를 저장하고 리스트 형태로 선택하여 즉시 로그인할 수 있는 기능을 이틀 만에 만들어 적용했습니다. 단순해 보이는 기능이었지만, 실제로는 개발·테스트 과정 전반의 시간을 크게 줄여주었고 팀 전체의 생산성을 눈에 띄게 높였습니다. 그 순간 저는 “왜 나는 이런 생각을 하지 못했을까?”라는 질문을 스스로에게 던졌고, 오래된 관행을 의심하고 개선해 나가는 일이 개발자의 중요한 역할임을 깊이 깨달았습니다.\n이 경험을 계기로 저는 **제가 개발을 위해 임시로 손봤던 작은 편의 기능들도 ‘나만의 작업’으로 끝나지 않도록, 팀 전체가 사용할 수 있는 형태로 확장해 적용할 방법을 고민하기 시작했습니다.** 단순히 나에게만 편한 도구를 만드는 것이 아니라, 이를 공통 모듈화하거나 세팅 옵션으로 제공하여 팀 전체가 동일한 효율을 얻을 수 있도록 구조화하는 방향으로 발전시켰습니다. 개발 환경의 작은 개선이라도 모든 구성원이 함께 사용할 수 있을 때, 그 가치가 몇 배로 커진다는 사실을 스스로 체감했기 때문입니다.\n그 이후로 저는 항상 “우리의 개발 환경을 어떻게 하면 더 효율적으로 바꿀 수 있을까?”라는 관점을 가지고 일하고 있으며, 실제 개발 과정에서도 테스트 환경과 개발 환경을 개선할 수 있는 기술과 방식을 적극적으로 도입해 왔습니다. 작은 불편을 발견하고 개선하는 일은 단순한 기능 구현 이상의 가치가 있으며, 팀 전체의 시간을 절약하고 더 나은 품질의 서비스를 만드는 핵심 동력이라고 믿고 있습니다.',
              },
              {
                title: '존중과 배려로 소통하며 함께 성장하고 싶은 개발자',
                content: '협업 과정에서는 의견이 충돌하는 순간이 종종 있습니다. 저는 그런 상황에서 늘 존중과 배려를 바탕으로 문제를 해결해 왔습니다. 이전 회사에서 제가 수정한 소스 코드를 보고 동료가 회의를 요청했던 적이 있습니다. 하나의 뷰 컨트롤러에 정의된 화면을 커스텀 뷰로 나눈 이유, 공통 기능을 라이브러리화했을 때 과한 설계가 되지 않는지 등 다양한 논의를 나눴습니다. 그 당시 저는 중복되는 UI를 커스텀 뷰로 분리하면 실수를 줄이고 유지 보수가 쉬워진다는 점을 설명했습니다. 또한 로그인 모듈처럼 여러 서비스가 함께 사용하는 기능은 라이브러리화해야 전체 프로젝트의 안정성과 효율이 높아진다는 점을 근거와 함께 전달했습니다. 기존 방식을 단순히 지적하는 것이 아닌, 당시 개발 환경을 이해하고 공감하며 더 좋은 방향을 함께 고민하고자 했습니다. 회의가 끝난 뒤 동료에게서 “좋은 개발자와 함께 일하게 되어 고맙다”라는 말을 들었습니다. 그 말은 저의 소통 방식과 기술적 판단이 팀에 긍정적인 방향으로 작용하고 있다는 것을 실감하게 해 준 순간이었습니다. 이 경험을 통해 저는 단순히 기능을 구현하는 개발자가 아니라, 팀과 함께 성장하는 문화를 중요하게 생각하는 사람이라는 점을 스스로 확인할 수 있었습니다.\n하지만 안정만을 우선하는 환경에서는 새로운 기술을 시도하거나 서로의 생각을 나눌 기회가 많지 않았습니다. 저는 성장이란 혼자 노력한다고 이루어지는 것이 아니라, 지식과 경험을 공유하고 함께 도전하는 과정에서 만들어진다고 믿습니다. 그래서 각자의 전문성을 존중하면서도 기술을 함께 고민할 수 있는 조직에서 끝까지 성장하고 싶다는 목표가 생겼습니다. 앞으로 더 나은 서비스를 위해 동료들과 머리를 맞대고, 팀의 발전 속에서 함께 성장하는 개발자로 나아가고자 합니다.\n감사합니다.',
              },
            ]
          }
        }
      });

      callback();
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update user data.');
    }
  }
};
