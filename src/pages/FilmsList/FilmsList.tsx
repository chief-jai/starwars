import {
  faCalendar,
  faFilm,
  faList,
  faSearch,
  faTableCells,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Header from "components/Header/Header";
import InfoMessage from "components/shared/InfoMessage/InfoMessage";
import PreviewCard from "components/shared/PreviewCard/PreviewCard";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFilms } from "services/hooks/starwars/starwars";
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
  capitalizeFirstCharacter,
  getFilmImageUrl,
  getId,
} from "utils/helpers";

/**
 * The FilmsList component displays a list of films in a list or table view
 *
 * @component
 * @example
 * ```tsx
 * <FilmsList />
 * ```
 *
 * @return A React component that represents a list of films
 */
function FilmsList() {
  const [isListView, setIsListView] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { data: filmsData, isError: isFilmsError } = useGetFilms();
  const description = `Showing 1 - ${filmsData?.count} of ${filmsData?.count} films`;

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (isFilmsError) {
    return (
      <InfoMessage
        id="filmsListError"
        secondaryMessage="Please try again later. Thank you for your patience."
      />
    );
  }

  if (!filmsData) {
    return (
      <LoaderAndErrorContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderAndErrorContainer>
    );
  }

  const filteredFilms = filmsData.results.filter(
    (film) => film.title.toLowerCase().indexOf(searchValue) !== -1
  );

  return (
    filteredFilms && (
      <Container>
        <HeaderContainer>
          <Header
            id="filmsHeader"
            title="Films"
            icon={faFilm}
            description={description}
            subtitle={`Page 1`}
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

          {!filteredFilms.length && (
            <InfoMessage
              id="filmsListEmpty"
              icon={faSearch}
              primaryMessage="No films found"
              secondaryMessage="Please refine your query"
            />
          )}

          {isListView && (
            <CharactersRow data-testid="films-list">
              {filteredFilms.map((film) => (
                <PreviewCard
                  key={film.title}
                  src={getFilmImageUrl(film.url)}
                  content={
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
                      <Button
                        variant="outlined"
                        size="md"
                        color="primary"
                        aria-label={`View ${film.title}`}
                        sx={{
                          ml: "auto",
                          alignSelf: "center",
                          fontWeight: 600,
                        }}
                        onClick={() =>
                          navigate(`/films/${getId(film.url, "films")}`)
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

          {!isListView && (
            <Table size="lg" borderAxis="both">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Title</th>
                  <th>Director</th>
                  <th>Release Date</th>
                  <th>Producer</th>
                  <th>Episode #</th>
                </tr>
              </thead>
              <tbody>
                {filmsData.results.map((film) => (
                  <tr key={film.title}>
                    <td>
                      <CustomLink to={`/films/${getId(film.url, "films")}`}>
                        {film.title}
                      </CustomLink>
                    </td>
                    <td>{capitalizeFirstCharacter(film.director)}</td>
                    <td>{film.release_date}</td>
                    <td>{capitalizeFirstCharacter(film.producer)}</td>
                    <td>{film.episode_id}</td>
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

export default FilmsList;
