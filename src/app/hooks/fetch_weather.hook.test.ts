import { act, renderHook } from "@testing-library/react";
import { useFetchWeather } from "./fetch_weather.hook";

describe("useFetchWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update city when onSetCity is called", () => {
    const { result } = renderHook(() => useFetchWeather());

    act(() => {
      result.current.onSetCity({ target: { value: "Managua" } } as any);
    });

    expect(result.current.city).toBe("Managua");
  });

  it("should message be 'Ciudad no encontrada' when response.ok is false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Ciudad no encontrada" }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useFetchWeather());

    await act(async () => {
      result.current.onSetCity({ target: { value: "NoExiste" } } as any);
      await result.current.fetchWeather();
    });

    expect(result.current.error).toBe("Ciudad no encontrada");
    expect(result.current.weather).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should response city when response.ok is true", async () => {
    const mockWeather = {
      weather: [{ description: "Soleado", icon: "01d" }],
      main: { temp: 25, humidity: 60 },
      name: "Paris",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWeather),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useFetchWeather());

    await act(async () => {
      result.current.onSetCity({ target: { value: "Paris" } } as any);
      await result.current.fetchWeather();
    });

    expect(result.current.error).toBe("");
    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.loading).toBe(false);
  });

  it("should have error when enter in catch", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network Error"))
    ) as jest.Mock;

    const { result } = renderHook(() => useFetchWeather());

    await act(async () => {
      result.current.onSetCity({ target: { value: "ErrorCity" } } as any);
      await result.current.fetchWeather();
    });

    expect(result.current.error).toBe("Something went wrong");
    expect(result.current.weather).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
