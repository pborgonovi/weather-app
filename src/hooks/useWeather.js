import { useState } from 'react'
import { fetchWeather } from '../api/weather'

export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function search(location) {
    setLoading(true)
    setError('')
    try {
      setData(await fetchWeather(location))
    } catch (err) {
      setData(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, search, setError }
}
