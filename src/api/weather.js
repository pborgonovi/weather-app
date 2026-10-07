const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// Celsius/Fahrenheit toggle does the converting on the client side
async function request(endpoint, params) {
  if (!API_KEY) {
    throw new Error('Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.')
  }

  const query = new URLSearchParams({ ...params, units: 'metric', appid: API_KEY })
  let response
  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${query}`)
  } catch {
    throw new Error('Network error. Please check your connection and try again.')
  }

  if (response.status === 404) throw new Error('City not found. Check the spelling and try again.')
  if (response.status === 401) throw new Error('Invalid API key. New keys can take a couple of hours to activate.')
  if (response.status === 429) throw new Error('Too many requests. Please wait a moment and try again.')
  if (!response.ok) throw new Error('Something went wrong while fetching the weather.')

  return response.json()
}

// location is either { city: 'Vancouver' } or { lat, lon }
function toParams(location) {
  return location.city ? { q: location.city } : { lat: location.lat, lon: location.lon }
}

export async function fetchWeather(location) {
  const [current, forecast] = await Promise.all([
    request('weather', toParams(location)),
    request('forecast', toParams(location)),
  ])
  return { current, forecast }
}
