import React from 'react';
import {
    SubTitle,
    SectionTitle,
    Divider,
    Section,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';

const LicenseInfos = ({ listItems }) => {
  return (
    <section>
      <SubTitle>자격증</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
            <Section key={index}>
                <SectionTitle>{item.name} ({item.licenseNumber})</SectionTitle>
                <SectionContainer>
                    <ContentsItem>발급기관 : {item.organization} | 취득일 : {item.date}</ContentsItem>
                </SectionContainer>
            </Section>
        ))}
    </section>
  );
}

export default LicenseInfos;