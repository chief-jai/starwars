import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import Header from "components/Header/Header";
import { HeaderContainer, PlanetsContainer } from "./styles";

function PlanetsList() {
  return (
    <PlanetsContainer>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title="Planets"
          icon={faEarthEurope}
          subtitle={"0 Planets Found"}
        />
      </HeaderContainer>
    </PlanetsContainer>
  );
}

export default PlanetsList;
