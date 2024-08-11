import {
  faArrowLeft,
  faArrowRight,
  faEarthEurope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Table from "@mui/joy/Table";
import Header from "components/Header/Header";
import { useState } from "react";
import { useGetPlanets } from "services/hooks/starwars/starwars";
import {
  HeaderContainer,
  Container,
  LoaderContainer,
  BodyContainer,
} from "styles";
import { capitalizeFirstCharacter } from "utils/helpers";

function PlanetsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: planetsData } = useGetPlanets(currentPage.toString());

  const isFirstPage = !planetsData?.previous;
  const isLastPage = !planetsData?.next;

  const buttons = [
    <Button
      size="sm"
      startDecorator={<FontAwesomeIcon icon={faArrowLeft} />}
      variant="outlined"
      key="previous"
      onClick={() => setCurrentPage((prev) => prev - 1)}
      disabled={isFirstPage}
    >
      Previous
    </Button>,
    <Button
      size="sm"
      endDecorator={<FontAwesomeIcon icon={faArrowRight} />}
      key="next"
      onClick={() => setCurrentPage((prev) => prev + 1)}
      disabled={isLastPage}
    >
      Next
    </Button>,
  ];

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex =
    planetsData && planetsData.count > 10
      ? currentPage * 10
      : planetsData?.count;
  const description = `Showing ${startIndex} - ${endIndex} of ${planetsData?.count} planets`;

  if (!planetsData || !planetsData.results.length) {
    return (
      <LoaderContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderContainer>
    );
  }

  return (
    planetsData && (
      <Container>
        <HeaderContainer>
          <Header
            id="planetHeader"
            title="Planets"
            icon={faEarthEurope}
            subtitle={`Page ${currentPage} of ${Math.ceil(
              planetsData.count / 10
            )}`}
            description={description}
            buttons={buttons}
          />
        </HeaderContainer>

        <BodyContainer>
          <Table size="lg" borderAxis="both">
            <thead>
              <tr>
                <th>Name</th>
                <th>Terrain</th>
                <th>Population</th>
                <th>Climate</th>
                <th>Gravity</th>
              </tr>
            </thead>
            <tbody>
              {planetsData.results.map((planet) => (
                <tr key={planet.name}>
                  <td>{planet.name}</td>
                  <td>{capitalizeFirstCharacter(planet.terrain)}</td>
                  <td>
                    {!isNaN(parseInt(planet.population))
                      ? parseInt(planet.population).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{capitalizeFirstCharacter(planet.climate)}</td>
                  <td>{capitalizeFirstCharacter(planet.gravity)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </BodyContainer>
      </Container>
    )
  );
}

export default PlanetsList;
