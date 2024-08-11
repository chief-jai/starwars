import {
  faArrowLeft,
  faArrowRight,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Table from "@mui/joy/Table";
import Header from "components/Header/Header";
import { useState } from "react";
import { useGetStarships } from "services/hooks/starwars/starwars";
import {
  HeaderContainer,
  Container,
  LoaderContainer,
  BodyContainer,
} from "styles";
import { capitalizeFirstCharacter } from "utils/helpers";

function StarshipsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: starshipsData } = useGetStarships(currentPage.toString());

  const isFirstPage = !starshipsData?.previous;
  const isLastPage = !starshipsData?.next;

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
  const description = `Showing ${startIndex} - ${endIndex} of ${starshipsData?.count} starships`;

  if (!starshipsData || !starshipsData.results.length) {
    return (
      <LoaderContainer>
        <CircularProgress data-testid="loadingAnimation" size="md" />
      </LoaderContainer>
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
            subtitle={`Page ${currentPage} of ${Math.ceil(
              starshipsData.count / 10
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
        </BodyContainer>
      </Container>
    )
  );
}

export default StarshipsList;
