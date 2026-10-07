// Turn the list of forecast entries into a list of days with min/max temperatures and midday weather

export function groupByDay(list) {
  const days = {}

  for (const entry of list) {
    const date = entry.dt_txt.split(' ')[0]
    if (!days[date]) days[date] = []
    days[date].push(entry)
  }

  return Object.entries(days)
    .slice(0, 5)
    .map(([date, entries]) => {
      const midday = entries.reduce((best, e) =>
        Math.abs(new Date(e.dt_txt).getHours() - 12) < Math.abs(new Date(best.dt_txt).getHours() - 12) ? e : best,
      )
      return {
        date,
        label: new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' }),
        min: Math.min(...entries.map((e) => e.main.temp_min)),
        max: Math.max(...entries.map((e) => e.main.temp_max)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      }
    })
}
