import React, { useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import exportSeparatedPdf from '../utils/exportSeparatedPdf';

import {
    UpdateButton,
    Card,
    Info,
    InfoContainer,
    Item,
    MainTitle,
    Container,
    Section,
    CardContainer,
    AdminContainer
} from './ResumeStyles';

const CareerCertificate = () => {
    const contentRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const userData = location.state?.resume;

    const handleExportPdf = async () => {
        await exportSeparatedPdf(contentRef.current, "career_certificate.pdf");
    };

    const todayStr = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Container style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>

            <AdminContainer>
                <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
                <UpdateButton onClick={() => navigate(-1)}>Back</UpdateButton>
            </AdminContainer>

            <div ref={contentRef}>
                {!userData ? (
                    <Section style={{ textAlign: 'center', marginTop: '40px' }}>
                        <h2>데이터 없음</h2>
                    </Section>
                ) : (
                    <>
                        <CardContainer>
                            <Card style={{ display: 'block' }}>
                                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                                    <MainTitle
                                        style={{
                                            textAlign: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            paddingTop: 15
                                        }}
                                    >
                                        경력증명서
                                    </MainTitle>
                                </div>

                                <InfoContainer>
                                    <Info>
                                        <Item>성명 : {userData.name}</Item>
                                        <Item>생년월일 : {userData.birthday}</Item>
                                        <Item>이메일 : {userData.email}</Item>
                                        <Item>연락처 : {userData.mobile}</Item>
                                        <Item>직무 : {userData.jobTitle}</Item>
                                    </Info>
                                </InfoContainer>
                            </Card>
                        </CardContainer>

                        <Section>
                            <h3 style={{ fontWeight: '600', marginBottom: '10px' }}>
                                경력 사항
                            </h3>

                            {userData.workingExperience?.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        borderBottom: '1px solid #ddd',
                                        paddingBottom: '14px',
                                        marginBottom: '14px'
                                    }}
                                >
                                    <p><b>회사명</b> : {item.company}</p>
                                    <p><b>근무기간</b> : {item.period}</p>
                                    <p><b>직급/직책</b> : {item.position}</p>
                                    <p><b>담당업무</b> : {item.description}</p>
                                </div>
                            ))}
                        </Section>

                        <Section>
                            <h3 style={{ fontWeight: '600', marginBottom: '10px' }}>
                                주요 프로젝트
                            </h3>

                            {userData.researchProject?.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        borderBottom: '1px solid #ddd',
                                        paddingBottom: '14px',
                                        marginBottom: '14px'
                                    }}
                                >
                                    <p><b>프로젝트명</b> : {item.title}</p>
                                    <p><b>기간</b> : {item.period}</p>
                                    <p
                                        style={{
                                            lineHeight: 1.6,
                                            whiteSpace: 'pre-line'
                                        }}
                                    >
                                        <b>내용</b> : {item.description}
                                    </p>
                                </div>
                            ))}
                        </Section>

                        <Section style={{ marginTop: '60px', textAlign: 'center', fontWeight: '600' }}>
                            <p style={{ marginBottom: '10px' }}>
                                위 경력 사항은 이력서에 기재된 내용을 기준으로 작성되었습니다.
                            </p>
                            <p style={{ marginBottom: '4px' }}>{todayStr}</p>
                            <p>지원자 : {userData.name}</p>
                        </Section>
                    </>
                )}
            </div>
        </Container>
    );
};

export default CareerCertificate;