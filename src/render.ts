import { CurrentWeather, DailyForecast, GeoResult } from "./types.js";

export function getIcon(code: number): string {
  const map: Record<number, string> = {
    0: "sun (1).png",
    1: "partly-cloudy (1).png",
    2: "partly-cloudy (1).png",
    3: "overcast.png",
    45: "foggy cloud.png",
    48: "foggy cloud.png",
    51: "light drizzle.png",
    53: "heavy-drizzle.png",
    55: "heavy-drizzle.png",
    61: "light-rain.png",
    63: "rain (1).png",
    65: "heavy rain.png",
    71: "light snow.png",
    73: "snow.png",
    75: "heavy snow showers.png",
    80: "light shower.png",
    81: "showers.png",
    82: "heavy showers.png",
    95: "thunderstorm.png",
    96: "thunderstorm and hail.png",
    99: "thunderstorm and hail.png",
  };
  return `img/${map[code] ?? "cloudy.png"}`;
}

export function getDesc(code: number): string {
  const map: Record<number, string> = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Rain Showers",
    81: "Rain Showers",
    82: "Heavy Showers",
    95: "Thunderstorm",
    96: "Thunderstorm & Hail",
    99: "Thunderstorm & Hail",
  };
  return map[code] ?? "Unknown";
}

export function renderCurrent(weather: CurrentWeather, city: GeoResult): void {
  const el = document.getElementById("current");
  if (!el) return;
  el.innerHTML = `
    <div class="location-row">
      <div class="location">
        <img src="img/location.png" width="18">
        <span>${city.name}, ${city.country}</span>
      </div>
      <div class="date">${new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</div>
    </div>
    <div class="current-weather">
      <img class="weather-icon-big" src="${getIcon(weather.weathercode)}" width="120">
      <div class="temp-info">
        <div class="temp-value">${Math.round(weather.temperature)}°C</div>
        <div class="temp-condition">${getDesc(weather.weathercode)}</div>
      </div>
    </div>
  `;
}

export function renderForecast(daily: DailyForecast): void {
  const el = document.getElementById("forecast");
  if (!el) return;
  let html =
    '<h3 class="forecast-title">5-Day Forecast</h3><div class="forecast-row">';
  for (let i = 2; i < 7 && i < daily.time.length; i++) {
    const day = new Date(daily.time[i]).toLocaleDateString("en-US", {
      weekday: "short",
    });
    html += `
      <div class="forecast-card">
        <div class="forecast-day">${day}</div>
        <img class="forecast-icon" src="${getIcon(daily.weathercode[i])}" width="40">
        <div class="forecast-temp">${Math.round(daily.temperature_2m_max[i])}°</div>
      </div>
    `;
  }
  html += "</div>";
  el.innerHTML = html;
}
