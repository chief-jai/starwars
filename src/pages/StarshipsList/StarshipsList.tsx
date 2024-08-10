import { faRocket } from "@fortawesome/free-solid-svg-icons";
import Header from "components/Header/Header";
import { HeaderContainer, StarshipContainer } from "./styles";

function StarshipsList() {
  return (
    <StarshipContainer>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title="Starships"
          icon={faRocket}
          subtitle={"0 Starships Found"}
        />
      </HeaderContainer>
    </StarshipContainer>
  );
}

export default StarshipsList;
