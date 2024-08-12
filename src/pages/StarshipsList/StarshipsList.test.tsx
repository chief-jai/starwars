import { render } from "utils/testing";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor, within } from "@testing-library/react";
import StarshipsList from "./StarshipsList";
import {
  getStarshipsEmpty,
  getStarshipsError,
} from "services/hooks/starwars/mockHandlers";
import { server } from "../../../mocks/server";

const renderStarshipList = () => {
  return render(<StarshipsList />, { wrapper: MemoryRouter });
};

describe("Starship List", () => {
  it("should render the StarshipList component with correct title in header", async () => {
    renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /starship/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the StarshipList component with loader", () => {
    renderStarshipList();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the StarshipList component with correct subtitle in header", async () => {
    renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/page 1 of 1/i)).toBeInTheDocument();

    expect(
      screen.getByText(/showing 1 - 1 of 1 starships/i)
    ).toBeInTheDocument();
  });

  it("should render the StarshipList component with table view", async () => {
    renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should render the StarshipList component with correct planet data", async () => {
    renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/name/i)).toBeInTheDocument();

    expect(screen.getByText(/model/i)).toBeInTheDocument();

    expect(screen.getByText(/starship class/i)).toBeInTheDocument();

    expect(screen.getByText(/cost in credits/i)).toBeInTheDocument();

    expect(screen.getByText(/max atmosphering speed/i)).toBeInTheDocument();

    expect(screen.getByText(/hyperdrive rating/i)).toBeInTheDocument();

    expect(screen.getAllByText("CR90 corvette")).toHaveLength(2);

    expect(screen.getByText("Corvette")).toBeInTheDocument();

    expect(screen.getByText("3,500,000")).toBeInTheDocument();

    expect(screen.getByText("950")).toBeInTheDocument();

    expect(screen.getByText("2.0")).toBeInTheDocument();
  });

  it("should render the StarshipsList component with appropriate buttons", async () => {
    renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const previousButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    const arrowLeftIcon = within(previousButton).getByRole("img", {
      hidden: true,
    });

    const arrowRightIcon = within(nextButton).getByRole("img", {
      hidden: true,
    });

    expect(arrowLeftIcon).toHaveAttribute("data-icon", "arrow-left");

    expect(arrowRightIcon).toHaveAttribute("data-icon", "arrow-right");
  });

  it("should render the PlanetsList component with Error message when fetching starships", async () => {
    server.use(getStarshipsError);

    renderStarshipList();

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

  it("should render the PlanetsList component with filtered results on search", async () => {
    const { user } = renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search by name or model..."
    );

    await user.type(searchInput, "corvette");

    const starship = await screen.findAllByText("CR90 corvette");

    expect(starship).toHaveLength(2);
  });

  it("should render the PlanetsList component with no results on search", async () => {
    server.use(getStarshipsEmpty);

    const { user } = renderStarshipList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search by name or model..."
    );

    await user.type(searchInput, "test");

    const noResults = await screen.findByText("No starships found");

    expect(noResults).toBeInTheDocument();

    expect(screen.getByText(/please refine your query/i)).toBeInTheDocument();
  });
});
