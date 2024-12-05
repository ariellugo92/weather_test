import { WeatherData } from "@/app/interfaces/weather_data.interface";

interface WeatherWidgetProps {
  weather?: WeatherData | null;
}

export const WeatherWidget = (props: WeatherWidgetProps) => {
  const { weather } = props;
  return (
    weather &&
    weather.weather &&
    weather.weather[0] && (
      <div
        data-testid="root"
        className="flex bg-indigo-500 text-white rounded-lg p-4 items-start w-[80%] lg:w-[40%]"
      >
        <div className="flex justify-between items-start w-full">
          <img
            width={100}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />
          <div className="flex flex-col">
            <p className="text-8xl text-end">
              {Math.round(weather?.main?.temp ?? 0)}
            </p>
            <p className="text text-end">Humedad: {weather?.main?.humidity}%</p>
            <p className="text text-end">
              Clima: {weather?.weather[0]?.description ?? ""}
            </p>
            <p className="text text-end">Ciudad: {weather.name}</p>
          </div>
        </div>
      </div>
    )
  );
};
