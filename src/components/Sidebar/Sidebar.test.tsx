import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "./Sidebar";
import { MemoryRouter } from "react-router-dom";
import { render } from "utils/testing";

describe("Sidebar", () => {
  it("should render the sidebar", () => {
    render(<Sidebar />);

    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  });

  it.each(["characters", "planets", "starships"])(
    `should render the sidebar with the %s link hidden`,
    (link) => {
      render(<Sidebar />);

      expect(screen.queryByText(new RegExp(link, "i"))).not.toBeInTheDocument();
    }
  );

  it.each(["characters", "planets", "starships"])(
    `should render the sidebar with the %s link visible when the sidebar is open`,
    async (link) => {
      const { user } = render(<Sidebar />, {
        wrapper: MemoryRouter,
      });

      const sidebar = screen.getByTestId("sidebar");

      await user.hover(sidebar);

      expect(screen.getByText(new RegExp(link, "i"))).toBeInTheDocument();
    }
  );

  it.each(["characters", "planets", "starships"])(
    "should render the side with the %s link hidden when the sidebar is unhovered",
    async (link) => {
      render(<Sidebar />, {
        wrapper: MemoryRouter,
      });

      const sidebar = screen.getByTestId("sidebar");

      const user = userEvent.setup();

      await user.hover(sidebar);
      await user.unhover(sidebar);

      expect(screen.queryByText(new RegExp(link, "i"))).not.toBeInTheDocument();
    }
  );
});
