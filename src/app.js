import { fetchGeoData, fetchWeather } from "./api.js";
import { renderCurrent, renderForecast } from "./render.js";
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const errorEl = document.getElementById("error");
if (form && input) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = input.value.trim();
        if (!city)
            return;
        if (errorEl)
            errorEl.textContent = "";
        try {
            const geo = await fetchGeoData(city);
            if (!geo) {
                if (errorEl)
                    errorEl.textContent = "City not found.";
                return;
            }
            const weather = await fetchWeather(geo.latitude, geo.longitude);
            renderCurrent(weather.current_weather, geo);
            renderForecast(weather.daily);
        }
        catch (err) {
            if (errorEl)
                errorEl.textContent = "Failed to load weather data.";
            console.error(err);
        }
    });
}
