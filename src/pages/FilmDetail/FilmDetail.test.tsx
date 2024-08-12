import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { render } from "utils/testing";
import FilmDetail from "./FilmDetail";
import { server } from "../../../mocks/server";
import {
  getCharacterByIdError,
  getFilmByIdError,
} from "services/hooks/starwars/mockHandlers";

const renderFilmDetail = () => {
  return render(<FilmDetail />, { wrapper: MemoryRouter });
};

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ filmId: "1" }),
  useNavigate: () => mockedNavigate,
}));

describe("Film Detail", () => {
  it("should render the FilmDetail component with correct title in header", async () => {
    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /a new hope/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the FilmDetail component with loading text", () => {
    renderFilmDetail();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the FilmDetail component with back button in header", async () => {
    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", {
        name: /back/i,
      })
    ).toBeInTheDocument();
  });

  it("should trigger navigate when back button is clicked", async () => {
    const { user } = renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", {
      name: /back/i,
    });

    await user.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/films");
  });

  it("should render the FilmDetail component with correct character data", async () => {
    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/general details/i)).toBeInTheDocument();

    expect(screen.getByText(/director/i)).toBeInTheDocument();

    expect(screen.getByText(/release date/i)).toBeInTheDocument();

    expect(screen.getByText(/producer/i)).toBeInTheDocument();

    expect(screen.getByText(/episode/i)).toBeInTheDocument();

    expect(screen.getByText(/opening crawl/i)).toBeInTheDocument();

    expect(screen.getByText(/george lucas/i)).toBeInTheDocument();

    expect(screen.getByText("1977-05-25")).toBeInTheDocument();

    expect(screen.getByText(/gary kurtz, rick mccallum/i)).toBeInTheDocument();

    expect(screen.getByText(/4/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...."
      )
    ).toBeInTheDocument();
  });

  it("should render the FilmDetail component with correct film data", async () => {
    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/characters from/i)).toBeInTheDocument();
  });

  it("should render the FilmDetail component with Error message when fetching characters", async () => {
    server.use(getCharacterByIdError);

    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      screen.getByText("Oops! There was an error fetching the data.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please try again later. Thank you for your patience.")
    ).toBeInTheDocument();
  });

  it("should render the FilmDetail component with Error message when fetching films", async () => {
    server.use(getFilmByIdError);

    renderFilmDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      screen.getByText("Oops! There was an error fetching the data.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please try again later. Thank you for your patience.")
    ).toBeInTheDocument();
  });
});
