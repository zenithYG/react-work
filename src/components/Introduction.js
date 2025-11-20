import React, { useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import exportSeparatedPdf from '../utils/exportSeparatedPdf';
import avatar from '../images/yg.jpg';
import { calculateKoreanAge } from '../utils/dateUtils';

import {
    UpdateButton, Card, Info, InfoContainer, Item, Avatar,
    MainTitle, Container, Section, CardContainer, AdminContainer
} from './ResumeStyles';

const Introduction = () => {
    const contentRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    /** 🔥 Resume에서 전달받은 데이터 */
    const userData = location.state?.resume;

    /** 🔥 PDF Export */
    const handleExportPdf = async () => {
        await exportSeparatedPdf(contentRef.current, "introduction.pdf");
    };

    /** 📅 오늘 날짜 (YYYY년 M월 D일) */
    const todayStr = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Container style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>

            {/* 🔙 버튼 항상 표시 */}
            <AdminContainer>
                <UpdateButton onClick={handleExportPdf}>Export pdf</UpdateButton>
                <UpdateButton onClick={() => navigate(-1)}>Back</UpdateButton>
            </AdminContainer>

            <div ref={contentRef}>

                {/* ❗ 데이터 없음 */}
                {!userData ? (
                    <Section style={{ textAlign: 'center', marginTop: '40px' }}>
                        <h2>데이터 없음</h2>
                    </Section>
                ) : (
                    <>
                        <CardContainer>
                            <Card style={{ display: 'block' }}>
                                {/* 🎯 자기소개서 제목 (가운데 정렬) */}
                                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                                    <MainTitle
                                        style={{
                                            textAlign: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            paddingTop: 15
                                        }}
                                    >
                                        자기소개서
                                    </MainTitle>
                                </div>

                                {/* 📌 지원 정보 (바로 아래, 오른쪽 정렬) */}
                                <div
                                    style={{
                                        textAlign: 'right',
                                        fontSize: '14px',
                                        paddingRight: 20,
                                        paddingBottom: 10,  // ⬅️ 추가
                                    }}
                                >
                                    <b>{userData.Introduction?.company}</b>
                                    <br />
                                    {userData.Introduction?.part}
                                </div>

                            </Card>
                        </CardContainer>

                        {/* ✨ 본문 리스트 (기존 그대로) */}
                        {userData.Introduction?.contents?.map((item, index) => (
                            <Section key={index}>
                                {item.title && <h3 style={{ fontWeight: '600', marginBottom: '5px' }}>{item.title}</h3>}
                                <p
                                    style={{
                                        lineHeight: 1.6,
                                        whiteSpace: 'pre-line',
                                        textIndent: '1em',
                                        paddingLeft: 0
                                    }}
                                >
                                    {item.content}
                                </p>
                            </Section>
                        ))}

                        {/* ✨ 사실 확인 문구 (가운데 정렬 + 날짜 + 이름) */}
                        <Section style={{ marginTop: '60px', textAlign: 'center', fontWeight: '600' }}>
                            <p style={{ marginBottom: '10px' }}>위 작성한 내용은 사실과 다름없음을 확인합니다.</p>
                            <p style={{ marginBottom: '4px' }}>{todayStr}</p>
                            <p>지원자 : {userData.name}</p>
                        </Section>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Introduction;
