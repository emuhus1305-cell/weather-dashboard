const iconMap = {
  0: "sun (1).png",
  1: "partly-cloudy (1).png",
  2: "partly-cloudy (1).png",
  3: "overcast.png",
  45: "foggy cloud.png",
  48: "foggy cloud.png",
  51: "light drizzle.png",
  53: "heavy-drizzle.png",
  55: "heavy-drizzle.png",
  56: "freezing rain.png",
  57: "freezing rain.png",
  61: "light-rain.png",
  63: "rain (1).png",
  65: "heavy rain.png",
  66: "freezing rain.png",
  67: "freezing rain.png",
  71: "light snow.png",
  73: "snow.png",
  75: "snow.png",
  77: "snow.png",
  80: "light shower.png",
  81: "showers.png",
  82: "heavy showers.png",
  85: "light snow.png",
  86: "heavy snow showers.png",
  95: "thunderstorm.png",
  96: "thunderstorm and hail.png",
  99: "thunderstorm and hail.png",
};

const conditionMap = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Light Showers",
  81: "Showers",
  82: "Heavy Showers",
  85: "Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm & Hail",
  99: "Thunderstorm & Hail",
};

function getIconPath(code) {
  return `./img/${iconMap[code] || "cloudy.png"}`;
}

function getCondition(code) {
  return conditionMap[code] || "Unknown";
}

function getDayName(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
}

export function renderIdle(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-white/40">
      <p class="text-base">Search for a city to see the weather</p>
    </div>
  `;
}

export function renderLoading(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-white/60">
      <div class="spinner mb-3"></div>
      <p class="text-base">Loading weather data...</p>
    </div>
  `;
}

export function renderError(container, message) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-white/85">
      <p class="text-base font-medium text-center px-4">${message}</p>
    </div>
  `;
}

export function renderWeather(container, cityData, weatherData) {
  const current = weatherData.current;
  const daily = weatherData.daily;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  let forecastHTML = "";
  for (let i = 0; i < 5; i++) {
    const code = daily.weather_code[i];
    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const dayLabel = getDayName(daily.time[i]);
    forecastHTML += `
      <div class="flex-1 min-w-[64px] bg-[#4a5d6e] rounded-2xl py-3.5 px-2 text-center">
        <div class="text-[13px] text-white/60 mb-2">${dayLabel}</div>
        <img src="${getIconPath(code)}" alt="weather" class="w-9 h-9 object-contain mx-auto mb-2">
        <div class="text-[15px] font-bold text-white">${maxTemp}°</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="fade-in">
      <div class="flex justify-between items-center mb-5">
        <div class="flex items-center gap-2">
          <img src="./img/location.png" alt="location" class="w-5 h-5 object-contain">
          <span class="text-xl font-semibold text-white">${cityData.name}${cityData.country ? ", " + cityData.country : ""}</span>
        </div>
        <span class="text-sm text-white/60">${today}</span>
      </div>
      <div class="flex items-center justify-between mb-7">
        <div class="flex-1">
          <img src="${getIconPath(current.weather_code)}" alt="weather" class="w-[100px] h-[100px] object-contain">
          </div>
        <div class="text-right">
          <div class="text-[56px] font-bold text-white leading-none">${Math.round(current.temperature_2m)}°C</div>
          <div class="text-lg text-white/75 mt-1">${getCondition(current.weather_code)}</div>
        </div>
      </div>
      <div class="mb-2">
        <p class="text-[13px] text-white/40 mb-3">5-Day Forecast</p>
        <div class="flex gap-2.5 overflow-x-auto forecast-scroll pb-1">
          ${forecastHTML}
        </div>
      </div>
    </div>
  `;
}
