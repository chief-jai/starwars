import Header from "components/Header/Header";
import { useEffect, useState } from "react";
import {
  useGetCharacters,
  useGetPlanets,
} from "services/hooks/starwars/starwars";
import { CardContainer, CharacterContainer, HeaderContainer } from "./styles";
import {
  faArrowLeft,
  faArrowRight,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import {
  capitalizeFirstCharacter,
  getCharacterId,
  getCharacterImageUrl,
} from "./helpers";
import Button from "@mui/joy/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/joy/Typography";
import { CardContent } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function CharactersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [planetUrls, setPlanetUrls] = useState<string[]>([]);
  const {
    data: characterData,
    isSuccess: isCharactersSuccess,
    isLoading: isCharactersLoading,
  } = useGetCharacters(currentPage.toString());
  const {
    data: planetData,
    isSuccess: isPlanetsSuccess,
    isLoading: isPlanetsLoading,
  } = useGetPlanets(planetUrls);

  const navigate = useNavigate();

  const isLoading = isCharactersLoading || isPlanetsLoading;
  const isSuccess = isCharactersSuccess && isPlanetsSuccess;

  const isFirstPage = !characterData?.previous;
  const isLastPage = !characterData?.next;

  console.log(planetData, isPlanetsLoading, isPlanetsLoading);

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
  const description = `Showing ${startIndex} - ${endIndex} of ${characterData?.count} characters`;

  const getPlanet = (url: string) => {
    return planetData?.find((planet) => planet.url === url);
  };

  console.log(characterData, isLoading, isSuccess);

  return (
    <CharacterContainer>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title="Characters"
          icon={faUsers}
          subtitle={
            !isLoading && characterData
              ? `Page ${currentPage} of ${Math.ceil(characterData?.count / 10)}`
              : undefined
          }
          description={!isLoading ? description : undefined}
          buttons={buttons}
        />
      </HeaderContainer>

      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <CardContainer>
          {characterData.results.map((character) => (
            <PreviewCard
              key={character.name}
              src={getCharacterImageUrl(character.url)}
              content={
                <CardContent orientation="horizontal">
                  <div>
                    <Typography level="title-lg">{character.name}</Typography>
                    <Typography level="body-md">
                      {capitalizeFirstCharacter(character.gender)}
                      <span>
                        &nbsp; | &nbsp;
                        <FontAwesomeIcon icon={faLocationDot} />
                        &nbsp;
                        {getPlanet(character.homeworld)?.name}
                      </span>
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    size="md"
                    color="primary"
                    aria-label={`View ${character.name}`}
                    sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                    onClick={() =>
                      navigate(`/${getCharacterId(character.url)}`)
                    }
                  >
                    View Details
                  </Button>
                </CardContent>
              }
            />
          ))}
        </CardContainer>
      )}
    </CharacterContainer>
  );
}

export default CharactersList;
