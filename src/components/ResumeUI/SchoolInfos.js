import React from 'react';
import {
    SubTitle,
    SectionTitle,
    Divider,
    Section,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';

const SchoolInfos = ({ listItems }) => {
    console.log(listItems)
  return (
    <section>
      <SubTitle>학력정보</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
            <Section key={index}>
                <SectionTitle>{item.type}</SectionTitle>
                <SectionContainer>
                    <ContentsItem>{item.school} ({item.endType})</ContentsItem>
                    <ContentsItem>{item.major} | 졸업학점: {item.entireRating}, 전공학점: {item.majorRating} </ContentsItem>
                </SectionContainer>
            </Section>
        ))}
    </section>
  );
}

export default SchoolInfos;