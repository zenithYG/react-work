import React from 'react';
import styled from 'styled-components';

import {
    SubTitle,
    SectionTitle,
    Divider,
    Section,
    SectionContainer,
    ContentsItem,
    HorizontalSectionContainer
} from '../ResumeStyles';
import {
    dateToString,
    calculateDurationCurrent
} from '../../utils/dateUtils'

const PartStyle = styled.h4`
  padding-left: 5px;
  color: #000000; 
  font-weight: 700;
  margin: 0;
`;


const WorkingExperienceDate = styled.p`
  line-height: 1.0;
  font-weight: 500;
  padding-left: 10px;
  padding-bottom: 4px;
  margin: 0;
`;

const WorkingSectionContainer = styled.p`
  padding-left: 5px; 
  line-height: 1.0;
`;

const CompanyInfo = styled.p`
  line-height: 1.0;
  margin: 0px;
`;

const ProjectSectionContainer = styled.div`
  padding-top: 0px; 
  padding-left: 10px; 
  padding-bottom: 15px; 
  line-height: 1.0;
`;

const ProjectTitle = styled.h4`
  padding-left: 0px;
  color: #000000; 
  font-weight: 700;
  font-size: 18px;
  margin: 0;
`;

const ProjectExperienceDate = styled.h5`
  line-height: 1.0;
  font-weight: 500;
  padding-left: 5px;
  margin: 0;
`;

const ProjectContentsContainer = styled.div`
  padding-top: 0px; 
  padding-left: 10px; 
  padding-bottom: 15px; 
  line-height: 1.0;
`;


const WorkingExperience = ({ listItems }) => {
  return (
    <section>
      <SubTitle>경력</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
            <Section key={index}>
                <HorizontalSectionContainer>
                    <SectionTitle>{item.company}</SectionTitle>
                    <PartStyle>{item.part}</PartStyle>
                    <WorkingExperienceDate>{dateToString(item.startDate)} - {dateToString(item.endDate)}</WorkingExperienceDate>
                    <WorkingExperienceDate style={{fontWeight: 'bold' }}>({item.period})</WorkingExperienceDate>
                </HorizontalSectionContainer>
                <WorkingSectionContainer>
                    <CompanyInfo>{item.businessInfo} | {item.rank} | {item.position}</CompanyInfo>
                    <ContentsItem>{item.rank} | {item.position}</ContentsItem>
                </WorkingSectionContainer>
                <ProjectSectionContainer>
                {
                    item.projects.map((project, index) => (
                        <ProjectContentsContainer>
                            <HorizontalSectionContainer>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectExperienceDate>{dateToString(project.siStartDate)} - {dateToString(project.siEndDate)}</ProjectExperienceDate>
                                <ProjectExperienceDate style={{fontWeight: 'bold' }} >({project.siPeriod})</ProjectExperienceDate>
                            </HorizontalSectionContainer>
                            <ContentsItem>{project.subject}</ContentsItem>
                            {
                                project.work.map((work, index) => (
                                    <div>
                                        <ul> * {work}</ul>
                                    </div>
                                ))
                            }
                            <ContentsItem>기여도: {project.workPercent} | 사용 기술 : {project.technology}</ContentsItem>
                            {
                                project.result.map((result, index) => (
                                    <div>
                                        <ul> * {result}</ul>
                                    </div>
                                ))
                            }
                        </ProjectContentsContainer>
                    ))
                }
                </ProjectSectionContainer>
            </Section>
        ))}
    </section>
  );
}

export default WorkingExperience;