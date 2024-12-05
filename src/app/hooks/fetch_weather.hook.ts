import { ChangeEvent, useState } from "react";
import { WeatherData } from "../interfaces/weather_data.interface";

export const useFetchWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSetCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "Error fetching weather");
        setWeather(null);
      } else {
        const data = await response.json();
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { city, weather, loading, error, onSetCity, fetchWeather };
};
