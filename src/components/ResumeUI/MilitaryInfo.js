import React from 'react';
import {
    SubTitle,
    SectionTitle,
    Divider,
    SectionContainer,
    ContentsItem
} from '../ResumeStyles';
import {
    dateToString
} from '../../utils/dateUtils'

const MilitaryInfo = ({ item }) => {

    return (
        <div>
        <SubTitle>병역정보</SubTitle>
        <Divider />
        <SectionTitle>{item.militaryExperience}</SectionTitle>
        <SectionContainer>
                <ContentsItem>{item.type} | {item.position} | {item.rank}</ContentsItem>
                <ContentsItem>복무기간 : {dateToString(item.startDate)} - {dateToString(item.endDate)} ({item.discharger})</ContentsItem>
        </SectionContainer>         
        </div>
    );
}

export default MilitaryInfo;