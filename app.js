import { searchCity, getWeather } from "./api.js";
import {
  renderIdle,
  renderLoading,
  renderError,
  renderWeather,
} from "./render.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather-container");

function init() {
  renderIdle(weatherContainer);
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

async function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) {
    renderError(weatherContainer, "Please enter a city name");
    return;
  }
  renderLoading(weatherContainer);
  try {
    const cityData = await searchCity(city);
    const weatherData = await getWeather(cityData.latitude, cityData.longitude);
    renderWeather(weatherContainer, cityData, weatherData);
  } catch (error) {
    renderError(weatherContainer, error.message);
  }
}

init();
