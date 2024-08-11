import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled(Row)`
  height: 100vh;
`;

const Container = styled(Column)`
  width: 100%;
  height: 100%;
`;

const LoaderContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled(Row)`
  width: 100%;
  padding: 32px 40px;
  border-bottom: 1px solid #e8eaed;
  position: sticky;
  z-index: 1;
`;

const BodyContainer = styled(Row)`
  justify-content: center;
  align-items: flex-start;
  padding: 36px 24px;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 30px;
`;

const DetailsContainer = styled(Column)`
  gap: 8px;
  width: 25%;
`;

const CustomContainer = styled(BodyContainer)`
  padding: 32px 40px;
  width: 100%;
`;

const GeneralContainer = styled(Column)`
  gap: 8px;
  width: 70%;
`;

const DetailRow = styled(Row)`
  justify-content: space-between;
  gap: 8px;

  > div {
    width: 50%;
  }
`;

const Separator = styled.p`
  margin: 12px 0px;
  border-bottom: 1px solid rgb(232, 234, 237);
`;

const ActionsRow = styled(Row)`
  width: 100%;
  gap: 12px;
`;

const CharactersRow = styled(Row)`
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
`;

const CustomLink = styled(Link)`
  color: black;
`;

export {
  Row,
  Column,
  AppContainer,
  Container,
  LoaderContainer,
  HeaderContainer,
  BodyContainer,
  DetailsContainer,
  CustomContainer,
  GeneralContainer,
  Separator,
  DetailRow,
  ActionsRow,
  CharactersRow,
  CustomLink,
};
