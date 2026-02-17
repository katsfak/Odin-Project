// -----------------------------
// Weather App (single-file JS)
// -----------------------------

// We use two Open-Meteo endpoints (no API key required):
// 1) Geocoding API: location name -> latitude/longitude
// 2) Forecast API: latitude/longitude -> current weather + short forecast

// The UI markup now lives in index.html.
// Here we only select the existing DOM nodes we need.

const form = document.querySelector("#weather-form");
const locationInput = document.querySelector("#location-input");
const loadingElement = document.querySelector("#loading");
const messageElement = document.querySelector("#message");
const resultElement = document.querySelector("#weather-result");

// Convert Open-Meteo weather codes to readable descriptions.
function weatherCodeToText(code) {
  const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodeMap[code] || "Unknown weather";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function showLoading(isLoading) {
  loadingElement.classList.toggle("hidden", !isLoading);
}

function setMessage(text, type = "") {
  messageElement.textContent = text;
  messageElement.className = `message ${type}`.trim();
}

// --- API functions ---

// Takes a location string and returns the top geocoding match.
async function fetchLocationCoordinates(location) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch location data.");
  }

  const data = await response.json();
  const place = data?.results?.[0];

  if (!place) {
    throw new Error("Location not found. Try a different city name.");
  }

  return place;
}

// Takes coordinates and returns weather JSON from Open-Meteo forecast API.
async function fetchWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return response.json();
}

// Required flow function: receives a location and returns weather JSON.
// We keep a console.log for the raw API output as requested.
async function getWeatherDataForLocation(location) {
  const place = await fetchLocationCoordinates(location);
  const weatherJson = await fetchWeatherByCoordinates(
    place.latitude,
    place.longitude,
  );

  console.log("Raw location response:", place);
  console.log("Raw weather response:", weatherJson);

  return { place, weatherJson };
}

// --- JSON processing ---

// Converts raw JSON into a clean object with only required app data.
function processWeatherData(place, weatherJson) {
  const current = weatherJson.current || {};
  const daily = weatherJson.daily || {};

  const forecast = (daily.time || []).slice(0, 3).map((day, index) => ({
    date: day,
    maxTemp: daily.temperature_2m_max?.[index],
    minTemp: daily.temperature_2m_min?.[index],
    weatherCode: daily.weather_code?.[index],
    description: weatherCodeToText(daily.weather_code?.[index]),
  }));

  const processed = {
    location: {
      name: place.name,
      country: place.country,
      admin1: place.admin1 || "",
      latitude: place.latitude,
      longitude: place.longitude,
    },
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      description: weatherCodeToText(current.weather_code),
      time: current.time,
    },
    forecast,
  };

  console.log("Processed weather object:", processed);
  return processed;
}

// --- Rendering ---

function renderWeather(data) {
  const { location, current, forecast } = data;

  resultElement.innerHTML = `
		<article class="card">
			<h2>${location.name}${location.admin1 ? `, ${location.admin1}` : ""}, ${location.country}</h2>
			<p class="meta">${current.description}</p>
			<div class="current-grid">
				<p><strong>Temp:</strong> ${current.temperature}°C</p>
				<p><strong>Feels like:</strong> ${current.feelsLike}°C</p>
				<p><strong>Wind:</strong> ${current.windSpeed} km/h</p>
				<p><strong>Updated:</strong> ${formatDate(current.time)}</p>
			</div>
		</article>

		<article class="card">
			<h3>3-Day Forecast</h3>
			<ul class="forecast-list">
				${forecast
          .map(
            (day) => `
							<li>
								<span>${formatDate(day.date)}</span>
								<span>${day.description}</span>
								<span>${day.minTemp}°C / ${day.maxTemp}°C</span>
							</li>
						`,
          )
          .join("")}
			</ul>
		</article>
	`;

  resultElement.classList.remove("hidden");
}

// --- Form flow ---

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  setMessage("");
  resultElement.classList.add("hidden");
  showLoading(true);

  try {
    const { place, weatherJson } = await getWeatherDataForLocation(location);
    const weatherData = processWeatherData(place, weatherJson);
    renderWeather(weatherData);
  } catch (error) {
    setMessage(
      error.message || "Something went wrong while fetching weather.",
      "error",
    );
  } finally {
    showLoading(false);
  }
});
