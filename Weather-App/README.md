# Weather App

A simple weather app built with vanilla HTML, CSS, and JavaScript.

## Features

- Search weather by city/location name
- Fetch coordinates from Open-Meteo Geocoding API
- Fetch current weather + 3-day forecast from Open-Meteo Forecast API
- Process raw API JSON into a clean app-specific object
- Display weather data in the UI
- Show a loading state while data is being fetched
- Handle errors for invalid location or failed requests

## Tech

- HTML
- CSS
- JavaScript (no framework)
- Open-Meteo APIs (no API key required)

## Project Structure

- `index.html` - app container and script/style links
- `style.css` - app styling
- `script.js` - API calls, data processing, rendering, and event handling

## API Endpoints Used

- Geocoding:
  - `https://geocoding-api.open-meteo.com/v1/search`
- Forecast:
  - `https://api.open-meteo.com/v1/forecast`

## How to Run

1. Open `index.html` in your browser.
2. Type a city name (for example: `Athens`, `London`, `Tokyo`).
3. Submit the form to view weather information.

## Development Notes

- Raw API responses and processed data are logged to the console for debugging.
- Loading state appears during fetch requests.
- If location data is not found, a user-friendly error is shown.

## Possible Next Improvements

- Add weather icons
- Add unit toggle (°C / °F)
- Add recent search history
- Add dynamic icon imports when bundling with Webpack
