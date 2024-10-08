import { screen, waitFor, within } from "@testing-library/react";
import CharactersList from "./CharactersList";
import { MemoryRouter } from "react-router-dom";
import { render } from "utils/testing";
import { server } from "../../../mocks/server";
import {
  getCharactersEmpty,
  getCharactersError,
  getPlanetByIdError,
} from "services/hooks/starwars/mockHandlers";

const renderCharacterList = () => {
  return render(<CharactersList />, { wrapper: MemoryRouter });
};

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Characters List", () => {
  it("should render the CharactersList component with correct title in header", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /characters/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the CharactersList component with loader", () => {
    renderCharacterList();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the CharactersList component with correct subtitle in header", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/page 1 of 1/i)).toBeInTheDocument();

    expect(
      screen.getByText(/showing 1 - 1 of 1 characters/i)
    ).toBeInTheDocument();
  });

  it("should render the CharactersList component with correct character data", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();

    expect(screen.getByText(/male/i)).toBeInTheDocument();

    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /view luke skywalker/i })
    ).toBeInTheDocument();
  });

  it("should render the CharactersList component with appropriate buttons", async () => {
    renderCharacterList();

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

  it("should render the CharactersList component with appropriate view buttons", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const listView = screen.getByRole("button", { name: /list view/i });
    const tableView = screen.getByRole("button", { name: /table view/i });

    expect(listView).toBeInTheDocument();
    expect(tableView).toBeInTheDocument();

    const listIcon = within(listView).getByRole("img", {
      hidden: true,
    });

    const tableIcon = within(tableView).getByRole("img", {
      hidden: true,
    });

    expect(listIcon).toHaveAttribute("data-icon", "list");

    expect(tableIcon).toHaveAttribute("data-icon", "table-cells");
  });

  it("should render the CharacterList component in List View by default", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("characters-list")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("should render the CharacterList component in Table View on clicking Table View button", async () => {
    const { user } = renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const tableView = screen.getByRole("button", { name: /table view/i });

    await user.click(tableView);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByTestId("characters-list")).not.toBeInTheDocument();
  });

  it("should render the CharacterList component in List View on clicking Table View button and switching back", async () => {
    const { user } = renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const tableView = screen.getByRole("button", { name: /table view/i });

    await user.click(tableView);

    const listView = screen.getByRole("button", { name: /list view/i });

    await user.click(listView);

    expect(screen.getByTestId("characters-list")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("should trigger navigation to character details page on clicking view button", async () => {
    const { user } = renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const viewButton = screen.getByRole("button", {
      name: /view luke skywalker/i,
    });

    await user.click(viewButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/1");
  });

  it("should render the CharacterList component with Error message when fetching characters", async () => {
    server.use(getCharactersError);

    renderCharacterList();

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

  it("should render the CharacterList component with Error message when fetching planets", async () => {
    server.use(getPlanetByIdError);

    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText("Oops! There was an error fetching the data.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please try again later. Thank you for your patience.")
    ).toBeInTheDocument();
  });

  it("should render the CharacterList component with filtered results on search", async () => {
    const { user } = renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search by name...");

    await user.type(searchInput, "luke");

    const lukeSkywalker = await screen.findByText(/luke skywalker/i);

    expect(lukeSkywalker).toBeInTheDocument();
  });

  it("should render the CharacterList component with no results on search", async () => {
    server.use(getCharactersEmpty);

    const { user } = renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search by name...");

    await user.type(searchInput, "anakin");

    const noResults = await screen.findByText("No characters found");

    expect(noResults).toBeInTheDocument();

    expect(screen.getByText(/please refine your query/i)).toBeInTheDocument();
  });
});
