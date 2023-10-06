export function getQueryString (obj) {
  const searchParams = new URLSearchParams(obj)
  return `?${searchParams}`
}
