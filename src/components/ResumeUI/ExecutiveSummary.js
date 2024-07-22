import React from 'react';
import {
    SubTitle,
    Divider,
    ListItem,
    ContentsItem
} from '../ResumeStyles';

const ExecutiveSummary = ({ listItems }) => {
  return (
    <section>
      <SubTitle>Executive Summary</SubTitle>
      <Divider />
        {listItems.map((item, index) => (
          <ContentsItem key={index}>{item}</ContentsItem>
        ))}
    </section>
  );
}

export default ExecutiveSummary;