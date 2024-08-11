import { render } from "utils/testing";
import PlanetsList from "./PlanetsList";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor, within } from "@testing-library/react";

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

    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();

    expect(screen.getByText(/desert/i)).toBeInTheDocument();

    expect(screen.getByText("200,000")).toBeInTheDocument();

    expect(screen.getByText(/arid/i)).toBeInTheDocument();

    expect(screen.getByText(/1 standard/i)).toBeInTheDocument();
  });

  it("should render the CharactersList component with appropriate buttons", async () => {
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
});
