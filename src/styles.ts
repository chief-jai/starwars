import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LoaderContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 32px 40px;
  border-bottom: 1px solid #e8eaed;
  position: sticky;
  z-index: 1;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 36px 12px;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 30px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 25%;
`;

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 70%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
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

export {
  AppContainer,
  Container,
  LoaderContainer,
  HeaderContainer,
  BodyContainer,
  DetailsContainer,
  GeneralContainer,
  Separator,
  Row,
};
