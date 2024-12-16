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

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyName = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const Period = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Role = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #444;
`;

const ProjectContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

const ProjectDetails = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #444;
`;

const WorkingExperience = ({ listItems }) => {
  return (
    <section>
      <SubTitle>경력</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
        <Section key={index}>
          <FlexContainer>
            <CompanyHeader>
              <CompanyName>{item.company}</CompanyName>
              <Period>
                {dateToString(item.startDate)} - {dateToString(item.endDate)} ({item.period})
              </Period>
            </CompanyHeader>
            <Role>
              {item.part} | {item.rank} | {item.position}
            </Role>
            <p>{item.businessInfo}</p>
          </FlexContainer>

          {item.projects.map((project, projectIndex) => (
            <ProjectContainer key={projectIndex}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDetails>
                {dateToString(project.siStartDate)} - {dateToString(project.siEndDate)} ({project.siPeriod})
              </ProjectDetails>
              <ContentsItem>{project.subject}</ContentsItem>
              <List>
                {project.work.map((work, workIndex) => (
                  <li key={workIndex}>{work}</li>
                ))}
              </List>
              <p>기여도: {project.workPercent} | 사용 기술: {project.technology}</p>
              <List>
                {project.result.map((result, resultIndex) => (
                  <li key={resultIndex}>{result}</li>
                ))}
              </List>
            </ProjectContainer>
          ))}
        </Section>
      ))}
    </section>
  );
};

export default WorkingExperience;
