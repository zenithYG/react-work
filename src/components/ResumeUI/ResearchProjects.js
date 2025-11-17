import React from 'react';
import styled from 'styled-components';
import { SubTitle, Divider, ContentsItem } from '../ResumeStyles';
import { dateToString } from '../../utils/dateUtils';

const Section = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const Period = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Field = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #444;
`;

const MetaList = styled.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #444;
`;
const ResearchProject = ({ researchProject = [] }) => {
    return (
        <section>
            <SubTitle>연구개발 과제</SubTitle>
            <Divider />

            {researchProject.length === 0 && (
                <p>연구개발 과제 정보가 없습니다.</p>
            )}

            {researchProject.map((item, index) => (
                <Section key={index}>
                    <FlexContainer>
                        {/* 제목 + 기간 */}
                        <Header>
                            <Title>{item.title}</Title>
                            <Period>
                                {dateToString(item.startDate)} - {dateToString(item.endDate)} ({item.period})
                            </Period>
                        </Header>

                        {/* 기관 정보 */}
                        <Field>{item.organization}</Field>
                        <p>주관기관: {item.leadingInstitution}</p>

                        {/* 상세 메타 데이터 */}
                        <MetaList>
                            <li>과제번호: {item.number}</li>
                            <li>연구관리번호: {item.researchNumber}</li>
                            <li>참여율: {item.percent}</li>
                        </MetaList>
                    </FlexContainer>
                </Section>
            ))}
        </section>
    );
};


export default ResearchProject;
