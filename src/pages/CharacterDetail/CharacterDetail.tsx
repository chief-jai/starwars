import {
  faCalendar,
  faFilm,
  faIdBadge,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Header from "components/Header/Header";
import {
  capitalizeFirstCharacter,
  getFilmImageUrl,
} from "./../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCharacterById,
  useGetFilms,
  useGetPlanetById,
} from "services/hooks/starwars/starwars";
import {
  BodyContainer,
  Container,
  CustomContainer,
  DetailRow,
  DetailsContainer,
  GeneralContainer,
  HeaderContainer,
  LoaderAndErrorContainer,
  Separator,
} from "styles";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import CircularProgress from "@mui/joy/CircularProgress";
import InfoMessage from "components/shared/InfoMessage/InfoMessage";

/**
 * The CharacterDetail component displays the details of a character
 *
 * @component
 * @example
 * ```tsx
 * <CharacterDetail />
 * ```
 *
 * @return A React component that represents the details of a character
 */
function CharacterDetail() {
  const { characterId } = useParams();
  const navigate = useNavigate();

  const { data: characterData, isError: isCharacterError } =
    useGetCharacterById(characterId || "", !!characterId);

  const { data: planetData, isError: isPlanetError } = useGetPlanetById(
    characterData?.homeworld || "",
    !!characterData?.homeworld
  );

  const { data: filmData, isError: isFilmError } = useGetFilms();

  const getFilmContent = (filmUrl: string) => {
    const film = filmData?.results.find((filmData) => filmData.url === filmUrl);

    if (!film) {
      return undefined;
    }

    return (
      <CardContent orientation="horizontal">
        <div>
          <Typography level="title-md">{film.title}</Typography>
          <Typography level="body-sm">
            <FontAwesomeIcon icon={faUser} />
            &nbsp;
            {capitalizeFirstCharacter(film.director)}
          </Typography>
          <Typography level="body-sm">
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp;
            {film.release_date}
          </Typography>
        </div>
      </CardContent>
    );
  };

  console.log(isCharacterError, isPlanetError, isFilmError);

  if (isCharacterError || isPlanetError || isFilmError) {
    return (
      <InfoMessage
        id="characterDetailError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!characterData || !planetData || !filmData) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <Header
          id="characterHeader"
          title={characterData.name}
          icon={faUsers}
          onBack={() => navigate("/")}
        />
      </HeaderContainer>

      <CustomContainer>
        <DetailsContainer>
          <Card variant="outlined" sx={{ padding: "24px" }}>
            <CardContent>
              <Typography level="h3">
                <span>
                  <FontAwesomeIcon icon={faIdBadge} /> &nbsp; General Details
                </span>
              </Typography>

              <Separator />

              <Typography level="title-lg">Home World</Typography>
              <Typography>
                {capitalizeFirstCharacter(planetData.name || "N/A")}
              </Typography>

              <Separator />

              <Typography level="title-lg">Hair Color</Typography>
              <Typography>
                {capitalizeFirstCharacter(characterData.hair_color)}
              </Typography>

              <Separator />

              <Typography level="title-lg">Eye Color</Typography>
              <Typography>
                {capitalizeFirstCharacter(characterData.eye_color)}
              </Typography>

              <Separator />

              <Typography level="title-lg">Gender</Typography>
              <Typography>
                {capitalizeFirstCharacter(characterData.gender)}
              </Typography>

              <Separator />

              <Typography level="title-lg">Birth Year</Typography>
              <Typography>{characterData.birth_year}</Typography>

              <Separator />

              <DetailRow>
                <div>
                  <Typography level="title-lg">Height</Typography>
                  <Typography>{characterData.height} cm</Typography>
                </div>

                <div>
                  <Typography level="title-lg">Mass</Typography>
                  <Typography>{characterData.mass} kg</Typography>
                </div>
              </DetailRow>

              <Separator />
            </CardContent>
          </Card>
        </DetailsContainer>

        <GeneralContainer>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "24px",
            }}
          >
            <CardContent>
              <Typography level="h3">
                <span>
                  <FontAwesomeIcon icon={faFilm} /> &nbsp; Film Details
                </span>
              </Typography>

              <Separator />

              <BodyContainer>
                {characterData.films.map((film) => {
                  return (
                    <PreviewCard
                      key={film}
                      src={getFilmImageUrl(film)}
                      content={getFilmContent(film)}
                    />
                  );
                })}
              </BodyContainer>
            </CardContent>
          </Card>
        </GeneralContainer>
      </CustomContainer>
    </Container>
  );
}

export default CharacterDetail;
