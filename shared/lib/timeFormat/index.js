const timeFormat = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

export const timeFormatter = timeFormat.format
