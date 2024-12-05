import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";

describe("InputText test", () => {
  it("should be render", () => {
    render(<InputText />);

    const inputElement = screen.queryByTestId("inputText");
    expect(inputElement).toBeInTheDocument();
  });

  it("should show placeholder", () => {
    const placeholderText = "Ingresa tu nombre";

    render(<InputText placeholder={placeholderText} />);

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", placeholderText);
  });
});
