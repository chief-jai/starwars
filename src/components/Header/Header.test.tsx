import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render the header with the correct title and subtitle", () => {
    render(
      <Header id="header" title="Title" icon={faUsers} subtitle="Subtitle" />
    );

    expect(screen.getByText("Title")).toBeInTheDocument();

    const icon = screen.getByRole("img", {
      hidden: true,
    });

    expect(icon).toHaveAttribute("data-icon", "users");

    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("should not render the subtitle if it is not passed", () => {
    render(<Header id="header" title="Title" icon={faUsers} />);

    expect(screen.queryByTestId("subtitle")).not.toBeInTheDocument();
  });
});
