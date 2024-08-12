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
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import Header from "components/Header/Header";
import InfoMessage from "components/shared/InfoMessage/InfoMessage";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCharactersInParallel,
  useGetFilmById,
} from "services/hooks/starwars/starwars";
import {
  BodyContainer,
  Container,
  CustomContainer,
  DetailsContainer,
  GeneralContainer,
  HeaderContainer,
  LoaderAndErrorContainer,
  Separator,
} from "styles";
import {
  capitalizeFirstCharacter,
  getCharacterImageUrl,
  getId,
} from "utils/helpers";

/**
 * The FilmDetail component displays the details of a film with its characters
 *
 * @component
 * @example
 * ```tsx
 * <FilmDetail />
 * ```
 *
 * @return A React component that represents the details of a film
 */
function FilmDetail() {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const [characterUrls, setCharacterUrls] = useState<string[]>([]);

  const {
    data: filmData,
    isSuccess: isFilmsSuccess,
    isError: isFilmsError,
  } = useGetFilmById(filmId || "", !!filmId);
  const { data: characterData, isError: isCharactersError } =
    useGetCharactersInParallel(characterUrls);

  useEffect(() => {
    if (isFilmsSuccess) {
      const uniqueCharacterUrls = [
        ...new Set(
          filmData.characters.map((character) => getId(character, "people"))
        ),
      ];

      setCharacterUrls(uniqueCharacterUrls);
    }
  }, [isFilmsSuccess, filmData]);

  if (isCharactersError || isFilmsError) {
    return (
      <InfoMessage
        id="filmDetailError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!filmData || !characterData.length) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
    );
  }

  return (
    filmData &&
    characterData && (
      <Container>
        <HeaderContainer>
          <Header
            id="filmHeader"
            title={filmData.title}
            icon={faFilm}
            onBack={() => navigate("/films")}
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

                <Typography level="title-lg">Director</Typography>
                <Typography>
                  {capitalizeFirstCharacter(filmData.director)}
                </Typography>

                <Separator />

                <Typography level="title-lg">Release Date</Typography>
                <Typography>{filmData.release_date}</Typography>

                <Separator />

                <Typography level="title-lg">Producer</Typography>
                <Typography>
                  {capitalizeFirstCharacter(filmData.producer)}
                </Typography>

                <Separator />

                <Typography level="title-lg">Episode</Typography>
                <Typography>{filmData.episode_id}</Typography>

                <Separator />

                <Typography level="title-lg">Opening Crawl</Typography>
                <Typography>{filmData.opening_crawl}</Typography>

                <Separator />
              </CardContent>
            </Card>
          </DetailsContainer>

          <GeneralContainer>
            <Card
              variant="outlined"
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
                    <FontAwesomeIcon icon={faUsers} /> &nbsp; Characters from
                    &nbsp;
                    <i>{filmData.title}</i>
                  </span>
                </Typography>

                <Separator />

                <BodyContainer>
                  {characterData.map((character) => {
                    return (
                      <PreviewCard
                        key={character.name}
                        src={getCharacterImageUrl(character.url)}
                        content={
                          <CardContent orientation="horizontal">
                            <div>
                              <Typography level="title-md">
                                {character.name}
                              </Typography>
                              <Typography level="body-sm">
                                <FontAwesomeIcon icon={faUser} />
                                &nbsp;
                                {capitalizeFirstCharacter(character.gender)}
                              </Typography>
                              <Typography level="body-sm">
                                <FontAwesomeIcon icon={faCalendar} />
                                &nbsp;
                                {character.birth_year}
                              </Typography>
                            </div>
                          </CardContent>
                        }
                      />
                    );
                  })}
                </BodyContainer>
              </CardContent>
            </Card>
          </GeneralContainer>
        </CustomContainer>
      </Container>
    )
  );
}

export default FilmDetail;
