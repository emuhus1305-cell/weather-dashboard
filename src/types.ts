export interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherResponse {
  current_weather: CurrentWeather;
  daily: DailyForecast;
}
