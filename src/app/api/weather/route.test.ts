import { MockResponse } from "@/mocks/mockResponse";
import { createMocks } from "node-mocks-http";
import { GET } from "./route";

global.Response = MockResponse as any;

describe("GET /api/weather", () => {
  const apiKey = "mockApiKey";
  const apiUrl = "https://mock-api.openweathermap.org";

  beforeAll(() => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = apiKey;
    process.env.NEXT_PUBLIC_OPENWEATHER_API_URL = apiUrl;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve error 400 si la ciudad no está especificada", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/weather",
    });

    const response = await GET(req as any);

    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result.error).toBe("La ciudad es requerida");
  });

  it("devuelve error 404 si la ciudad no existe", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: "Ciudad no encontrada" }),
      })
    ) as jest.Mock;

    const { req, res } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/weather?city=NoExiste", // URL absoluta
    });

    const response = await GET(req as any);

    expect(response.status).toBe(404);
    const result = await response.json();
    expect(result.error).toBe("Ciudad no encontrada");
  });

  it("devuelve datos de clima para una ciudad válida", async () => {
    const mockWeatherData = {
      weather: [{ description: "Soleado", icon: "01d" }],
      main: { temp: 25, humidity: 60 },
      name: "Paris",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockWeatherData),
      })
    ) as jest.Mock;

    const { req, res } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/weather?city=Paris", // URL absoluta
    });

    const response = await GET(req as any);

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result).toEqual(mockWeatherData);
  });

  it("devuelve error 500 si hay un problema en el servidor", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network Error"))
    ) as jest.Mock;

    const { req, res } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/weather?city=Paris", // URL absoluta
    });

    const response = await GET(req as any);

    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result.error).toBe("Hubo un problema al conectar con el servidor");
  });
});
