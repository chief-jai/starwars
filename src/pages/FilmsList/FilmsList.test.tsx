import { screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { render } from "utils/testing";
import FilmsList from "./FilmsList";

const renderFilmsList = () => {
  return render(<FilmsList />, { wrapper: MemoryRouter });
};

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Films List", () => {
  it("should render the FilmsList component with correct title in header", async () => {
    renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(
      await screen.getByRole("heading", {
        name: /films/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render the FilmsList component with loader", () => {
    renderFilmsList();

    expect(screen.getByTestId("loadingAnimation")).toBeInTheDocument();
  });

  it("should render the FilmsList component with correct subtitle in header", async () => {
    renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/page 1/i)).toBeInTheDocument();

    expect(screen.getByText(/showing 1 - 1 of 1 films/i)).toBeInTheDocument();
  });

  it("should render the FilmsList component with correct film data", async () => {
    renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/a new hope/i)).toBeInTheDocument();

    expect(screen.getByText(/george lucas/i)).toBeInTheDocument();

    expect(screen.getByText("1977-05-25")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /view a new hope/i })
    ).toBeInTheDocument();
  });

  it("should render the FilmsList component with appropriate view buttons", async () => {
    renderFilmsList();

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
    renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("films-list")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("should render the CharacterList component in Table View on clicking Table View button", async () => {
    const { user } = renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const tableView = screen.getByRole("button", { name: /table view/i });

    await user.click(tableView);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByTestId("films-list")).not.toBeInTheDocument();
  });

  it("should render the FilmsList component in List View on clicking Table View button and switching back", async () => {
    const { user } = renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const tableView = screen.getByRole("button", { name: /table view/i });

    await user.click(tableView);

    const listView = screen.getByRole("button", { name: /list view/i });

    await user.click(listView);

    expect(screen.getByTestId("films-list")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("should trigger navigation to film details page on clicking view button", async () => {
    const { user } = renderFilmsList();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingAnimation")).not.toBeInTheDocument();
    });

    const viewButton = screen.getByRole("button", {
      name: /view a new hope/i,
    });

    await user.click(viewButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/films/1");
  });
});
