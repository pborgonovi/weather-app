import { formatTemp, formatWind, iconUrl } from '../utils/units'

export default function CurrentWeather({ weather, unit }) {
  const { name, sys, main, wind, weather: [condition] } = weather

  return (
    <section className="card current">
      <h2>{name}, {sys.country}</h2>
      <div className="current-main">
        <img src={iconUrl(condition.icon)} alt={condition.description} />
        <div>
          <p className="temp">{formatTemp(main.temp, unit)}</p>
          <p className="description">{condition.description}</p>
        </div>
      </div>
      <ul className="details">
        <li><span>Feels like</span>{formatTemp(main.feels_like, unit)}</li>
        <li><span>Humidity</span>{main.humidity}%</li>
        <li><span>Wind</span>{formatWind(wind.speed, unit)}</li>
        <li><span>Pressure</span>{main.pressure} hPa</li>
      </ul>
    </section>
  )
}
