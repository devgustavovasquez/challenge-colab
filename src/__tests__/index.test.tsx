import Home from "../pages/index";
import { render, screen } from "@testing-library/react";

describe("Hello World", () => {
  it("should render Hello World", () => {
    render(<Home />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
