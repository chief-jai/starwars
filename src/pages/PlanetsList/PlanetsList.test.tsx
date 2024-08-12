import { render } from "utils/testing";
import PlanetsList from "./PlanetsList";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor, within } from "@testing-library/react";
import { server } from "../../../mocks/server";
import {
  getPlanetsEmpty,
  getPlanetsError,
} from "services/hooks/starwars/mockHandlers";

const renderPlanetsList = () => {
  return render(<PlanetsList />, { wrapper: MemoryRouter });
};

describe("Planets List", () => {
  it("should render the PlanetsList component with correct title in header", async () => {
    renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /planets/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the PlanetsList component with loader", () => {
    renderPlanetsList();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the PlanetsList component with correct subtitle in header", async () => {
    renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/page 1 of 1/i)).toBeInTheDocument();

    expect(screen.getByText(/showing 1 - 1 of 1 planets/i)).toBeInTheDocument();
  });

  it("should render the PlanetsList component with table view", async () => {
    renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should render the PlanetsList component with correct planet data", async () => {
    renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/name/i)).toBeInTheDocument();

    expect(screen.getByText(/terrain/i)).toBeInTheDocument();

    expect(screen.getByText(/population/i)).toBeInTheDocument();

    expect(screen.getByText(/climate/i)).toBeInTheDocument();

    expect(screen.getByText(/gravity/i)).toBeInTheDocument();

    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();

    expect(screen.getByText(/desert/i)).toBeInTheDocument();

    expect(screen.getByText("200,000")).toBeInTheDocument();

    expect(screen.getByText(/arid/i)).toBeInTheDocument();

    expect(screen.getByText(/1 standard/i)).toBeInTheDocument();
  });

  it("should render the PlanetsList component with appropriate buttons", async () => {
    renderPlanetsList();

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

  it("should render the PlanetsList component with Error message when fetching planets", async () => {
    server.use(getPlanetsError);

    renderPlanetsList();

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
    const { user } = renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search by name...");

    await user.type(searchInput, "tatooine");

    const planet = await screen.findByText(/tatooine/i);

    expect(planet).toBeInTheDocument();
  });

  it("should render the PlanetsList component with no results on search", async () => {
    server.use(getPlanetsEmpty);

    const { user } = renderPlanetsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search by name...");

    await user.type(searchInput, "test");

    const noResults = await screen.findByText("No planets found");

    expect(noResults).toBeInTheDocument();

    expect(screen.getByText(/please refine your query/i)).toBeInTheDocument();
  });
});
