import { render, screen } from "@testing-library/react";
import PreviewCard from "./PreviewCard";

describe("Preview Card", () => {
  it("should render the preview card with the correct content", () => {
    render(
      <PreviewCard
        src="./src/assets/characters/1.jpg"
        content={<div>Image Caption</div>}
      />
    );

    expect(screen.getByText("Image Caption")).toBeInTheDocument();
  });
});
