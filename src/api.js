const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
export async function fetchGeoData(city) {
    const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
    const data = await res.json();
    return data.results?.[0] ?? null;
}
export async function fetchWeather(lat, lon) {
    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const res = await fetch(url);
    return res.json();
}
