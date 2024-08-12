import Header from "components/Header/Header";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  useGetCharacters,
  useGetPlanetsInParallel,
} from "services/hooks/starwars/starwars";
import {
  ActionsRow,
  BodyContainer,
  CharactersRow,
  Container,
  CustomLink,
  HeaderContainer,
  LoaderAndErrorContainer,
} from "styles";
import {
  faArrowLeft,
  faArrowRight,
  faList,
  faLocationDot,
  faSearch,
  faTableCells,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import {
  capitalizeFirstCharacter,
  getId,
  getCharacterImageUrl,
} from "../../utils/helpers";
import Button from "@mui/joy/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Table from "@mui/joy/Table";
import InfoMessage from "components/shared/InfoMessage/InfoMessage";
import Input from "@mui/joy/Input";

/**
 * The CharactersList component displays a list of characters in a list or table view
 *
 * @component
 * @example
 * ```tsx
 * <CharactersList />
 * ```
 *
 * @return A React component that represents a list of characters
 */
function CharactersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const [isListView, setIsListView] = useState(true);
  const [planetUrls, setPlanetUrls] = useState<string[]>([]);
  const {
    data: characterData,
    isSuccess: isCharactersSuccess,
    isError: isCharacterError,
  } = useGetCharacters(currentPage.toString(), debouncedSearchValue.trim());
  const { data: planetData, isError: isPlanetsError } =
    useGetPlanetsInParallel(planetUrls);

  const navigate = useNavigate();

  const isFirstPage = !characterData?.previous;
  const isLastPage = !characterData?.next;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearchValue(event.target.value);
      setCurrentPage(1);
    }, 500);
  };

  useEffect(() => {
    if (isCharactersSuccess) {
      const uniquePlanetUrls = [
        ...new Set(
          characterData.results.map((character) => character.homeworld)
        ),
      ];
      setPlanetUrls(uniquePlanetUrls);
    }
  }, [isCharactersSuccess, characterData]);

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
    characterData && characterData.count > 10
      ? currentPage * 10
      : characterData?.count;
  const description = characterData?.count
    ? `Showing ${startIndex} - ${endIndex} of ${characterData.count} characters`
    : undefined;
  const subtitle = characterData?.count
    ? `Page ${currentPage} of ${Math.ceil(characterData.count / 10)}`
    : undefined;

  const getPlanet = (url: string) => {
    return planetData?.find((planet) => planet.url === url);
  };

  if (isCharacterError || isPlanetsError) {
    return (
      <InfoMessage
        id="characterListError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!characterData && !planetData.length) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
    );
  }

  return (
    planetData &&
    characterData && (
      <Container>
        <HeaderContainer>
          <Header
            id="characterHeader"
            title="Characters"
            icon={faUsers}
            subtitle={subtitle}
            description={description}
            buttons={buttons}
          />
        </HeaderContainer>

        <BodyContainer>
          <ActionsRow>
            <ButtonGroup>
              <Button
                variant={isListView ? "solid" : "outlined"}
                startDecorator={<FontAwesomeIcon icon={faList} />}
                onClick={() => setIsListView(true)}
                color="primary"
              >
                List View
              </Button>

              <Button
                variant={!isListView ? "solid" : "outlined"}
                startDecorator={<FontAwesomeIcon icon={faTableCells} />}
                onClick={() => setIsListView(false)}
                color="primary"
              >
                Table View
              </Button>
            </ButtonGroup>

            <Input
              placeholder="Search by name..."
              value={searchValue}
              onChange={handleChange}
              startDecorator={<FontAwesomeIcon icon={faSearch} />}
              sx={{ width: "320px" }}
            />
          </ActionsRow>

          {!characterData.results.length && (
            <InfoMessage
              id="characterListEmpty"
              icon={faSearch}
              primaryMessage="No characters found"
              secondaryMessage="Please refine your query"
            />
          )}

          {isListView && !!characterData.results.length && (
            <CharactersRow data-testid="characters-list">
              {characterData.results.map((character) => (
                <PreviewCard
                  key={character.name}
                  src={getCharacterImageUrl(character.url)}
                  content={
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography noWrap level="title-lg">
                          {character.name}
                        </Typography>
                        <Typography level="body-md">
                          <FontAwesomeIcon icon={faUser} />
                          &nbsp;
                          {capitalizeFirstCharacter(character.gender)}
                        </Typography>
                        <Typography>
                          <FontAwesomeIcon icon={faLocationDot} />
                          &nbsp;
                          {getPlanet(character.homeworld)?.name}
                        </Typography>
                      </div>
                      <Button
                        variant="outlined"
                        size="md"
                        color="primary"
                        aria-label={`View ${character.name}`}
                        sx={{
                          ml: "auto",
                          alignSelf: "center",
                          fontWeight: 600,
                        }}
                        onClick={() =>
                          navigate(`/${getId(character.url, "people")}`)
                        }
                      >
                        View Details
                      </Button>
                    </CardContent>
                  }
                />
              ))}
            </CharactersRow>
          )}

          {!isListView && !!characterData.results.length && (
            <Table size="lg" borderAxis="both">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Name</th>
                  <th>Gender</th>
                  <th>Home World</th>
                  <th>Height&nbsp;(cm)</th>
                  <th>Mass&nbsp;(kg)</th>
                </tr>
              </thead>
              <tbody>
                {characterData.results.map((character) => (
                  <tr key={character.name}>
                    <td>
                      <CustomLink to={`/${getId(character.url, "people")}`}>
                        {character.name}
                      </CustomLink>
                    </td>
                    <td>{capitalizeFirstCharacter(character.gender)}</td>
                    <td>{getPlanet(character.homeworld)?.name}</td>
                    <td>{character.height}</td>
                    <td>{character.mass}</td>
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

export default CharactersList;
