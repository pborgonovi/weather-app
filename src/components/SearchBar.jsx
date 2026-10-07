import { useState } from 'react'

export default function SearchBar({ onSearch, onLocate, onInvalid, disabled }) {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = city.trim()
    if (!trimmed) {
      onInvalid('Please enter a city name.')
      return
    }
    onSearch({ city: trimmed })
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        aria-label="City name"
      />
      <button type="submit" disabled={disabled}>Search</button>
      <button type="button" className="secondary" onClick={onLocate} disabled={disabled} title="Use my location">
        📍
      </button>
    </form>
  )
}
