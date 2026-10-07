import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import ErrorMessage from './components/ErrorMessage'

export default function App() {
  const [unit, setUnit] = useState('C')
  const { data, loading, error, search, setError } = useWeather()

  function handleLocate() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => search({ lat: coords.latitude, lon: coords.longitude }),
      () => setError('Could not get your location. Please allow access or search by city.'),
    )
  }

  return (
    <main className="app">
      <header>
        <h1>Weather Forecast</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <SearchBar onSearch={search} onLocate={handleLocate} onInvalid={setError} disabled={loading} />

      {loading && <div className="loader" aria-label="Loading" />}
      {error && <ErrorMessage message={error} />}
      {!data && !loading && !error && <p className="hint">Search for a city to see its weather.</p>}

      {data && !loading && (
        <div className="results">
          <CurrentWeather weather={data.current} unit={unit} />
          <Forecast list={data.forecast.list} unit={unit} />
        </div>
      )}
    </main>
  )
}
