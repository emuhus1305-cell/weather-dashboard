const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(cityName) {
  try {
    const response = await fetch(
      `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=5`,
    );
    if (!response.ok) throw new Error("Failed to connect to geocoding service");
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(
        "City not found. Please check the spelling and try again.",
      );
    }

    const query = cityName.toLowerCase().trim();

    const exactMatches = data.results.filter(
      (r) => r.name.toLowerCase() === query,
    );

    const matchesToSort = exactMatches.length > 0 ? exactMatches : data.results;
    matchesToSort.sort((a, b) => (b.population || 0) - (a.population || 0));

    return matchesToSort[0];
  } catch (error) {
    throw error;
  }
}

export async function getWeather(lat, lon) {
  try {
    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return await response.json();
  } catch (error) {
    throw error;
  }
}
