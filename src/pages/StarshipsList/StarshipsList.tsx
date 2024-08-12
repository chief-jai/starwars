import {
  faArrowLeft,
  faArrowRight,
  faRocket,
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
import { useGetStarships } from "services/hooks/starwars/starwars";
import {
  HeaderContainer,
  Container,
  LoaderAndErrorContainer,
  BodyContainer,
  ActionsRow,
} from "styles";
import { capitalizeFirstCharacter } from "utils/helpers";

/**
 * The StarshipsList component displays a list of starships in a table view
 *
 * @component
 * @example
 * ```tsx
 * <StarshipsList />
 * ```
 *
 * @return A React component that represents a list of starships
 */
function StarshipsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const { data: starshipsData, isError: isStarshipsError } = useGetStarships(
    currentPage.toString(),
    debouncedSearchValue.trim()
  );

  const isFirstPage = !starshipsData?.previous;
  const isLastPage = !starshipsData?.next;

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
    starshipsData && starshipsData.count > 10
      ? currentPage * 10
      : starshipsData?.count;
  const description = starshipsData?.count
    ? `Showing ${startIndex} - ${endIndex} of ${starshipsData.count} starships`
    : undefined;
  const subtitle = starshipsData?.count
    ? `Page ${currentPage} of ${Math.ceil(starshipsData.count / 10)}`
    : undefined;

  if (isStarshipsError) {
    return (
      <InfoMessage
        id="starshipsListError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!starshipsData) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
    );
  }

  return (
    starshipsData && (
      <Container>
        <HeaderContainer>
          <Header
            id="starshipsHeader"
            title="Starships"
            icon={faRocket}
            subtitle={subtitle}
            description={description}
            buttons={buttons}
          />
        </HeaderContainer>

        <BodyContainer>
          <ActionsRow>
            <Input
              placeholder="Search by name or model..."
              value={searchValue}
              onChange={handleChange}
              startDecorator={<FontAwesomeIcon icon={faSearch} />}
              sx={{ width: "320px" }}
            />
          </ActionsRow>

          {!starshipsData.results.length && (
            <InfoMessage
              id="starshipsListEmpty"
              icon={faSearch}
              primaryMessage="No starships found"
              secondaryMessage="Please refine your query"
            />
          )}

          {!!starshipsData.results.length && (
            <Table size="lg" borderAxis="both">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Starship Class</th>
                  <th>Cost In Credits</th>
                  <th>Max Atmosphering Speed</th>
                  <th>Hyperdrive Rating</th>
                </tr>
              </thead>
              <tbody>
                {starshipsData.results.map((starship) => (
                  <tr key={starship.name}>
                    <td>{capitalizeFirstCharacter(starship.name)}</td>
                    <td>{capitalizeFirstCharacter(starship.model)}</td>
                    <td>{capitalizeFirstCharacter(starship.starship_class)}</td>
                    <td>
                      {!isNaN(parseInt(starship.cost_in_credits))
                        ? parseInt(starship.cost_in_credits).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      {!isNaN(parseInt(starship.max_atmosphering_speed))
                        ? parseInt(
                            starship.max_atmosphering_speed
                          ).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      {capitalizeFirstCharacter(starship.hyperdrive_rating)}
                    </td>
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

export default StarshipsList;
