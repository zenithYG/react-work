import React from 'react';
import {
    SubTitle,
    Divider,
    ListItem,
} from '../ResumeStyles';

const ExecutiveSummary = ({ listItems }) => {
  return (
    <section>
      <SubTitle>Executive Summary</SubTitle>
      <Divider />
      <ul>
        {listItems.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </ul>
    </section>
  );
}

export default ExecutiveSummary;