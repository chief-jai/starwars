import { render } from "utils/testing";
import { screen } from "@testing-library/react";
import InfoMessage from "./InfoMessage";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

describe("InfoMessage", () => {
  it("should render the InfoMessage", () => {
    render(
      <InfoMessage
        id="error-message"
        icon={faCircleExclamation}
        primaryMessage="Primary Message"
        secondaryMessage="Secondary Message"
      />
    );

    expect(
      screen.getByRole("img", {
        hidden: true,
      })
    ).toHaveAttribute("data-icon", "circle-exclamation");

    expect(screen.getByText("Primary Message")).toBeInTheDocument();

    expect(screen.getByText("Secondary Message")).toBeInTheDocument();
  });

  it("should render the default icon when no icon is provided", () => {
    render(<InfoMessage id="error-message" />);

    expect(
      screen.getByRole("img", {
        hidden: true,
      })
    ).toHaveAttribute("data-icon", "triangle-exclamation");
  });

  it("should render the default primary message when no primary message is provided", () => {
    render(<InfoMessage id="error-message" />);

    expect(
      screen.getByText("Oops! There was an error fetching the data.")
    ).toBeInTheDocument();
  });
});
