import { groupByDay } from '../utils/forecast'
import { formatTemp, iconUrl } from '../utils/units'

export default function Forecast({ list, unit }) {
  const days = groupByDay(list)

  return (
    <section className="card">
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {days.map((day) => (
          <div className="forecast-day" key={day.date}>
            <p className="day-label">{day.label}</p>
            <img src={iconUrl(day.icon)} alt={day.description} />
            <p className="range">
              <strong>{formatTemp(day.max, unit)}</strong> / {formatTemp(day.min, unit)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
