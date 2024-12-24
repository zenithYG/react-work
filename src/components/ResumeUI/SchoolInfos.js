import React from 'react';
import {
    SubTitle,
    SectionTitle,
    Divider,
    Section,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';
import { dateToString } from '../../utils/dateUtils';

const SchoolInfos = ({ listItems }) => {
    console.log(listItems)
  return (
    <section>
      <SubTitle>학력정보</SubTitle>
      <Divider />
      {listItems.map((item, index) => (
            <SectionContainer key={index}>
                <SectionTitle>{item.type}</SectionTitle>
                <ContentsItem>{item.school} ({item.endType})</ContentsItem>
                <ContentsItem> {dateToString(item.startDate)} - {dateToString(item.endDate)}{' '} </ContentsItem>
                {
                  item.type == '대학교' && (
                    <>
                    <ContentsItem>{item.major} | 졸업학점: {item.entireRating}, 전공학점: {item.majorRating} </ContentsItem>
                    </>
                  )
                }
            </SectionContainer>
        ))}
    </section>
  );
}

export default SchoolInfos;