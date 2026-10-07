# Weather Forecast App

A simple React app that shows current weather and a 5-day forecast using the [OpenWeatherMap API](https://openweathermap.org/api).

## Features
- Search by city name, or use your current location (📍)
- Current temperature, feels like, humidity, wind speed and pressure
- 5-day forecast (daily high/low)
- Celsius / Fahrenheit toggle (converts instantly, no extra API call)
- Error handling: empty input, city not found, invalid API key, rate limit, network failure, denied geolocation
- Responsive layout, with loading spinner and fade/hover animations

## Setup
1. Get a free API key at https://openweathermap.org/api (new keys can take up to a couple of hours to activate).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root (see `.env.example`):
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Start the dev server and open the printed URL (usually http://localhost:5173):
   ```bash
   npm run dev
   ```

Other scripts: `npm run build` (production build), `npm run lint`.

## Tech
- [React](https://react.dev) 19 – UI
- [Vite](https://vite.dev) – build tool / dev server
- Plain CSS – styling (no extra libraries)
- OpenWeatherMap `weather` and `forecast` endpoints

## Code organization
```
src/
├── api/weather.js          # fetch calls + error mapping
├── hooks/useWeather.js     # state: data, loading, error
├── utils/
│   ├── units.js            # °C/°F and km/h/mph conversion, icon URLs
│   └── forecast.js         # groups 3-hour forecast entries into days
├── components/
│   ├── SearchBar.jsx       # input, validation, geolocation button
│   ├── UnitToggle.jsx      # °C / °F switch
│   ├── CurrentWeather.jsx  # current conditions card
│   ├── Forecast.jsx        # 5-day forecast
│   └── ErrorMessage.jsx
├── App.jsx                 # holds unit state, composes components
└── index.css               # all styles
```
State: `App` owns the selected unit; `useWeather` owns API data, loading and error state. Data is always fetched in metric and converted for display.
