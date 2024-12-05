import { WeatherData } from "@/app/interfaces/weather_data.interface";
import { render, screen } from "@testing-library/react";
import { WeatherWidget } from "./WeatherWidget";

describe("WeatherWidget test", () => {
  it("should show empty when weather is null", () => {
    render(<WeatherWidget weather={null} />);

    const root = screen.queryByTestId("root");
    expect(root).not.toBeInTheDocument();
  });

  it("should show empty when weather is not present", () => {
    render(<WeatherWidget />);

    const root = screen.queryByTestId("root");
    expect(root).not.toBeInTheDocument();
  });

  it("should show widget when weather is present", () => {
    const mockWeather: WeatherData = {
      main: {
        temp: 22.5,
        humidity: 60,
      },
      weather: [
        {
          icon: "01d",
          description: "Clear sky",
        },
      ],
      name: "Test City",
    };

    render(<WeatherWidget weather={mockWeather} />);

    const root = screen.getByTestId("root");
    expect(root).toBeInTheDocument();

    const temperature = screen.getByText("23");
    const humidity = screen.getByText("Humedad: 60%");
    const description = screen.getByText("Clima: Clear sky");
    const city = screen.getByText("Ciudad: Test City");

    expect(temperature).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(city).toBeInTheDocument();

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d.png"
    );
  });
});
