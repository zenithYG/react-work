import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5b7fa4;
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
  background-color: #5b7fa4;
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
  width: 80px;
  height: 100px;
  background-color: #fff;
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
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    padding: 20px 10px;
  }
`;

export const SubTitle = styled.h2`
  color: #5581B0; 
  font-weight: 800;
`;

export const Container = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  width: 100%; 
  max-width: 100%;

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

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #333;
  margin-top: -10px;
  margin-bottom: 20px;
`;

export const ListItem = styled.li`
  line-height: 1.6;
  font-weight: 500;
`;
