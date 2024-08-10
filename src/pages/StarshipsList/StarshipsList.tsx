import { faRocket } from "@fortawesome/free-solid-svg-icons";
import Header from "components/Header/Header";
import { HeaderContainer, Container } from "styles";

function StarshipsList() {
  return (
    <Container>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title="Starships"
          icon={faRocket}
          subtitle={"0 Starships Found"}
        />
      </HeaderContainer>
    </Container>
  );
}

export default StarshipsList;
