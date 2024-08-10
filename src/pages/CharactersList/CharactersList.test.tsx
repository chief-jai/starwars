import { render, screen, waitFor } from "@testing-library/react";
import CharactersList from "./CharactersList";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const renderCharacterList = () => {
  const queryClientOptions = {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: () => null,
      warn: () => null,
      error: () => null,
    },
  };
  const queryClient = new QueryClient(queryClientOptions);
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersList />
    </QueryClientProvider>,
    { wrapper: MemoryRouter }
  );
};

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Characters List", () => {
  it("should render the CharactersList component with correct title in header", () => {
    renderCharacterList();

    expect(screen.getByText(/characters/i)).toBeInTheDocument();
  });

  it("should render the CharactersList component with loading text", () => {
    renderCharacterList();

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("should render the CharactersList component with correct subtitle in header", async () => {
    renderCharacterList();

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/page 1 of 1/i)).toBeInTheDocument();

    expect(
      screen.getByText(/showing 1 - 1 of 1 characters/i)
    ).toBeInTheDocument();
  });

  it("should render the CharactersList component with correct character data", async () => {
    renderCharacterList();

    await waitFor(async () => {
      expect(await screen.findByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();

    expect(screen.getByText(/male/i)).toBeInTheDocument();

    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /view luke skywalker/i })
    ).toBeInTheDocument();
  });

  it("should render the CharactersList component with appropriate buttons", () => {
    renderCharacterList();

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("should trigger navigation to character details page on clicking view button", async () => {
    renderCharacterList();

    await waitFor(async () => {
      expect(await screen.findByText("Loading...")).not.toBeInTheDocument();
    });

    const user = userEvent.setup();

    const viewButton = screen.getByRole("button", {
      name: /view luke skywalker/i,
    });

    await user.click(viewButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/1");
  });
});
