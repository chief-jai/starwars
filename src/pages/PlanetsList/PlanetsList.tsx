import {
  faArrowLeft,
  faArrowRight,
  faEarthEurope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Header from "components/Header/Header";
import InfoMessage from "components/shared/InfoMessage/InfoMessage";
import { ChangeEvent, useRef, useState } from "react";
import { useGetPlanets } from "services/hooks/starwars/starwars";
import {
  HeaderContainer,
  Container,
  LoaderAndErrorContainer,
  BodyContainer,
  ActionsRow,
} from "styles";
import { capitalizeFirstCharacter } from "utils/helpers";

/**
 * The PlanetsList component displays a list of planets in a table view
 *
 * @component
 * @example
 * ```tsx
 * <PlanetsList />
 * ```
 *
 * @return A React component that represents a list of planets
 */
function PlanetsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const { data: planetsData, isError: isPlanetsError } = useGetPlanets(
    currentPage.toString(),
    debouncedSearchValue.trim()
  );

  const isFirstPage = !planetsData?.previous;
  const isLastPage = !planetsData?.next;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearchValue(event.target.value);
      setCurrentPage(1);
    }, 500);
  };

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
  const description = planetsData?.count
    ? `Showing ${startIndex} - ${endIndex} of ${planetsData.count} planets`
    : undefined;
  const subtitle = planetsData?.count
    ? `Page ${currentPage} of ${Math.ceil(planetsData.count / 10)}`
    : undefined;

  if (isPlanetsError) {
    return (
      <InfoMessage
        id="planetsListError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!planetsData) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
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
            subtitle={subtitle}
            description={description}
            buttons={buttons}
          />
        </HeaderContainer>

        <BodyContainer>
          <ActionsRow>
            <Input
              placeholder="Search by name..."
              value={searchValue}
              onChange={handleChange}
              startDecorator={<FontAwesomeIcon icon={faSearch} />}
              sx={{ width: "320px" }}
            />
          </ActionsRow>

          {!planetsData.results.length && (
            <InfoMessage
              id="planetsListEmpty"
              icon={faSearch}
              primaryMessage="No planets found"
              secondaryMessage="Please refine your query"
            />
          )}

          {!!planetsData.results.length && (
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
          )}
        </BodyContainer>
      </Container>
    )
  );
}

export default PlanetsList;
