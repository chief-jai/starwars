import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleIconContainer = styled.div`
  height: 30px;
  width: 30px;
  background-color: #e6e9fd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: #4f68f6;
`;

const Title = styled.h1`
  font-size: 22px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.p`
  color: #00000061;
  font-weight: 700;
  line-height: 20px;
  margin-left: 38px;
`;

const SubSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export {
  Container,
  Subtitle,
  Title,
  TitleContainer,
  TitleIconContainer,
  TitleIcon,
  TextContainer,
  SubSectionContainer,
  ButtonGroup,
};
