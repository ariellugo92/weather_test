"use client";

import { Button, InputText, WeatherWidget } from "@/components";
import { useFetchWeather } from "./hooks/fetch_weather.hook";

export default function Home() {
  const { city, weather, loading, error, onSetCity, fetchWeather } =
    useFetchWeather();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex gap-2 mb-6">
        <InputText placeholder="Ciudad" value={city} onChange={onSetCity} />
        <Button
          label={loading ? "Buscando..." : "Buscar"}
          onClick={fetchWeather}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <WeatherWidget weather={weather} />
    </div>
  );
}
