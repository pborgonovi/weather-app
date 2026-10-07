// Helper functions to format units for display
export function formatTemp(celsius, unit) {
  const value = unit === 'F' ? (celsius * 9) / 5 + 32 : celsius
  return `${Math.round(value)}°${unit}`
}

export function formatWind(metersPerSecond, unit) {
  return unit === 'F'
    ? `${Math.round(metersPerSecond * 2.237)} mph`
    : `${Math.round(metersPerSecond * 3.6)} km/h`
}

export function iconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`
}
