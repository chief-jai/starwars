import { render } from "utils/testing";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor, within } from "@testing-library/react";
import StarshipsList from "./StarshipsList";

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

    expect(screen.getAllByText("CR90 corvette")).toHaveLength(2);

    expect(screen.getByText("Corvette")).toBeInTheDocument();

    expect(screen.getByText("3,500,000")).toBeInTheDocument();

    expect(screen.getByText("950")).toBeInTheDocument();

    expect(screen.getByText("2.0")).toBeInTheDocument();
  });

  it("should render the CharactersList component with appropriate buttons", async () => {
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
});
