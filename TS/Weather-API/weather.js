const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const statusEl = document.getElementById('status');
const weatherBox = document.getElementById('weatherBox');

const cityNameEl = document.getElementById('cityName');
const conditionEl = document.getElementById('condition');
const tempEl = document.getElementById('temp');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

function getCondition(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 48) return 'Foggy';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

async function getWeather(city) {
  if (!city.trim()) return;

  statusEl.textContent = 'Loading...';
  weatherBox.style.display = 'none';

  try {
    const geoRes = await fetch(`${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      statusEl.textContent = 'City not found. Try another name.';
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    cityNameEl.textContent = `${name}, ${country}`;
    conditionEl.textContent = getCondition(current.weather_code);
    tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    feelsLikeEl.textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

    weatherBox.style.display = 'block';
    statusEl.textContent = '';

  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Something went wrong. Please try again.';
  }
}

searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather(cityInput.value);
  }
});


getWeather('Surat');
