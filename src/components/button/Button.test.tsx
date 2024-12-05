import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button test", () => {
  it("should be render", () => {
    render(<Button label="Click me" />);

    const buttonElement = screen.queryByTestId("buttonApp");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should show label", () => {
    const labelText = "Enviar";

    render(<Button label={labelText} />);

    const buttonElement = screen.getByText(labelText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(labelText);
  });
});
