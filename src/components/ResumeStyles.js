import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5b7fa4;
  color: white;
  padding-right: 20px;
  font-family: Arial, sans-serif;
  maxWidth: 100%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  minWith: 50%;
`;

export const Item = styled.div`
  margin: 5px 0;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5b7fa4;
`;

export const MainTitle = styled.h1`
    color: #ffffff; 
    font-weight: 800;
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
    flex-basis: 100%; /* MainTitle이 전체 너비를 차지하도록 함 */
    text-align: left; /* 텍스트 중앙 정렬 */
    word-break: break-word; /* 단어가 너무 길어서 줄을 넘치면 줄을 바꿈 */
    white-space: normal; /* 공백과 줄 바꿈을 일반적으로 처리 */
    overflow-wrap: break-word; /* 단어가 긴 경우 줄을 바꿈 */
`;

export const SubTitle = styled.h2`
    color: #5581B0; 
    font-weight: 800;
`;

export const Container = styled.div`
    fontFamily: Arial, sans-serif;
    lineHeight: 1.6;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    maxWidth: 800px; 
    min-width: 450px;
`;

export const TitleContainer = styled.div`
    fontFamily: Arial, sans-serif;
    padding-top: 0px;
    maxWidth: 800px; 
    background-color: #5581B0;
`;

export const Divider = styled.hr`
    border: 0;
    height: 1px;
    background-color: #333; /* 검정색 구분선 */
    margin-top: -10px; /* 상단 여백 줄이기 */
    margin-bottom: 20px; /* 하단 여백 유지 */
`;

export const ListItem = styled.li`
    line-height: 1.6; /* li 요소의 줄 간격 줄이기 */
    font-weight: 500;
`;
