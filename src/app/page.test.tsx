import { fireEvent, render, screen } from "@testing-library/react";
import { useFetchWeather } from "./hooks/fetch_weather.hook";
import Home from "./page";

// Mock del hook personalizado
jest.mock("./hooks/fetch_weather.hook");

describe("Home test", () => {
  let mockUseFetchWeather: jest.Mock;

  beforeEach(() => {
    mockUseFetchWeather = jest.fn(() => ({
      city: "",
      weather: null,
      loading: false,
      error: "",
      onSetCity: jest.fn(),
      fetchWeather: jest.fn(),
    }));

    (useFetchWeather as jest.Mock).mockImplementation(mockUseFetchWeather);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show error when input is empty", async () => {
    const mockFetchWeather = jest.fn();
    mockUseFetchWeather.mockReturnValue({
      city: "",
      weather: null,
      loading: false,
      error: "La ciudad es requerida",
      onSetCity: jest.fn(),
      fetchWeather: mockFetchWeather,
    });

    render(<Home />);

    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.click(button);

    const errorMessage = await screen.findByText("La ciudad es requerida");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");

    const weatherWidget = screen.queryByTestId("root");
    expect(weatherWidget).not.toBeInTheDocument();
  });

  it("should show 'Buscando' while is fetching", async () => {
    const mockFetchWeather = jest.fn();
    mockUseFetchWeather.mockReturnValue({
      city: "Paris",
      weather: null,
      loading: true,
      error: "",
      onSetCity: jest.fn(),
      fetchWeather: mockFetchWeather,
    });

    render(<Home />);

    const button = screen.getByRole("button", { name: "Buscando..." });
    expect(button).toBeInTheDocument();
  });

  it("should show error when weather is null", async () => {
    const mockFetchWeather = jest.fn();
    mockUseFetchWeather.mockReturnValue({
      city: "NoExiste",
      weather: null,
      loading: false,
      error: "Ciudad no encontrada",
      onSetCity: jest.fn(),
      fetchWeather: mockFetchWeather,
    });

    render(<Home />);

    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.click(button);

    const errorMessage = await screen.findByText("Ciudad no encontrada");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");

    const weatherWidget = screen.queryByTestId("root");
    expect(weatherWidget).not.toBeInTheDocument();
  });

  it("should show WeatherWidget when information weather is present", async () => {
    const mockWeather = {
      weather: [{ description: "Soleado", icon: "01d" }],
      main: { temp: 25, humidity: 60 },
      name: "Paris",
    };

    const mockFetchWeather = jest.fn();
    mockUseFetchWeather.mockReturnValue({
      city: "Paris",
      weather: mockWeather,
      loading: false,
      error: "",
      onSetCity: jest.fn(),
      fetchWeather: mockFetchWeather,
    });

    render(<Home />);

    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.click(button);

    const weatherWidget = await screen.findByTestId("root");
    expect(weatherWidget).toBeInTheDocument();
  });
});
