import React from 'react';
import {
    SubTitle,
    SectionTitle,
    Divider,
    Section,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';

const EducationInfos = ({ listItems }) => {
  return (
    <section>
      <SubTitle>교육</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
            <Section key={index}>
              <SectionTitle>{item.title}</SectionTitle>
                  <SectionContainer>
                    <ContentsItem>교육기관 : {item.organization}</ContentsItem>
                    <ContentsItem>기간 : {item.period}</ContentsItem>
                    <ContentsItem>내용 : {item.contents}</ContentsItem>
                  </SectionContainer>
            </Section>
        ))}
    </section>
  );
}

export default EducationInfos;