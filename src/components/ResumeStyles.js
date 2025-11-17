import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1372CE;
  color: white;
  font-family: Arial, sans-serif;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
`;

export const AdminContainer = styled.div`
  position: relative;
  z-index: 999; /* 클릭 최우선 */
  background: white; /* 필요시 추가 */
`;


export const InfoContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: row;
  min-width: 50%;
  padding-left: 50px;
  padding-right: 20px;

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
    justify-content: center;
  }
`;

export const Item = styled.div`
  margin: 5px 0;
  line-height: 1.0;
  font-weight: 500;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Avatar = styled.div`
  width: 90px;
  height: 120px;
  background-color: #fff;
  background-image: url(${(props) => props.image});
  background-size: contain; /* 비율 유지하면서 이미지가 컨테이너에 맞게 조정됨 */
  background-position: center; /* 이미지를 컨테이너 중앙에 배치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5b7fa4;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const UpdateButton = styled.button`
  padding: 10px 20px;
  margin: 20px;
  background-color: #5b7fa4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #456f8a;
  }
`;

export const MainTitle = styled.h1`
  color: #ffffff; 
  font-weight: 800;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    padding: 20px 0;
  }
`;

export const Container = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 20px;
  width: 100%; 
  max-width: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
    min-width: auto;
  }
`;

export const TitleContainer = styled.div`
  font-family: Arial, sans-serif;
  padding-top: 0px;
  width: 100%; 
  max-width: 100%;
  background-color: #5581B0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ContentsSubItem = styled.p`
  line-height: 1.0;
  font-weight: 500;
`;

export const HorizontalSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end; 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start; 
  }
`;

export const Section = styled.section`
padding: 10px;
`;


export const SectionContainer = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #444;
  margin-top: -5px;
  margin-bottom: 5px;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
`;

export const ContentsItem = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin: 5px 0;
`;

export const ListContainer = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
`;

export const ListItem = styled.li`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HighlightText = styled.span`
  font-weight: bold;
  color: #2a73cc;
`;