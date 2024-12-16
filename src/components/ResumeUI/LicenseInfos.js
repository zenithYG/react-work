import React from 'react';
import {
  SubTitle,
  SectionTitle,
  Divider,
  SectionContainer,
  ContentsItem,
  HighlightText
} from '../ResumeStyles';

const LicenseInfos = ({ listItems }) => {
  return (
    <section>
      <SubTitle>자격증</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
        <SectionContainer key={index}>
          <SectionTitle>
            {item.name} <HighlightText>({item.licenseNumber})</HighlightText>
          </SectionTitle>
          <ContentsItem>
            <strong>발급기관:</strong> {item.organization} | <strong>취득일:</strong> {item.date}
          </ContentsItem>
        </SectionContainer>
      ))}
    </section>
  );
};

export default LicenseInfos;
