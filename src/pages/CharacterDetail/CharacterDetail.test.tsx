import { screen, waitFor } from "@testing-library/react";
import CharacterDetail from "./CharacterDetail";
import { MemoryRouter } from "react-router-dom";
import { render } from "utils/testing";

const renderCharacterDetail = () => {
  return render(<CharacterDetail />, { wrapper: MemoryRouter });
};

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ characterId: "1" }),
  useNavigate: () => mockedNavigate,
}));

describe("Character Detail", () => {
  it("should render the CharacterDetail component with correct title in header", async () => {
    renderCharacterDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /luke skywalker/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the CharacterDetail component with loading text", () => {
    renderCharacterDetail();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the CharacterDetail component with back button in header", async () => {
    renderCharacterDetail();

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
    const { user } = renderCharacterDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", {
      name: /back/i,
    });

    await user.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("should render the CharacterDetail component with correct character data", async () => {
    renderCharacterDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/general details/i)).toBeInTheDocument();

    expect(screen.getByText(/home world/i)).toBeInTheDocument();

    expect(screen.getByText(/hair color/i)).toBeInTheDocument();

    expect(screen.getByText(/eye color/i)).toBeInTheDocument();

    expect(screen.getByText(/gender/i)).toBeInTheDocument();

    expect(screen.getByText(/birth year/i)).toBeInTheDocument();

    expect(screen.getByText(/height/i)).toBeInTheDocument();

    expect(screen.getByText(/mass/i)).toBeInTheDocument();

    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();

    expect(screen.getByText(/blond/i)).toBeInTheDocument();

    expect(screen.getByText(/blue/i)).toBeInTheDocument();

    expect(screen.getByText(/male/i)).toBeInTheDocument();

    expect(screen.getByText(/19bby/i)).toBeInTheDocument();

    expect(screen.getByText(/172 cm/i)).toBeInTheDocument();

    expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
  });

  it("should render the CharacterDetail component with correct film data", async () => {
    renderCharacterDetail();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/film details/i)).toBeInTheDocument();

    expect(screen.getByText(/a new hope/i)).toBeInTheDocument();

    expect(screen.getByText(/george lucas/i)).toBeInTheDocument();

    expect(screen.getByText("1977-05-25")).toBeInTheDocument();
  });
});
