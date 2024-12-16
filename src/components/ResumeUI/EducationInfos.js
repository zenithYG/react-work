import React from 'react';
import {
  SubTitle,
  SectionTitle,
  Divider,
  SectionContainer,
  ContentsItem
} from '../ResumeStyles';

const EducationInfos = ({ listItems }) => {
  return (
    <section>
      <SubTitle>교육</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
        <SectionContainer key={index}>
          <SectionTitle>{item.title}</SectionTitle>
          <ContentsItem>
            <strong>교육기관:</strong> {item.organization}
          </ContentsItem>
          <ContentsItem>
            <strong>기간:</strong> {item.period}
          </ContentsItem>
          <ContentsItem>
            <strong>내용:</strong> {item.contents}
          </ContentsItem>
        </SectionContainer>
      ))}
    </section>
  );
};

export default EducationInfos;
