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
  DetailsContainer,
  GeneralContainer,
  HeaderContainer,
  LoaderContainer,
  Row,
  Separator,
} from "styles";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import { CustomContainer } from "./styles";
import CircularProgress from "@mui/joy/CircularProgress";

function CharacterDetail() {
  const { characterId } = useParams();
  const navigate = useNavigate();

  const { data: characterData } = useGetCharacterById(
    characterId || "",
    !!characterId
  );

  const { data: planetData } = useGetPlanetById(
    characterData?.homeworld || "",
    !!characterData?.homeworld
  );

  const { data: filmData } = useGetFilms();

  const getFilmContent = (filmUrl: string) => {
    const film = filmData?.results.find((filmData) => filmData.url === filmUrl);

    if (!film) {
      return undefined;
    }

    return (
      <CardContent orientation="horizontal">
        <div>
          <Typography level="title-lg">{film.title}</Typography>
          <Typography level="body-md">
            <FontAwesomeIcon icon={faUser} />
            &nbsp;
            {capitalizeFirstCharacter(film.director)}
          </Typography>
          <Typography>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp;
            {film.release_date}
          </Typography>
        </div>
      </CardContent>
    );
  };

  if (!characterData || !planetData || !filmData) {
    return (
      <LoaderContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderContainer>
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

              <Row>
                <div>
                  <Typography level="title-lg">Height</Typography>
                  <Typography>{characterData.height} cm</Typography>
                </div>

                <div>
                  <Typography level="title-lg">Mass</Typography>
                  <Typography>{characterData.mass} kg</Typography>
                </div>
              </Row>

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
