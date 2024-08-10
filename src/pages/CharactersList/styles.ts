import styled from "styled-components";

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 32px 40px;
  border-bottom: 1px solid #e8eaed;
  position: sticky;
  z-index: 1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 36px 12px;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 30px;
`;

export { CharacterContainer, HeaderContainer, CardContainer };
