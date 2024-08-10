import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import Header from "components/Header/Header";
import { HeaderContainer, Container } from "styles";

function PlanetsList() {
  return (
    <Container>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title="Planets"
          icon={faEarthEurope}
          subtitle={"0 Planets Found"}
        />
      </HeaderContainer>
    </Container>
  );
}

export default PlanetsList;
