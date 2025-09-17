import React from 'react';
import {
    SubTitle,
    Divider,
    ListItem,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';

const ExecutiveSummary = ({ listItems }) => {
  return (
    <section>
      <SubTitle>요약</SubTitle>
      <Divider />
      <SectionContainer>
        {listItems.map((item, index) => (
          <ContentsItem key={index}>{item}</ContentsItem>
        ))}
      </SectionContainer>
    </section>
  );
}

export default ExecutiveSummary;