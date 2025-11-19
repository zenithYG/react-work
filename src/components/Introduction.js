import React, { useState, useEffect, useRef } from 'react';
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
                        {/* 📌 상단 프로필 영역 */}
                        <CardContainer>
                            <Card>
                                <div style={{ marginBottom: 0 }}>
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

                        {/* ✨ 지원 정보 */}
                        <Section>
                            <h2 style={{ fontWeight: '700', marginBottom: '5px' }}>지원 정보</h2>
                            <p>지원 분야: <b>{userData.Introduction?.company}</b> / <b>{userData.Introduction?.part}</b></p>
                        </Section>

                        {/* ✨ 본문 리스트 */}
                        {userData.Introduction?.contents?.map((item, index) => (
                            <Section key={index}>
                                {item.title && <h3 style={{ fontWeight: '600', marginBottom: '5px' }}>{item.title}</h3>}
                                <p>{item.content}</p>
                            </Section>
                        ))}

                        {/* ✨ 사실 확인 문구 */}
                        <Section style={{ marginTop: '40px', textAlign: 'right', fontWeight: '600' }}>
                            <p style={{ marginBottom: '10px' }}>위 작성한 내용은 사실과 다름없음을 확인합니다.</p>
                            <p>지원자: {userData.name}</p>
                        </Section>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Introduction;
