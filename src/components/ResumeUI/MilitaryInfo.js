import React from 'react';
import {
  SubTitle,
  SectionTitle,
  Divider,
  SectionContainer,
  ContentsItem,
  HighlightText
} from '../ResumeStyles';
import { dateToString } from '../../utils/dateUtils';

const MilitaryInfo = ({ item }) => {
  return (
    <section>
      <SubTitle>병역정보</SubTitle>
      <Divider />
      <SectionContainer>
        <SectionTitle>{item.militaryExperience}</SectionTitle>
        <ContentsItem>
          <strong>복무 유형:</strong> {item.type} | <strong>직책:</strong> {item.position} |{' '}
          <strong>계급:</strong> {item.rank}
        </ContentsItem>
        <ContentsItem>
          <strong>복무 기간:</strong> {dateToString(item.startDate)} - {dateToString(item.endDate)}{' '}
          <HighlightText>({item.discharger})</HighlightText>
        </ContentsItem>
      </SectionContainer>
    </section>
  );
};

export default MilitaryInfo;
